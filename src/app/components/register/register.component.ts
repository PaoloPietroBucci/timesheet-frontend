import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm !: FormGroup

  constructor(private userService: UserServiceService, private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.registerForm= new FormGroup({
      name: new FormControl(null,Validators.required),
      surname: new FormControl(null,Validators.required),
      mail: new FormControl(null,[Validators.required, Validators.email]),
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })}
  

   onSubmit(){ 
  this.userService.insertUser(
                              [this.registerForm.value.name,
                              this.registerForm.value.surname,
                              this.registerForm.value.mail,
                              this.registerForm.value.username,
                              this.registerForm.value.password,]
                                  ).subscribe()
  window.location.reload()
  }
}
