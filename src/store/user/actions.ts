import {
  User,
  INIT_STATE,
} from './types'

export const setInitialUser = (user: User) => {
  return {
    type: INIT_STATE,
    payload: user
  }
}
