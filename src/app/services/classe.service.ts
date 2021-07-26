import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classe} from '../models/Classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  URL = "http://localhost:8082/classes";

  constructor(private http: HttpClient) {
  }

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.URL);
  }

  postClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.URL, classe);
  }

  DeleteClasse(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }

  putClasse(classe: Classe) {
    return this.http.put(this.URL, classe);
  }
}
