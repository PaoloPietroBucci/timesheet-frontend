import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService ,public dialog: MatDialog, private router: Router, private authService : AuthService){
    
  }

  user!: User
  loginform!: FormGroup
  isLoginFailed: boolean = false;
  errorMessage = '';

  ngOnInit(): void { 
    this.loginform = new FormGroup({
     username: new FormControl(null,Validators.required),
     password: new FormControl(null,Validators.required),
     })}

  async onSubmit(){
      const username= this.loginform.value.username;
      const password= this.loginform.value.password;
      this.loginService.login(username, password).subscribe(
        async data => {
          sessionStorage.setItem('jwt', data.jwt);


          const user: User|undefined = await this.loginService.user().toPromise();
          sessionStorage.setItem('id', user?.id.toString() || '');
          sessionStorage.setItem('email', user?.email || '');
          sessionStorage.setItem('name', user!.name || '');
          sessionStorage.setItem('surname', user!.surname || '');
          sessionStorage.setItem('username', user!.username || '');
          sessionStorage.setItem('role', user!.role || '');
          this.isLoginFailed = false;
          if(user!.role == 'ADMIN'){
            this.authService.isAdmin = true
            this.router.navigate(['/admin-homepage/'+user?.id.toString() ]);
            }
          else{
            this.router.navigate(['/user-homepage/'+user?.id.toString()])
          }
        },
          err => {
           this.errorMessage = err.error.message;
           this.isLoginFailed = true;
           alert("username o password errati")
         }
       );
    }
    openDialog(){ 
      this.dialog.open(RegisterComponent);}

}
