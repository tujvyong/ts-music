import firebase from "../../firebase/Firebase";


export const FIREBASE_USER = 'FIREBASE_USER'
export const FIREBASE_TOKEN = 'FIREBASE_TOKEN'
export const INIT_STATE = 'INIT_STATE'
export const UPDATE_STATE = 'UPDATE_STATE'

export interface UserStore {
  firebaseUser: firebase.User | null
  token: string | null
  uid: string | null
  username: string | null
  // email: string | null
  photoURL: string | null
  profile: string | null
  skill: string | null
  emailVerified: boolean
  isLoaded: boolean
}

export interface UpdateUser {
  name: string
  item: string
}

interface FirebaseUser {
  type: typeof FIREBASE_USER,
  payload: firebase.User
}

interface FirebaseToken {
  type: typeof FIREBASE_TOKEN,
  payload: string
}

interface SetInitState {
  type: typeof INIT_STATE
  payload: UserStore
}

interface UpdateState {
  type: typeof UPDATE_STATE
  payload: UpdateUser
}

export type UserActionTypes = FirebaseUser | FirebaseToken | SetInitState | UpdateState
