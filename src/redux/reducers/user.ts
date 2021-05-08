import { Iaction } from "../../interfaces/action";

export const userReducer = (state = {}, action: Iaction) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state = action.payload
        case 'LOGOUT_SUCCESS':
            return state = {}
        default: {
            return state
        }
    }
}