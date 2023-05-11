import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import{HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';





import { DatePipe } from '@angular/common'







import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserComponent } from './components/user/user.component';
import { AddComponent } from './components/add/add.component';
import { UserServiceService } from './services/user-service.service';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { StatsComponent } from './stats/stats.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHomepageComponent,
    UserComponent,
    AddComponent,
    AdminHomepageComponent,
    ProjectsComponent,
    UsersComponent,
    TimetableComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    DatePipe,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSortModule,
    MatTabsModule
    

  ],
  providers: [UserServiceService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
