import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User, UserList } from '../model/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    'Request-Token': 'jkdlksalls-BKnknkdndklc',
    'Content-Type': 'application/json'
  });

  getUserByUsernameAndPassword(username: string, password:string){
    return this.http.post<User>(environment.server +'api/users/all', {username, password})
  }
  getUserById(userId:number):Observable<User>{
    return this.http.get<User>(environment.server + '/api/users/' + userId,{headers:this.headers})
  }
  getUserByUsername(username: string):Observable<User>{
    return this.http.get<User>(environment.server + '/api/users/' + username,{headers:this.headers})
  }

  getAllUsers(): Observable<UserList>{
    return this.http.post<UserList>(environment.server +'/api/users/all',{}, {headers:this.headers})
  }

  insertUser(data: [name:string,surname:string, mail:string, username:string, password:string ]){
    return this.http.post(environment.server +'/api/users',{name:data[0], surname:data[1], mail:data[2], username: data[3], password:data[4]}, 
                          {headers:this.headers})
  }
  
}


