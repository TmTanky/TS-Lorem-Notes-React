import {combineReducers} from 'redux'

// Interfaces
import { IuserInfo } from '../../interfaces/userInfo'

// Reducers
import { userReducer } from './user'
import { isLoggedInReducer } from './isLoggedIn'
import { secretReducer } from './secret'

export const root = combineReducers<{user: IuserInfo, isLoggedIn: boolean, secret: boolean | string}>({
    user: userReducer,
    isLoggedIn: isLoggedInReducer,
    secret: secretReducer
})