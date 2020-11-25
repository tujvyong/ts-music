import {
  ERROR_UI,
  BACKDROP_UI,
  UiStore,
  UiActionType,
} from './types'


const initialState = {
  error: null,
  backdrop: false,
  // search: null
}

export default function uiReducer(state = initialState, action: UiActionType): UiStore {
  switch (action.type) {
    case ERROR_UI: {
      const err = action.payload
      return { ...state, error: err }
    }
    case BACKDROP_UI: {
      const toggle = action.payload
      return { ...state, backdrop: toggle }
    }
    default:
      return state
  }
}
