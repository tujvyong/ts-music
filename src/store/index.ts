import { createStore } from 'redux'
import { combineReducers } from 'redux'
// import media from './media'
// import room from './room'
// import ui from './ui'
import userReducer from './user/reducer'
import { User } from './user/types'


export type RootState = {
  user: User
}

const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(
  rootReducer,
)

export default store
