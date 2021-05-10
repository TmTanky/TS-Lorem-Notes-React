import { IuserInfo } from "../../interfaces/userInfo"

export const loginUser = (data: IuserInfo) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_SUCCESS'
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
export const secretPending = () => {
    return {
        type: 'SECRET_PENDING'
    }
}

export const secretOn = () => {
    return {
        type: 'SECRET_ON'
    }
}

export const secretOff = () => {
    return {
        type: 'SECRET_OFF'
    }
}