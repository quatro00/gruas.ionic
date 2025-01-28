import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/auth/login-request.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/auth/login-response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/auth/user-model.models';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  service:string = 'Reportes';
  
  constructor(private http:HttpClient) { }

  GetPagosProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/GetPagosProveedor`,request);
  }

  GetServiciosProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/GetServiciosProveedor`,request);
  }

  GetServiciosProveedorMensuales(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/GetServiciosProveedorMensuales`,request);
  }
}