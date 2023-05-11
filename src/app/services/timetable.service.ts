import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timetable, TimetableList } from '../model/timetable.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  headers = new HttpHeaders({ 'Request-Token': 'jkdlksalls-BKnknkdndklc' });


  constructor(private http : HttpClient) { }

  insertTimetable(data:[pId:number, userId:number,date:string,duration:number ]) :Observable<Timetable>{
    return this.http.post<Timetable>(environment.server+'/api/timetable', {projectId:data[0],userId:data[1],date:data[2],duration:data[3]},{headers:this.headers})
  }

  getAllTimetable(filter: {}): Observable<TimetableList>{
    return this.http.post<TimetableList>(environment.server+'/api/timetable/all',filter,{headers:this.headers})
  }

  getTimetableByUserId (userId : number) : Observable<TimetableList>{
    return this.http.post<TimetableList>(environment.server+'/api/timetable/all',{userId:userId},{headers:this.headers})
  }

  deleteTimetable(id : string){
    return this.http.delete(environment.server+'/api/project/'+id, {headers: this.headers})
  }

  sumTotalHour(userId:number): Observable<number>{
    return this.http.post<number>(environment.server+'/api/timetable/sum',{userId:userId},{headers:this.headers})
  }

  sumWeeklyHour(userId:number): Observable<number>{
    return this.http.post<number>(environment.server+'/api/timetable/sum-weekly',{userId:userId},{headers:this.headers})
  }

  
  getExcel(userId:number):Observable<BlobPart>{
    return this.http.post<BlobPart>(environment.server+'/api/timetable/excel',{userId:userId},{headers: this.headers, responseType: 'blob' as 'json'})
  }


  }
