import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cadre_administratif} from '../models/Cadre_administratif';

@Injectable({
  providedIn: 'root'
})
export class CadreService {

  URL = "http://localhost:8082/cadres";

  constructor(private http: HttpClient) {
  }

  getCadres(): Observable<Cadre_administratif[]> {
    return this.http.get<Cadre_administratif[]>(this.URL);
  }

  postCadre(cadreAdministratif: Cadre_administratif): Observable<Cadre_administratif> {
    return this.http.post<Cadre_administratif>(this.URL, cadreAdministratif);
  }

  DeleteCadre(id: number) {
    return this.http.delete(this.URL+'/' + id);
  }

  putCadre(cadreAdministratif: Cadre_administratif) {
    return this.http.put(this.URL, cadreAdministratif);
  }
}
