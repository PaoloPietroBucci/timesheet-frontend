import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';
import { ProjectList } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  headers = new HttpHeaders({ 'Request-Token': 'jkdlksalls-BKnknkdndklc' });
  headers1 = new HttpHeaders({ 'Request-Token': 'jkdlksalls-BKnknkdndklc',
                            'Content-Type': 'application/json' });
  
  constructor(private http : HttpClient) { }

  insertProject( data:[name:string, type:string] ){
    return this.http.post(environment.server+'/api/project',{name:data[0],type:data[1]},{headers:this.headers})
  }

  getAllProjects(): Observable<ProjectList>{
    return this.http.post<ProjectList>(environment.server+'/api/project/all',{},{headers:this.headers})
  }

  insertUserProject(data :[projectId:number, userId:number]){
    return this.http.post(environment.server+'/api/users-project',{projectId:data[0], userId:data[1]},{headers:this.headers})
  }

  deleteProject(projectId : string){
    return this.http.delete(environment.server+'/api/project/'+projectId, {headers: this.headers1})
  }
  getTotalHourProjects():Observable<{list:[], totalElements:number}>{
    return this.http.post<{list:[], totalElements:number}>(environment.server+'/api/total-hour-per-project/all',{}, {headers: this.headers1})
  }
  getHourUserProject() :Observable<{list:[], totalElements:number}>{
    return this.http.post<{list:[], totalElements:number}>(environment.server+'/api/hour-user-project/all',{}, {headers: this.headers1})
  }
  getExcelTotalHour():Observable<Blob>{
    return this.http.post<Blob>(environment.server+'/api/total-hour-per-project/excel',{},{headers: this.headers, responseType: 'blob' as 'json'})
  }
  getExcelHourUserProject():Observable<Blob>{
    return this.http.post<Blob>(environment.server+'/api/hour-user-project/excel',{},{headers: this.headers, responseType: 'blob' as 'json'})
  }

}
