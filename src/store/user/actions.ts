import firebase from "../../firebase/Firebase";
import { ChipData } from "../../utils/types";
import {
  UserStore,
  INIT_STATE,
  FIREBASE_USER,
  FIREBASE_TOKEN,
  UPDATE_STATE,
} from './types'

export const setFirebaseUser = (currentUser: firebase.User) => {
  return {
    type: FIREBASE_USER,
    payload: currentUser
  }
}

export const setFirebaseToken = (idToken: string) => {
  return {
    type: FIREBASE_TOKEN,
    payload: idToken
  }
}

export const setInitialUser = (user: UserStore) => {
  return {
    type: INIT_STATE,
    payload: user
  }
}

export const updateState = (name: string, item: string | ChipData[]) => {
  return {
    type: UPDATE_STATE,
    payload: { name, item }
  }
}
