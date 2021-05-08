import { IuserInfo } from "./userInfo";

export interface Inotes {
    _id: string
    title: string
    content: string
    noteBy: string
    isDone: boolean
    isSecret: boolean
}