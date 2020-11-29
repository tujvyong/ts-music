import {
  UserStore,
  UserActionTypes,
  FIREBASE_USER,
  FIREBASE_TOKEN,
  INIT_STATE,
  UPDATE_STATE
} from './types'

const initialState = {
  firebaseUser: null,
  token: null,
  uid: null,
  username: null,
  // email: null,
  photoURL: null,
  profile: null,
  skill: null,
  genrus: [],
  emailVerified: false,
  isLoaded: false,
}

export default function userReducer(state = initialState, action: UserActionTypes): UserStore {
  switch (action.type) {
    case FIREBASE_USER:
      const currentUser = action.payload
      return { ...state, firebaseUser: currentUser }
    case FIREBASE_TOKEN:
      const idToken = action.payload
      return { ...state, token: idToken }
    case INIT_STATE:
      const { uid, username, photoURL, profile, skill, emailVerified } = action.payload
      return {
        ...state,
        uid: uid,
        username: username ?? '',
        photoURL: photoURL ? process.env.REACT_APP_STORAGE_PATH as string + photoURL : '',
        profile: profile ?? '',
        skill: skill ?? '',
        emailVerified: emailVerified,
        isLoaded: true,
      }
    case UPDATE_STATE:
      const { name, item } = action.payload
      return { ...state, [name]: item }
    default:
      return state
  }
}
