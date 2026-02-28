import { toast } from 'sonner'

export const appToast = {
  success: (message: string, description?: string) =>
    toast.success(message, { description, duration: 3000 }),
  fail: (message: string, description?: string) =>
    toast.error(message, { description, duration: 4000 }),
  info: (message: string, description?: string) => toast(message, { description, duration: 3000 }),
}
