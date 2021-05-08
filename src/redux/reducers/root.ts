import {combineReducers} from 'redux'

// Interfaces
import { IuserInfo } from '../../interfaces/userInfo'

// Reducers
import { userReducer } from './user'
import { isLoggedInReducer } from './isLoggedIn'

export const root = combineReducers<{user: IuserInfo, isLoggedIn: boolean}>({
    user: userReducer,
    isLoggedIn: isLoggedInReducer
})