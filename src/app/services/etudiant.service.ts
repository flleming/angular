import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Etudiant} from '../models/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  URL = "http://localhost:8082/etudiants";

  constructor(private http: HttpClient) {
  }

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.URL);
  }

  getEtudiant(id): Observable<Etudiant> {
    return this.http.get<Etudiant>(this.URL +"/" +id);
  }

  postEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.URL, etudiant);
  }

  DeleteEtudiant(id: number) {
    return this.http.delete(this.URL+'/' + id);
  }

  putEtudiant(etudiant: Etudiant) {
    return this.http.put(this.URL, etudiant);
  }
}
