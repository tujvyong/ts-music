// import * as AT from '../actions/ActionType'
import {
  User,
  UserActionTypes,
  INIT_STATE,
} from './types'

const initialState = {
  username: null,
  email: null,
  photoURL: null,
  emailVerified: false,
  isLoaded: false,
}

export default function userReducer(state = initialState, action: UserActionTypes): User {
  switch (action.type) {
    case INIT_STATE:
      const { username, email, photoURL, emailVerified } = action.payload
      return {
        ...state,
        username: username,
        email: email,
        photoURL: photoURL,
        emailVerified: emailVerified,
      }
    default:
      return state
  }
}
