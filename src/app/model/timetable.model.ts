import { Project } from "./project.model"
import { User } from "./user.model"

export interface Timetable{

id:number
user:User
project:Project
date: Date
duration:number

}

export interface TimetableList {
    list : Timetable[]
}