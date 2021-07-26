import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Seance} from '../models/Seance';
import {SeanceService} from '../services/seance.service';
import {ClasseService} from '../services/classe.service';
import {EnseignantService} from '../services/enseignant.service';
import {ModuleService} from '../services/module.service';
import {Classe} from '../models/Classe';
import {Enseignant} from '../models/Enseignant';
import {Module} from '../models/Module';

@Component({
  selector: 'app-cours',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss']
})
export class SeanceComponent implements OnInit {
  value = '';

  dataSource: MatTableDataSource<Seance> = new MatTableDataSource()
  private paginator: MatPaginator;


  jours = ["Lundi" ,"Mardi" , "Mercredi" , "Jeudi" , "Vendredi" ,"Samedi"];
  heure = ["8:30" , "10:15" ,"12:00", "13:30","14:45","16:30"];
  types = ["COURS","TD","TP"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = ['type','module', 'ens' , 'jour' , 'heure' , 'classe' , 'actions'];

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  seances: Seance[] = [];
  classes: Classe[] = [];
  enseignants: Enseignant[] = [];
  modules: Module[] = [];

  selectedId = null ;
  addForm : FormGroup ;
  updateForm : FormGroup ;

  constructor(private seanceService: SeanceService , private classeService : ClasseService ,
              private enseignantService : EnseignantService , private moduleService : ModuleService) {

  }



  ngOnInit() {

    this.seanceService.getSeances().subscribe(
      (res) => {
        this.seances = res;
        this.dataSource = new MatTableDataSource(this.seances);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );

    this.classeService.getClasses().subscribe(
      (res) => {
        this.classes = res;
      },
      error => console.log(error)
    );

    this.enseignantService.getEnseignants().subscribe(
      (res) => {
        this.enseignants = res;
      },
      error => console.log(error)
    );

    this.moduleService.getModules().subscribe(
      (res) => {
        this.modules = res;
      },
      error => console.log(error)
    );


    this.addForm = new FormGroup({
      'type' : new FormControl(null , Validators.required),
      'jour' : new FormControl(null , Validators.required ),
      'heure' : new FormControl(null ,Validators.required),
      'classe' : new FormControl(null, Validators.required),
      'enseignant' : new FormControl(null, Validators.required),
      'module' : new FormControl(null, Validators.required),
    });

    // this.updateForm = new FormGroup({
    //   'nom' : new FormControl(null , Validators.required ),
    //   'coefficient' : new FormControl(null , Validators.required),
    //   'cours' : new FormControl(null),
    //   'td' : new FormControl(null),
    //   'tp' : new FormControl(null),    })

  }

  resolve() {
    if (this.seances == null) {
      return true
    } else return this.seances.length == 0;
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
    this.seanceService.DeleteSeance(this.selectedId).subscribe(
      res => {
        this.seances.splice(this.seances.findIndex(
          (g) => {return g.id_seance == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.seances);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }


  add(){
    let ens = new Enseignant() ;
    let c = new Classe() ;
    let m = new Module();
    let s = new Seance();
    ens.id_enseignant = this.addForm.value.enseignant ;
    c.id_classe=this.addForm.value.classe ;
    m.id_module=this.addForm.value.module ;
    s = this.addForm.value ;
    s.enseignant = ens ; s.classe =c ; s.module =m ;
    this.seanceService.postSeance(s).subscribe(
      res => {
        res.classe = this.classes[this.classes.findIndex(c => {
          return c.id_classe == res.classe.id_classe
        })];
        res.module = this.modules[this.modules.findIndex(c => {
          return c.id_module == res.module.id_module
        })];
        res.enseignant = this.enseignants[this.enseignants.findIndex(c => {
          return c.id_enseignant == res.enseignant.id_enseignant
        })];
        this.seances.push(res) ;
        this.dataSource = new MatTableDataSource(this.seances);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeForm(this.addForm) ;
      },
      error => console.log(error)
    )
  }

  update(){
  //   let module : Module ;
  //   module = this.updateForm.value ;
  //   module.id_module = this.selectedId ;
  //   this.moduleService.putModule(module).subscribe(
  //     res => {
  //       this.modules.map(
  //         c => {
  //           if(c.id_module == this.selectedId){
  //             c.nom = module.nom ; c.coefficient = module.coefficient ; c.cours = module.cours ;
  //             c.tp = module.tp ; c.td = module.td ;
  //           }
  //         });
  //     },
  //     err => console.log(err),
  //   )
  }

  update_form(id){
  //   this.selectedId = id ;
  //   this.updateForm.setValue({
  //     'nom' : this.modules.find(res =>{return res.id_module == id}).nom,
  //     'coefficient' : this.modules.find(res =>{return res.id_module == id}).coefficient,
  //     'cours' :  this.modules.find(res =>{return res.id_module == id}).cours,
  //     'td' :  this.modules.find(res =>{return res.id_module == id}).td,
  //     'tp' : this.modules.find(res =>{return res.id_module == id}).tp,
  //
  //   });
  }

  initializeForm(form){
    form.setValue({
      'type' : null,
      'jour' : null,
      'heure' : null,
      'classe' : null,
      'enseignant' :  null,
      'module' :  null,
    });
  }

}
