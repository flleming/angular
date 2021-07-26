import { Injectable } from '@angular/core';
import {Seance} from '../models/Seance';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Classe} from '../models/Classe';
import {Enseignant} from '../models/Enseignant';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  URL = "http://localhost:8082/seances";

  constructor(private http: HttpClient) {
  }

  getSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.URL);
  }

  postSeance(s: Seance): Observable<Seance> {
    return this.http.post<Seance>(this.URL, s);
  }

  DeleteSeance(id: number) {
    return this.http.delete(this.URL+'/' + id);
  }

  putSeance(s: Seance) {
    return this.http.put(this.URL, s);
  }

  getClasseSeances(c: Classe): Observable<Seance[]> {
    return this.http.post<Seance[]>(this.URL + "/classe", c);
  }

  getEnseignantSeances(e: Enseignant): Observable<Seance[]> {
    return this.http.post<Seance[]>(this.URL + "/enseignant", e);
  }

}
