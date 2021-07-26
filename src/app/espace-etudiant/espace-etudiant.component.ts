import { Component, OnInit } from '@angular/core';
import {Seance} from '../models/Seance';
import {EtudiantService} from '../services/etudiant.service';
import {SeanceService} from '../services/seance.service';
import {Etudiant} from '../models/Etudiant';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.scss']
})
export class EspaceEtudiantComponent implements OnInit {

  me : Etudiant ;
  emploi : any  ;
  constructor(private etudiantService : EtudiantService , private seanceService : SeanceService , private authService : AuthService) { }

  ngOnInit() {
    let data = this.authService.getAuthData()
    this.etudiantService.getEtudiant(data.id).subscribe(
      res => {
        this.me = res ;
        this.seanceService.getClasseSeances(this.me.classe).subscribe(
          res =>{
            console.log(res)
            this.emploi = this.getEmploi(res)
            console.log(this.emploi)          }

        )
      },
      err => console.log(err)
    )
}


  getEmploi(list : Seance[] ){
    let res = [[null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null],
              [null,null,null,null,null,null]];

    for(let s of list){
      for(let i=0 ; i<6 ; i++){
        for(let j=0 ; j<6 ; j++) {

          if(this.getjour(s)==i && this.getheure(s)==j){
            res[j][i] = s ;
          }
        }
      }
    }
    return res ;
  }

  getjour(s){
    if(s.jour == "Lundi"){return 0}
    else if(s.jour == "Mardi"){return 1}
    else if(s.jour == "Mercredi"){return 2}
    else if(s.jour == "Jeudi"){return 3}
    else if(s.jour == "Vendredi"){return 4}
    else return 5
  }

  getheure(s){
    if(s.heure == "8:30"){return 0}
    else if(s.heure == "10:15"){return 1}
    else if(s.heure == "12:00"){return 2}
    else if(s.heure == "13:30"){return 3}
    else if(s.heure == "14:45"){return 4}
    else return 5
  }

}
