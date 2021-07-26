import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Classe} from '../models/Classe';
import {ClasseService} from '../services/classe.service';
import {Etudiant} from '../models/Etudiant';
import {Module} from '../models/Module';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  value = '';

  dataSource: MatTableDataSource<Classe> = new MatTableDataSource()
  private paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = ['libelle' , 'niveau' , 'groupe' , 'nom' ,'responsable' ,'actions'];

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  classes: Classe[] = [];
  selectedetudiants : Etudiant[] = [] ;
  selectedmodules : Module[] = [] ;

  selectedId = null ;
  addForm : FormGroup ;
  updateForm : FormGroup ;

  constructor(private classeService: ClasseService) {

  }


  ngOnInit() {

    this.classeService.getClasses().subscribe(
      (res) => {
        console.log(res)
        this.classes = res;
        this.dataSource = new MatTableDataSource(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );

    this.addForm = new FormGroup({
      'libelle' : new FormControl(null , Validators.required),
      'niveau' : new FormControl(null , Validators.required ),
      'groupe' : new FormControl(null , Validators.required  ),
    });

    this.updateForm = new FormGroup({
      'libelle' : new FormControl(null , Validators.required),
      'niveau' : new FormControl(null , Validators.required ),
      'groupe' : new FormControl(null , Validators.required  ),
    })

  }

  resolve() {
    if (this.classes == null) {
      return true
    } else return this.classes.length == 0;
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
    this.classeService.DeleteClasse(this.selectedId).subscribe(
      res => {
        this.classes.splice(this.classes.findIndex(
          (g) => {return g.id_classe == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }


  add(){
    this.classeService.postClasse(this.addForm.value).subscribe(
      res => {
        this.classes.push(res) ;
        this.dataSource = new MatTableDataSource(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeForm(this.addForm) ;
      },
      error => console.log(error)
    )
  }

  update(){
    let classe : Classe ;
    classe = this.updateForm.value ;
    classe.id_classe = this.selectedId ;
    this.classeService.putClasse(classe).subscribe(
      res => {
        this.classes.map(
          c => {
            if(c.id_classe == this.selectedId){
               c.libelle = classe.libelle ; c.niveau = classe.niveau ; c.groupe = classe.groupe ;

            }
          });
      },
      err => console.log(err),
    )
  }

  update_form(id){
    console.log(id)
    this.selectedId = id ;
    this.updateForm.setValue({
      'libelle' : this.classes.find(res =>{return res.id_classe == id}).libelle,
      'niveau' : this.classes.find(res =>{return res.id_classe == id}).niveau,
      'groupe' :  this.classes.find(res =>{return res.id_classe == id}).groupe,
    });
  }

  initializeForm(form){
    form.setValue({
      'libelle' :null,
      'niveau' : null,
      'groupe' : null,
    });
  }

  selectEtudiants(etId){
    this.selectedetudiants = this.classes[this.classes.findIndex(
(g) => {return g.id_classe == etId})
      ].liste_etudiants
  }

  selectModules(mdId){
    this.selectedmodules = this.classes[this.classes.findIndex(
      (g) => {return g.id_classe == mdId})
      ].liste_modules
  }
}
