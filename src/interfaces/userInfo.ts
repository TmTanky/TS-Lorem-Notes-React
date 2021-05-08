import { Inotes } from "./notes";

export interface IuserInfo {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    myNotes: Inotes[]
}