import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = true
  isAdmin = true

  constructor(private http: HttpClient) { }

  isAutenticated(){
    return this.isAdmin
  }

}
