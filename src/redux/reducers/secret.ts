import { Iaction } from "../../interfaces/action";

export const secretReducer = (state: boolean | string = false, action: Iaction) => {
    switch (action.type) {
        case 'SECRET_PENDING':
            return state = 'Pending'
        case 'SECRET_ON':
            return state = true
        case 'SECRET_OFF':
            return state = false
        default:
            return state     
    }
}