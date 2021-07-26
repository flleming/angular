import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders} from '@angular/common/http';


let headers = new HttpHeaders({
  'Content-Type': 'text/xml'});
let options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(private http: HttpClient) {
  }

  // getHostorique(): Observable<any> {
  //   return this.http.post(this.URL ,  this.body , options);
  // }


}
