import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Module} from '../models/Module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  URL = "http://localhost:8082/modules";

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.URL);
  }

  postModule(module: Module): Observable<Module> {
    return this.http.post<Module>(this.URL, module);
  }

  DeleteModule(id: number) {
    return this.http.delete(this.URL+'/' + id);
  }

  putModule(module: Module) {
    return this.http.put(this.URL, module);
  }
}
