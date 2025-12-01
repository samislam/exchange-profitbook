import { AppLanguages } from '@/types/app.types'
import { createLocaleTransitionStore } from '@/lib/stores/create-locale-transition-store'

export const useLocaleTransition = createLocaleTransitionStore<AppLanguages>()
