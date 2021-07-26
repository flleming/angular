import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CadreService} from '../services/cadre.service';
import {Cadre_administratif} from '../models/Cadre_administratif';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-cadres',
  templateUrl: './cadres.component.html',
  styleUrls: ['./cadres.component.scss']
})
export class CadresComponent implements OnInit {

  addForm : FormGroup ;
  updateForm : FormGroup ;

  value = '';

  dataSource: MatTableDataSource<Cadre_administratif> = new MatTableDataSource()

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nom', 'prenom', 'poste' ,'cin', 'tel', 'adresse', 'actions'];

  cadres: Cadre_administratif[] = null;
  selectedId = null ;

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private cadreService: CadreService , private authService : AuthService) {
  }

  ngOnInit() {
    this.cadreService.getCadres().subscribe(
      (res) => {
        this.cadres = res;
        this.dataSource = new MatTableDataSource(this.cadres);
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
      'poste' : new FormControl(null , Validators.required ),
      'adresse' : new FormControl(null , Validators.required),
      'username' : new FormControl(null , [Validators.required , Validators.email] ) ,
      'password' : new FormControl(null , Validators.required) ,
    });

    this.updateForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required),
      'prenom' : new FormControl(null , Validators.required ),
      'cin' : new FormControl(null , Validators.required ),
      'tel' : new FormControl(null , Validators.required ),
      'poste' : new FormControl(null , Validators.required ),
      'adresse' : new FormControl(null , Validators.required),
    })

  }

  resolve() {
    if (this.cadres == null) {
      return true
    } else return this.cadres.length == 0;
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
    this.cadreService.DeleteCadre(this.selectedId).subscribe(
      res => {
        this.cadres.splice(this.cadres.findIndex(
          (g) => {return g.id_cadre == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.cadres);
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
      roles : "cadre",
      active : true
    }).subscribe(
      res => {
        let c = new Cadre_administratif() ;
            c = this.addForm.value ;
            c.auth_id = res.id ;
            this.cadreService.postCadre(this.addForm.value).subscribe(
              res => {
                this.cadres.push(res) ;
                this.dataSource = new MatTableDataSource(this.cadres);
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
    let cadre : Cadre_administratif ;
    cadre = this.updateForm.value ;
    cadre.id_cadre = this.selectedId ;
    this.cadreService.putCadre(cadre).subscribe(
      res => {
         this.cadres.map(
          c => {
            if(c.id_cadre == this.selectedId){
              c.nom = cadre.nom ; c.prenom = cadre.prenom ; c.cin = cadre.cin ;
              c.poste = cadre.poste ; c.adresse = cadre.adresse ; c.tel = cadre.tel ;
            }
          });
      },
      err => console.log(err),
    )
  }

  update_form(id){
    this.selectedId = id ;
    this.updateForm.setValue({
      'nom' : this.cadres.find(res =>{return res.id_cadre == id}).nom,
      'prenom' : this.cadres.find(res =>{return res.id_cadre == id}).prenom,
      'cin' : this.cadres.find(res =>{return res.id_cadre == id}).cin,
      'tel' : this.cadres.find(res =>{return res.id_cadre == id}).tel,
      'poste' : this.cadres.find(res =>{return res.id_cadre == id}).poste,
      'adresse' : this.cadres.find(res =>{return res.id_cadre == id}).adresse
    });
  }

  initializeForm(form){
    form.setValue({
      'nom' : null,
      'prenom' : null,
      'cin' :  null,
      'tel' :  null,
      'poste' :  null,
      'adresse' :  null,
      'username' : null  ,
      'password' : null
    });
  }
}
