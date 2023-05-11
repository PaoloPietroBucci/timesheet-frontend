import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  addUserProjectForm !: FormGroup
  addProjectForm !: FormGroup
  showAddProject=false;
  showAddUser=false;

  constructor(private projectService : ProjectService, private userService: UserServiceService ){}
  
  ngOnInit(): void {
    this.addProjectForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null)})

    this.addUserProjectForm = new FormGroup({
      userName: new FormControl(null),
      userId: new FormControl(null),
      projectName: new FormControl(null),
      projectId: new FormControl(null)
   })

  }
  addUser(event:Event){
    this.showAddUser=!this.showAddUser

  }

  addProject(event:Event){
    this.showAddProject = !this.showAddProject
  }
  onSubmitProject(){ 
    this.projectService.insertProject([this.addProjectForm.value.name ,this.addProjectForm.value.type]).subscribe()
  }
  onSubmitUserProgect(){ 
    this.projectService.insertUserProject([this.addUserProjectForm.value.projectId, this.addUserProjectForm.value.userId]).subscribe()
  }



  

}
