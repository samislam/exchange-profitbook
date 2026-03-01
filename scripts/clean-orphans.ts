import chalk from 'chalk'
import path from 'node:path'
import { confirm } from '@inquirer/prompts'
import { PrismaClient } from '@prisma/client'
import { readdir, unlink } from 'node:fs/promises'

const prismaClient = new PrismaClient()
const UPLOADS_ROOT = path.resolve(process.cwd(), 'storage', 'uploads')

type ScriptOptions = {
  yes: boolean
}

/** Parses CLI args for script execution options. */
const parseArgs = (): ScriptOptions => {
  const args = process.argv.slice(2)
  const yes = args.includes('-y') || args.includes('--yes')

  return {
    yes,
  }
}

/** Recursively collects files under uploads while skipping placeholder files. */
const collectFiles = async (dir: string): Promise<string[]> => {
  // Missing uploads dir is treated as empty input instead of a hard failure.
  const entries = await readdir(dir, { withFileTypes: true }).catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return []
      throw error
    }
  )
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return collectFiles(fullPath)
      if (entry.name === '.gitkeep') return []
      return [fullPath]
    })
  )
  return files.flat()
}

/** Returns announcement media filenames currently referenced in the database. */
const getReferencedUploads = async (): Promise<Set<string>> => {
  const rows = await prismaClient.announcement.findMany({
    where: { mediaUrl: { not: null } },
    select: { mediaUrl: true },
  })

  const referenced = new Set<string>()
  for (const row of rows) {
    if (!row.mediaUrl) continue
    referenced.add(row.mediaUrl.trim())
  }
  return referenced
}

/** Deletes files in uploads that are no longer referenced by announcements. */
const run = async () => {
  const { yes } = parseArgs()

  const referenced = await getReferencedUploads()
  const files = await collectFiles(UPLOADS_ROOT)
  const orphanFiles = files.filter((absolutePath) => !referenced.has(path.basename(absolutePath)))

  if (orphanFiles.length === 0) {
    const labelWidth = 18
    const line = (label: string, value: string, color: (text: string) => string) =>
      `${chalk.dim(label.padEnd(labelWidth))} ${color(chalk.bold(value))}`

    console.log(chalk.cyan.bold('\nOrphan Uploads Cleanup'))
    console.log(chalk.green('✓ Directory is clean, nothing to clean.'))
    console.log(chalk.dim('─'.repeat(36)))
    console.log(line('Scanned files', files.length.toString(), chalk.cyan))
    console.log(line('Deleted orphans', '0', chalk.green))
    console.log(line('Skipped referenced', files.length.toString(), chalk.gray))
    console.log(chalk.dim('─'.repeat(36)))
    return
  }

  if (!yes) {
    console.log(chalk.yellow('\nFiles that would be deleted:'))
    for (const absolutePath of orphanFiles) {
      const relativePath = path.relative(UPLOADS_ROOT, absolutePath)
      console.log(chalk.yellow(`Would delete: ${chalk.bold(relativePath)}`))
    }
    const approved = await confirm({
      message: `Delete ${orphanFiles.length} orphan file(s) from uploads?`,
      default: false,
    })
    if (!approved) {
      console.log(chalk.yellow('Aborted. No files were deleted.'))
      return
    }
  }

  let deleted = 0
  let skippedReferenced = 0

  for (const absolutePath of files) {
    // Contract: mediaUrl stores filename only, so matching is basename-based.
    const fileName = path.basename(absolutePath)
    if (referenced.has(fileName)) {
      skippedReferenced++
      continue
    }

    const relativePath = path.relative(UPLOADS_ROOT, absolutePath)
    console.log(chalk.green(`Deleting: ${chalk.bold(relativePath)}`))
    await unlink(absolutePath)
    deleted++
  }

  const labelWidth = 18
  const line = (label: string, value: string, color: (text: string) => string) =>
    `${chalk.dim(label.padEnd(labelWidth))} ${color(chalk.bold(value))}`

  console.log(chalk.cyan.bold('\nOrphan Uploads Cleanup'))
  console.log(chalk.dim('─'.repeat(36)))
  console.log(line('Scanned files', files.length.toString(), chalk.cyan))
  console.log(line('Deleted orphans', deleted.toString(), chalk.green))
  console.log(line('Skipped referenced', skippedReferenced.toString(), chalk.gray))
  console.log(chalk.dim('─'.repeat(36)))
}

run()
  .catch((error) => {
    console.error(chalk.red('Failed to clean orphan uploads:'), error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })
