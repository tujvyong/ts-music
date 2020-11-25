export const ERROR_UI = 'ERROR_UI'
export const BACKDROP_UI = 'BACKDROP_UI'

export interface UiStore {
  error: Error | null
  backdrop: boolean
}

interface ErrorUi {
  type: typeof ERROR_UI,
  payload: Error
}

interface BackdropUi {
  type: typeof BACKDROP_UI,
  payload: boolean
}

export type UiActionType = ErrorUi | BackdropUi
