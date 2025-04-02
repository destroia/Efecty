import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  url : string = "https://localhost:7240/";
  constructor(private service : HttpClient) { }

  GetAll() : Observable<any[]>{
    return this.service.get<any[]>(this.url + "api/personas/GetAll")
  }
  Delete(Id : number) : Observable<boolean>{
    return this.service.delete<boolean>(this.url + "api/personas/Delete/" + Id)
  }
  Crear(payload : any) : Observable<any[]>{
    return this.service.post<any[]>(this.url + "api/personas/Save",payload)
  }
  Actualizar(payload : any) : Observable<any[]>{
    return this.service.post<any[]>(this.url + "api/personas/Update",payload)
  }
}
