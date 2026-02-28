'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/shadcnui/input'
import { Button } from '@/components/ui/shadcnui/button'
import { RotateCcw, Trash2 } from 'lucide-react'

type CycleToolbarProps = {
  selectedCycleName: string | null
  onRenameCycle: (name: string) => Promise<boolean>
  onDeleteCycle: () => Promise<void>
  onResetCycle: () => Promise<void>
  isRenaming: boolean
  isDeleting: boolean
  isResetting: boolean
}

export const CycleToolbar = ({
  selectedCycleName,
  onRenameCycle,
  onDeleteCycle,
  onResetCycle,
  isRenaming,
  isDeleting,
  isResetting,
}: CycleToolbarProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(selectedCycleName ?? '')

  useEffect(() => {
    if (!isEditing) {
      setDraftName(selectedCycleName ?? '')
    }
  }, [selectedCycleName, isEditing])

  const canEdit = Boolean(selectedCycleName)
  const hasSelectedCycle = Boolean(selectedCycleName)
  const canDelete = hasSelectedCycle && !isDeleting && !isRenaming && !isResetting
  const canReset = hasSelectedCycle && !isDeleting && !isRenaming && !isResetting
  const isBusy = isDeleting || isRenaming || isResetting

  const submitRename = async () => {
    if (!selectedCycleName) return
    const nextName = draftName.trim()
    if (!nextName || nextName === selectedCycleName) {
      setIsEditing(false)
      return
    }
    await onRenameCycle(nextName)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-6">
      {isEditing ? (
        <Input
          autoFocus
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          onBlur={() => void submitRename()}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              void submitRename()
            }
            if (event.key === 'Escape') {
              setDraftName(selectedCycleName ?? '')
              setIsEditing(false)
            }
          }}
          className="h-10 w-[280px] text-2xl font-bold"
          disabled={isBusy}
        />
      ) : (
        <h1
          className={canEdit ? 'cursor-text text-2xl font-bold' : 'text-2xl font-bold'}
          onDoubleClick={() => {
            if (canEdit && !isBusy) setIsEditing(true)
          }}
          title={canEdit ? 'Double click to edit cycle name' : undefined}
        >
          {selectedCycleName ?? 'All cycles'}
        </h1>
      )}

      {hasSelectedCycle && (
        <>
          <Button
            variant="outline"
            className="border-amber-300 text-amber-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-700/70 dark:text-amber-300 dark:hover:bg-amber-900/20 dark:hover:text-amber-200"
            disabled={!canReset}
            onClick={() => void onResetCycle()}
          >
            <RotateCcw className="h-4 w-4" />
            {isResetting ? 'Resetting...' : 'Reset cycle'}
          </Button>

          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-red-700/70 dark:text-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-200"
            disabled={!canDelete}
            onClick={() => void onDeleteCycle()}
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete cycle'}
          </Button>
        </>
      )}
    </div>
  )
}
