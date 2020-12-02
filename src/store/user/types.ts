import firebase from "../../firebase/Firebase";
import { ChipData } from "../../utils/types";


export const FIREBASE_USER = 'FIREBASE_USER'
export const FIREBASE_TOKEN = 'FIREBASE_TOKEN'
export const INIT_STATE = 'INIT_STATE'
export const UPDATE_BASIC = 'UPDATE_BASIC'
export const UPDATE_STATE = 'UPDATE_STATE'

export interface UserStore {
  firebaseUser: firebase.User | null
  token: string | null
  uid: string | null
  username: string
  bio: string
  place: string
  photoURL: string
  bgURL: string
  profile: string
  genrus: ChipData[]
  instruments: ChipData[]
  emailVerified: boolean
  isLoaded: boolean
}

export interface UpdateUserBasic {
  username: string
  bio: string
  place: string
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

interface UpdateBasic {
  type: typeof UPDATE_BASIC
  payload: UpdateUserBasic
}

interface UpdateState {
  type: typeof UPDATE_STATE
  payload: UpdateUser
}

export type UserActionTypes = FirebaseUser | FirebaseToken | SetInitState | UpdateBasic | UpdateState
