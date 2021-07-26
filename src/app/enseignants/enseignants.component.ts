import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthService} from '../services/auth/auth.service';
import {Enseignant} from '../models/Enseignant';
import {EnseignantService} from '../services/enseignant.service';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.scss']
})
export class EnseignantsComponent implements OnInit {

  addForm : FormGroup ;
  updateForm : FormGroup ;

  value = '';

  dataSource: MatTableDataSource<Enseignant> = new MatTableDataSource()

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nom', 'prenom' ,'cin', 'tel','grade' ,'adresse', 'actions'];

  enseignants: Enseignant[] = null;
  selectedId = null ;

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private enseignantService: EnseignantService , private authService : AuthService) {
  }

  ngOnInit() {
    this.enseignantService.getEnseignants().subscribe(
      (res) => {
        this.enseignants = res;
        this.dataSource = new MatTableDataSource(this.enseignants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );

    this.addForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required),
      'prenom' : new FormControl(null , Validators.required ),
      'cin' : new FormControl(null , Validators.required ),
      'tel' : new FormControl(null , Validators.required ),
      'adresse' : new FormControl(null , Validators.required),
      'grade' : new FormControl(null , Validators.required),
      'username' : new FormControl(null , [Validators.required , Validators.email] ) ,
      'password' : new FormControl(null , Validators.required) ,
    });

    this.updateForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required),
      'prenom' : new FormControl(null , Validators.required ),
      'cin' : new FormControl(null , Validators.required ),
      'tel' : new FormControl(null , Validators.required ),
      'grade' : new FormControl(null , Validators.required),
      'adresse' : new FormControl(null , Validators.required),
    })

  }

  resolve() {
    if (this.enseignants == null) {
      return true
    } else return this.enseignants.length == 0;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  select(id){
    this.selectedId = id ;
  }

  delete(){
    this.enseignantService.DeleteEnseignant(this.selectedId).subscribe(
      res => {
        this.enseignants.splice(this.enseignants.findIndex(
          (g) => {return g.id_enseignant == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.enseignants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }

  add(){
    this.authService.postAuthData({
      username : this.addForm.value.username ,
      password : this.addForm.value.password ,
      roles : "enseignant",
      active : true
    }).subscribe(
      res => {
        let c = new Enseignant() ;
        c = this.addForm.value ;
        c.auth_id = res.id ;
        this.enseignantService.postEnseignant(this.addForm.value).subscribe(
          res => {
            this.enseignants.push(res) ;
            this.dataSource = new MatTableDataSource(this.enseignants);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.initializeForm(this.addForm) ;
          },
          error => console.log(error)
        )
      } ,
      err => console.log(err)
    )
  }

  update(){
    let ens : Enseignant ;
    ens = this.updateForm.value ;
    ens.id_enseignant = this.selectedId ;
    this.enseignantService.putEnseignant(ens).subscribe(
      res => {
        this.enseignants.map(
          c => {
            if(c.id_enseignant == this.selectedId){
              c.nom = ens.nom ; c.prenom = ens.prenom ; c.cin = ens.cin ;
              c.grade = ens.grade ; c.adresse = ens.adresse ; c.tel = ens.tel ;
            }
          });
      },
      err => console.log(err),
    )
  }

  update_form(id){
    this.selectedId = id ;
    this.updateForm.setValue({
      'nom' : this.enseignants.find(res =>{return res.id_enseignant == id}).nom,
      'prenom' : this.enseignants.find(res =>{return res.id_enseignant == id}).prenom,
      'cin' : this.enseignants.find(res =>{return res.id_enseignant == id}).cin,
      'tel' : this.enseignants.find(res =>{return res.id_enseignant == id}).tel,
      'grade' : this.enseignants.find(res =>{return res.id_enseignant == id}).grade,
      'adresse' : this.enseignants.find(res =>{return res.id_enseignant == id}).adresse,

    });
  }

  initializeForm(form){
    form.setValue({
      'nom' : null,
      'prenom' : null,
      'cin' :  null,
      'tel' :  null,
      'adresse' :  null,
      'username' : null  ,
      'password' : null,
      'grade' : null,
    });
  }
}
