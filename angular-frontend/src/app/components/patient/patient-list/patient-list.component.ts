import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../../classes/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: [ './patient-list.component.css' ]
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients: Observable<Patient[]>;
  patientsByName: Observable<Patient[]>;
  subscription: Subscription;

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.patientService.getListUpdateAlert().subscribe(
      (patientMessage) => {
        if (patientMessage) {
          this.reloadData();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  reloadData() {
    this.patients = this.patientService.getAll();
    console.log(this.patients);
  }

  patientDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  addPatient() {
    this.router.navigate([ 'add' ], { relativeTo: this.route });
  }

  getPatientsByName(input: string) {
    this.patientsByName = this.patientService.findByName(input);
  }
}
