import {
  ERROR_UI,
  BACKDROP_UI
} from './types'

export const ErrorUi = (err: string) => ({
  type: ERROR_UI,
  payload: err
})

export const BackdropUi = (toggle: boolean) => ({
  type: BACKDROP_UI,
  payload: toggle
})
