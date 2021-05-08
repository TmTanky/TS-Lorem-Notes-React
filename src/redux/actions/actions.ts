import { IuserInfo } from "../../interfaces/userInfo"

export const loginUser = (data: IuserInfo) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const loginTrue = () => {
    return {
        type: 'LOGIN_TRUE'
    }
}

export const loginFalse = () => {
    return {
        type: 'LOGIN_FALSE'
    }
}