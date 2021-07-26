import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Module} from '../models/Module';
import {ModuleService} from '../services/module.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements  OnInit  {

  value = '';

  dataSource: MatTableDataSource<Module> = new MatTableDataSource()
  private paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = ['nom' , 'coefficient' ,"cours", "tp", "td" , "actions"];

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  modules: Module[] = [];
  selectedId = null ;
  addForm : FormGroup ;
  updateForm : FormGroup ;

  constructor(private moduleService: ModuleService) {

  }



  ngOnInit() {

    this.moduleService.getModules().subscribe(
      (res) => {
        this.modules = res;
        this.dataSource = new MatTableDataSource(this.modules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );

    this.addForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required),
      'coefficient' : new FormControl(null , Validators.required ),
      'cours' : new FormControl(null),
      'td' : new FormControl(null),
      'tp' : new FormControl(null),
    });

    this.updateForm = new FormGroup({
      'nom' : new FormControl(null , Validators.required ),
      'coefficient' : new FormControl(null , Validators.required),
      'cours' : new FormControl(null),
      'td' : new FormControl(null),
      'tp' : new FormControl(null),    })

  }

  resolve() {
    if (this.modules == null) {
      return true
    } else return this.modules.length == 0;
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
    this.moduleService.DeleteModule(this.selectedId).subscribe(
      res => {
        this.modules.splice(this.modules.findIndex(
          (g) => {return g.id_module == this.selectedId}
        ),1);
        this.dataSource = new MatTableDataSource(this.modules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    )
  }


  add(){
    this.moduleService.postModule(this.addForm.value).subscribe(
      res => {
        this.modules.push(res) ;
        this.dataSource = new MatTableDataSource(this.modules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeForm(this.addForm) ;
      },
      error => console.log(error)
    )
  }

  update(){
    let module : Module ;
    module = this.updateForm.value ;
    module.id_module = this.selectedId ;
    this.moduleService.putModule(module).subscribe(
      res => {
        this.modules.map(
          c => {
            if(c.id_module == this.selectedId){
              c.nom = module.nom ; c.coefficient = module.coefficient ; c.cours = module.cours ;
              c.tp = module.tp ; c.td = module.td ;
            }
          });
      },
      err => console.log(err),
    )
  }

  update_form(id){
    this.selectedId = id ;
    this.updateForm.setValue({
      'nom' : this.modules.find(res =>{return res.id_module == id}).nom,
      'coefficient' : this.modules.find(res =>{return res.id_module == id}).coefficient,
      'cours' :  this.modules.find(res =>{return res.id_module == id}).cours,
      'td' :  this.modules.find(res =>{return res.id_module == id}).td,
      'tp' : this.modules.find(res =>{return res.id_module == id}).tp,

    });
  }

  initializeForm(form){
    form.setValue({
      'nom' :null,
      'coefficient' : null,
      'cours' : null,
      'td' : null,
      'tp' : null,
    });
  }

}
