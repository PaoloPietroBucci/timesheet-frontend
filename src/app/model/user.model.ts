import { Project } from "./project.model"

export interface User{

     id :number
     surname:string
     name:string
     email : string
     password:string
     username: string
     role:string
     projectList:Project[]
}

export interface UserList {
     list : User[]
 }