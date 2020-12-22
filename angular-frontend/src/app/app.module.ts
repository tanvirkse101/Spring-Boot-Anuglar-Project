import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TutorialDetailsComponent } from './components/tutorial/tutorial-details/tutorial-details.component';
import { CreateTutorialComponent } from './components/tutorial/create-tutorial/create-tutorial.component';
import { UpdateTutorialComponent } from './components/tutorial/update-tutorial/update-tutorial.component';
import { TutorialListComponent } from './components/tutorial/tutorial-list/tutorial-list.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorAddComponent } from './components/doctor/doctor-add/doctor-add.component';
import { DoctorListComponent } from './components/doctor/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './components/doctor/doctor-details/doctor-details.component';
import { DoctorEditComponent } from './components/doctor/doctor-edit/doctor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorialDetailsComponent,
    CreateTutorialComponent,
    UpdateTutorialComponent,
    TutorialListComponent,
    HeaderComponent,
    DoctorComponent,
    DoctorAddComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    DoctorEditComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
