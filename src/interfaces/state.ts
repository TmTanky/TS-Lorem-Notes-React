import { IuserInfo } from "./userInfo";

export interface Istate {
    user: IuserInfo
    isLoggedIn: boolean
    secret: boolean | string
}