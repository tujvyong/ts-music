import {
  UserStore,
  UserActionTypes,
  FIREBASE_USER,
  FIREBASE_TOKEN,
  INIT_STATE,
  UPDATE_BASIC,
  UPDATE_STATE
} from './types'

const initialState = {
  firebaseUser: null,
  token: null,
  uid: null,
  username: '',
  bio: '',
  place: '',
  photoURL: '',
  bgURL: '',
  profile: '',
  genrus: [],
  instruments: [],
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
      const { uid, username, bio, place, photoURL, bgURL, profile, emailVerified } = action.payload

      return {
        ...state,
        uid: uid,
        username: username ?? '',
        bio: bio ?? '',
        place: place ?? '',
        photoURL: photoURL ? process.env.REACT_APP_STORAGE_PATH as string + photoURL : '',
        bgURL: bgURL ? process.env.REACT_APP_STORAGE_PATH as string + bgURL : '',
        profile: profile ?? '',
        emailVerified: emailVerified,
        isLoaded: true,
      }
    case UPDATE_BASIC:
      const data = action.payload
      return { ...state, username: data.username, bio: data.bio, place: data.place }
    case UPDATE_STATE:
      const { name, item } = action.payload
      return { ...state, [name]: item }
    default:
      return state
  }
}
