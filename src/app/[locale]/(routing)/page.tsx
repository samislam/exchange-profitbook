import { ThemeSwitcher } from '@/components/common/theme-switcher'

const Page = async () => {
  return (
    <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-4">

      <ThemeSwitcher />
    </div>
  )
}
export default Page
