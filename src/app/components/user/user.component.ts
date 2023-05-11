import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Timetable } from 'src/app/model/timetable.model';
import { User } from 'src/app/model/user.model';
import { TimetableService } from 'src/app/services/timetable.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id !:number
  user : User | undefined
  userTimetables !: Timetable[]
  userProject !: Project[]
  totalHour !: number
  weeklyHour !: number

  displayedColumns: string[] = ['project', 'date', 'duration', 'delete'];
  dataSource !: MatTableDataSource<Timetable, MatPaginator>
  dateFrom !: Date;

  constructor(private userService: UserServiceService,private timetableService: TimetableService, private route :ActivatedRoute,){
  }
  async ngOnInit() {

    this.id = parseInt(this.route.snapshot.paramMap.get('id')!)

    const user = await this.userService.getUserById(this.id).toPromise()
    this.user = user!
    this.userProject=this.user.projectList ?? []

    const timetables = await this.timetableService.getTimetableByUserId(this.id).toPromise()
    this.userTimetables = timetables?.list ?? []
    this.dataSource=new MatTableDataSource(this.userTimetables)

    this.timetableService.sumTotalHour(this.id).subscribe( (result: number) =>{
      this.totalHour = result || 0})
    this.timetableService.sumWeeklyHour(this.id).subscribe((result: number) =>{
      this.weeklyHour =   result || 0 })

    this.dataSource.paginator = this.paginator ;
    this.dataSource.sort = this.sort ;
  }

  //  ngAfterViewInit() {
  //   console.log(this.dataSource)
  //   this.dataSource?.paginator != this.paginator;
  //   this.dataSource?.sort != this.sort;
  //   console.log(this.dataSource)
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveDate(event: MatDatepickerInputEvent<Date>){
    this.dateFrom = event.value!
  }

  async doFilter(event: MatDatepickerInputEvent<Date>){

     var timetables = await this.timetableService.getAllTimetable({userId: this.id ,dateFrom: this.dateFrom, dateTo: event.value }).toPromise()
     this.dataSource= new MatTableDataSource(timetables?.list ?? [])

  }
  doProjectFilter(projectName : string, event:MatCheckboxChange){

  }
  deleteProject(id:string){
    this.timetableService.deleteTimetable(id).toPromise()
    window.location.reload()
  }




}
