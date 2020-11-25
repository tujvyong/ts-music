import { createStore } from 'redux'
import { combineReducers, compose } from 'redux'
import uiReducer from "./ui/reducer";
import userReducer from './user/reducer'
import { UserStore } from './user/types'
import { UiStore } from "./ui/types";


export type RootStore = {
  user: UserStore
  ui: UiStore
}

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const composeReduxDevToolsEnhancers =
  (document.location.hostname === 'localhost' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer
})

const store = createStore(
  rootReducer,
  composeReduxDevToolsEnhancers()
)

export default store
