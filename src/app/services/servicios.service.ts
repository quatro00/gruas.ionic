import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  service:string = 'Servicio';


  constructor(private http:HttpClient) { }
  
  GetServiciosProximos():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetServiciosProximos`);
  }

  GetServiciosDisponibles():Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/${this.service}/GetServiciosDisponibles`);
  }

  EnviarCotizacionProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/EnviarCotizacionProveedor`,request);
  }

  ModificarCotizacionProveedor(request:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/ModificarCotizacionProveedor`,request);
  }
}