import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}
  

  headers = new HttpHeaders({ 'Request-Token': 'jkdlksalls-BKnknkdndklc' });

  headers1 !: HttpHeaders
                              

  public login(username: string, password: string): Observable<any> {
    const request = { username, password };
    return this.http.post<any>(environment.server + '/api/authenticate', request, {headers:this.headers} );
  }

  public user(): Observable<User> {
    console.log(this.headers1)
    this.headers1 = new HttpHeaders({ 'Request-Token': 'jkdlksalls-BKnknkdndklc' , 
                              'Authorization': 'Bearer '+ sessionStorage.getItem('jwt'),
                              'Content-Type': 'application/json'});
      return this.http.get<User>(environment.server + '/api/user', {headers:this.headers1});
  }
}
