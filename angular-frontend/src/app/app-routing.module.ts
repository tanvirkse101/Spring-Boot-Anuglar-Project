import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTutorialComponent } from './components/tutorial/create-tutorial/create-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial/tutorial-details/tutorial-details.component';
import { UpdateTutorialComponent } from './components/tutorial/update-tutorial/update-tutorial.component';
import { TutorialListComponent } from './components/tutorial/tutorial-list/tutorial-list.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorAddComponent } from './components/doctor/doctor-add/doctor-add.component';
import { DoctorDetailsComponent } from './components/doctor/doctor-details/doctor-details.component';
import { DoctorEditComponent } from './components/doctor/doctor-edit/doctor-edit.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';
import { PatientDetailsComponent } from './components/patient/patient-details/patient-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialListComponent },
  { path: 'details/:id', component: TutorialDetailsComponent },
  { path: 'create', component: CreateTutorialComponent },
  { path: 'update/:id', component: UpdateTutorialComponent },
  {
    path: 'doctors', component: DoctorComponent, children: [
      { path: 'add', component: DoctorAddComponent },
      { path: 'details/:id', component: DoctorDetailsComponent },
      { path: 'update/:id', component: DoctorEditComponent }
    ]
  },
  {
    path: 'patients', component: PatientComponent, children: [
      { path: 'add', component: PatientEditComponent },
      { path: 'details/:id', component: PatientDetailsComponent },
      { path: 'update/:id', component: PatientEditComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
