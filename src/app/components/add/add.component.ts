import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {DIALOG_DATA} from '@angular/cdk/dialog';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  user !: User
  addform!: FormGroup; 
  userProject !: Project[]
  
  constructor( private timetableService: TimetableService,private userService: UserServiceService,
               private datepipe: DatePipe, @Inject(DIALOG_DATA) public data:{id:string}){}

  async ngOnInit() { 

    const id =parseInt(this.data.id) 

      this.addform= new FormGroup({
       
       project: new FormControl(Validators.required),
       date: new FormControl(Validators.required),
       durata : new FormControl(null, Validators.required), 
      })

      console.log(id)

 
      const result = await this.userService.getUserById(id).toPromise()
      this.user = result!
      this.userProject=this.user.projectList
  
      
  }

  onSubmit(){
   
    this.timetableService.insertTimetable([
                        this.addform.value.project.id,
                        this.user.id,
                        this.datepipe.transform(this.addform.value.date,'yyyy-MM-dd')!,
                        this.addform.value.durata]).subscribe()
    window.location.reload()
    
   }
  


  
  
  }
