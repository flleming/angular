import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Enseignant} from '../models/Enseignant';
import {Etudiant} from '../models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  URL = "http://localhost:8082/enseignants";

  constructor(private http: HttpClient) {
  }

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.URL);
  }

  getEnseignant(id): Observable<Enseignant> {
    return this.http.get<Enseignant>(this.URL +"/" +id);
  }

  postEnseignant(enseignant: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.URL, enseignant);
  }

  DeleteEnseignant(id: number) {
    return this.http.delete(this.URL+'/' + id);
  }

  putEnseignant(enseignant: Enseignant) {
    return this.http.put(this.URL, enseignant);
  }
}
