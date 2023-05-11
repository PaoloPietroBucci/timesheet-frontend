import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { Timetable } from 'src/app/model/timetable.model';
import { TimetableService } from 'src/app/services/timetable.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/model/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit{
  isClicked = false;
  userId !: string;

  constructor(public dialog: MatDialog, private route : ActivatedRoute,private timetableService : TimetableService){}

  async ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id')!


  }

  onClick(event: Event){
    this.isClicked=!this.isClicked
  }

  openDialog() {
  const dialogRef = this.dialog.open(AddComponent, {data:{id: this.userId} });
  }

   downloadExcel(){
    this.timetableService.getExcel(parseInt(this.userId)).subscribe(
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
