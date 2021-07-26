import {Component, OnInit, ViewChild} from '@angular/core';
import {EtudiantService} from '../services/etudiant.service';
import {Etudiant} from '../models/Etudiant';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClasseService} from '../services/classe.service';
import {Classe} from '../models/Classe';
import {AuthData} from '../services/auth/auth-data.model';
import {AuthService} from '../services/auth/auth.service';



@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent implements OnInit {

  addForm : FormGroup ;
  updateForm : FormGroup ;

  value = '';

  dataSource: MatTableDataSource<Etudiant> = new MatTableDataSource();

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nom' , 'prenom' , 'classe' , 'cin', 'tel','adresse',  'actions'];


  etudiants : Etudiant[] = null;
  classes: Classe[] = null ;

  selectedId = null ;

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private etudiantsService : EtudiantService , private classeService : ClasseService , private authService : AuthService) { }

  ngOnInit() {
    this.etudiantsService.getEtudiants().subscribe(
      (res) => {
        this.etudiants = res ;
        this.dataSource = new MatTableDataSource(this.etudiants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    )

    this.addForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required ),
      'prenom' : new FormControl(null , Validators.required ),
      'cin' : new FormControl(null , Validators.required),
      'tel' : new FormControl(null , Validators.required),
      'classe' : new FormControl(null , Validators.required),
      'adresse' : new FormControl(null , Validators.required) ,
      'username' : new FormControl(null , [Validators.required , Validators.email] ) ,
      'password' : new FormControl(null , Validators.required) ,
    });

    this.updateForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required ),
      'prenom' : new FormControl(null , Validators.required ),
      'cin' : new FormControl(null , Validators.required),
      'tel' : new FormControl(null , Validators.required),
      'classe' : new FormControl(null , Validators.required),
      'adresse' : new FormControl(null , Validators.required) ,
    })

    this.classeService.getClasses().subscribe(
      res => this.classes = res ,
      err => this.classes = err
    )
  }

  select(id){
    this.selectedId = id ;
  }

  resolve(){
    if(this.etudiants == null ){
      return true
    }
    else return this.etudiants.length == 0;
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(){
    this.etudiantsService.DeleteEtudiant(this.selectedId).subscribe(
      res => {
        this.etudiants.splice(this.etudiants.findIndex(
          (g) => {return g.id_etudiant == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.etudiants);
      },
      err => console.log(err)
    )
  }

  add(){
    this.authService.postAuthData({
      username : this.addForm.value.username ,
      password : this.addForm.value.password ,
      roles : "etudiant",
      active : true
    }).subscribe(
      res => {
        let et = new Etudiant() ;
        let cl = new Classe() ;
        cl.id_classe = this.addForm.value.classe ;
        et = this.addForm.value ;
        et.classe= cl ;
        et.auth_id = res.id ;
        this.etudiantsService.postEtudiant(et).subscribe(
          res => {
            res.classe = this.classes[this.classes.findIndex(c => {
              return c.id_classe == res.classe.id_classe
            })];
            this.etudiants.push(res) ;
            this.dataSource = new MatTableDataSource(this.etudiants);
            this.initializeForm(this.addForm) ;
          },
          error => console.log(error)
        )
      } ,
      err => console.log(err)
    )
  }

  initializeForm(form){
    form.setValue({
      'nom' : null,
      'prenom' : null,
      'cin' :  null,
      'tel' :  null,
      'classe' :  null,
      'adresse' :  null,
      'username' : null  ,
      'password' : null
    });
  }


  update(){
    let etudiant : Etudiant ;
    let classe = new Classe ;
    classe.id_classe = this.updateForm.value.classe ;
    etudiant = this.updateForm.value ;
    etudiant.id_etudiant = this.selectedId ;
    etudiant.classe = classe ;
    console.log(etudiant);

    this.etudiantsService.putEtudiant(etudiant).subscribe(
      res => {
        this.etudiants.map(
          c => {
            if(c.id_etudiant == this.selectedId) {
              c.nom = etudiant.nom;
              c.prenom = etudiant.prenom;
              c.cin = etudiant.cin;
              c.adresse = etudiant.adresse;
              c.tel = etudiant.tel;
              c.classe = this.classes[this.classes.findIndex(c => {
                return c.id_classe == etudiant.classe.id_classe
              })]
            }
          })



      },
      err => console.log(err),
    )
  }

  update_form(id){
    this.selectedId = id ;
    this.updateForm.setValue({
      'nom' : this.etudiants.find(res =>{return res.id_etudiant == id}).nom,
      'prenom' : this.etudiants.find(res =>{return res.id_etudiant == id}).prenom,
      'cin' : this.etudiants.find(res =>{return res.id_etudiant == id}).cin,
      'tel' : this.etudiants.find(res =>{return res.id_etudiant == id}).tel,
      'classe' : this.etudiants.find(res =>{return res.id_etudiant == id}).classe.id_classe ,
      'adresse' : this.etudiants.find(res =>{return res.id_etudiant == id}).adresse
    });
  }
}





















