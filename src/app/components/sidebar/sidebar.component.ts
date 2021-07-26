import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    authority : string ;
}
export const ROUTES: RouteInfo[] = [
    { path: '/app/espace_et', title: 'Mon Compte',  icon: 'users_single-02', class: ''  ,  authority : "etudiant" },
    { path: '/app/espace_en', title: 'Mon Compte',  icon:'users_single-02', class: '' ,authority : "enseignant" },
    { path: '/app/espace_c', title: 'Mon Compte',  icon: 'users_single-02', class: '' , authority : "cadre"},
    { path: '/app/etudiants', title: 'Etudiants',  icon: 'education_hat', class: '' , authority : "admin" },
    { path: '/app/enseignants', title: 'Enseignants',  icon:'business_briefcase-24', class: ''  , authority : "admin"},
    { path: '/app/cadres', title: 'Cadres Administratif',  icon:'files_single-copy-04', class: '', authority : "admin" },
    { path: '/app/classes', title: 'Classes',  icon:'files_box', class: '' , authority : "admin"},
    { path: '/app/modules', title: 'Modules',  icon:'design-2_ruler-pencil', class: '' , authority : "admin"},
   
    // { path: '/app/staistiques', title: 'Staistiques',  icon:'business_chart-bar-32', class: '', authority : "admin" },

  // { path: '/d', title: '',  icon: '', class: '' , authority : "admin"},
  //   { path: '/app/icons', title: 'Icons',  icon:'education_atom', class: '' , authority : "admin"},
  //   { path: '/app/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '', authority : "admin" },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  role : string ;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.role = this.authService.getAuthData().role
  }

  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
