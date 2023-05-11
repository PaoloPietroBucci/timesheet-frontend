import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  id : string = sessionStorage.getItem('id')!
  

  displayedColumnsTab1: string[] = ['projectName', 'totalHour'];
  displayedColumnsTab2: string[] = ['userFullName', 'projectName', 'totalHour'];

  dataSourceTotalHour !: MatTableDataSource<{}>;
  dataSourceHourUserProject!: MatTableDataSource<{}>;

  totalHourProjects !: {}[];
  hourUserProject !: {}[]


  constructor(private projectService: ProjectService) {
  }
  ngOnInit()  {


      this.projectService.getTotalHourProjects().subscribe((response)=>{

        this.totalHourProjects = (response.list)
        this.dataSourceTotalHour = new MatTableDataSource(this.totalHourProjects)

    })
    this.projectService.getHourUserProject().subscribe((response)=>{
      this.hourUserProject = (response.list)
        this.dataSourceHourUserProject = new MatTableDataSource(this.hourUserProject)
    })
    
  }

  downloadExcelTotalHour(){
    this.projectService.getExcelTotalHour().subscribe(
      (resource : any) => {
      var dataType = resource.type;
      let binaryData = [];
      binaryData.push(resource)
      let blob : Blob = new Blob(binaryData, {type: dataType})
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = "Excel.xls"
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  )
}
  downloadExcelHourUserProject(){
    this.projectService.getExcelHourUserProject().subscribe(
      (resource : any) => {
      var dataType = resource.type;
      let binaryData = [];
      binaryData.push(resource)
      let blob : Blob = new Blob(binaryData, {type: dataType})
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = "Excel.xls"
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  )
}




}
