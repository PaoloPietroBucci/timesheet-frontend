import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/login'},
  // {path:'**', pathMatch:'full', redirectTo:'/login'},
  {path: 'login' , component : LoginComponent},
  {path: 'register' , component : RegisterComponent},
  {path: 'user-homepage/:id' , component : UserHomepageComponent},
  {path: 'admin-homepage/:id' , component : AdminHomepageComponent, canActivate:[AuthGuard]},
  {path: 'projects' , component : ProjectsComponent,canActivate:[AuthGuard]},
  {path: 'users' , component : UsersComponent, canActivate:[AuthGuard]},
  {path: 'stats' , component : StatsComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
