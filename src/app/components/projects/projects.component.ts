import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  implements OnInit, AfterViewInit {

  projects !: Project[]
  id : string = sessionStorage.getItem('id')!
  isAdmin !: boolean 
  

  displayedColumns: string[] = ['id','name', 'type', 'delete'];
  dataSource !: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showAddProject : boolean = false;
  addProjectForm: any;

  constructor(private projectService: ProjectService) {
  }
  async ngOnInit()  {

    this.addProjectForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null)})

    const response = await this.projectService.getAllProjects().toPromise()
    this.projects = response?.list ?? [];
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if(sessionStorage.getItem('role')=='ADMIN'){
      this.isAdmin = true
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmitProject(){ 
    this.projectService.insertProject([this.addProjectForm.value.name ,this.addProjectForm.value.type]).subscribe()
    window.location.reload()
    
  }
  addProject(event:Event){
    this.showAddProject = !this.showAddProject
  }
  deleteProject(id:string){
    this.projectService.deleteProject(id).toPromise()
    window.location.reload()
  }

}
