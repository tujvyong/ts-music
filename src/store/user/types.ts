export const INIT_STATE = 'INIT_STATE'

export interface User {
  username: string | null
  email: string | null
  photoURL: string | null
  emailVerified: boolean
}

interface SetInitState {
  type: typeof INIT_STATE
  payload: User
}

export type UserActionTypes = SetInitState
