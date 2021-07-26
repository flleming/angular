import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


import { EtudiantsComponent } from '../../etudiants/etudiants.component';
import { EnseignantsComponent } from '../../enseignants/enseignants.component';
import { ClassesComponent } from '../../classes/classes.component';
import { CadresComponent } from '../../cadres/cadres.component';
import { StatistiquesComponent } from '../../statistiques/statistiques.component';
import { ModulesComponent } from '../../modules/modules.component';
import { EspaceEtudiantComponent } from '../../espace-etudiant/espace-etudiant.component';
import { EspaceEnseignantComponent } from '../../espace-enseignant/espace-enseignant.component';
import { EspaceCadreComponent } from '../../espace-cadre/espace-cadre.component';
import { SeanceComponent } from '../../seance/seance.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatRadioModule,
  MatSortModule,
  MatAutocompleteModule,


} from '@angular/material';
import {AuthGuard} from '../../services/auth/auth.guard';
import {EtudiantGuard} from '../../services/auth/etudiant.guard';
import {EnseignantGuard} from '../../services/auth/enseignant.guard';
import {CadreGuard} from '../../services/auth/cadre.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),

    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatSortModule,
    MatAutocompleteModule,
    ReactiveFormsModule,



  ],
  declarations: [
    IconsComponent,
    NotificationsComponent,

    EspaceEtudiantComponent,
    EspaceEnseignantComponent,
    EspaceCadreComponent,
    EtudiantsComponent,
    EnseignantsComponent,
    ClassesComponent,
    CadresComponent,
    StatistiquesComponent,
    ModulesComponent,
    SeanceComponent
  ],
  providers: [AuthGuard , EtudiantGuard , EnseignantGuard , CadreGuard]
})

export class AdminLayoutModule {}
