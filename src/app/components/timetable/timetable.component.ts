import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Timetable } from 'src/app/model/timetable.model';
import { TimetableService } from 'src/app/services/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit, AfterViewInit {

  timetables !: Timetable[]

  displayedColumns: string[] = [ 'project', 'date', 'duration', 'delete'];
  dataSource !: MatTableDataSource<Timetable>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private timetableService: TimetableService) {
  }
  async ngOnInit()  {
    const response = await this.timetableService.getTimetableByUserId(parseInt(sessionStorage.getItem('id')!)).toPromise()
    this.timetables = response?.list ?? [];
    this.dataSource = new MatTableDataSource(this.timetables);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProject(id:string){
    this.timetableService.deleteTimetable(id).toPromise()
    window.location.reload()
  }

}
