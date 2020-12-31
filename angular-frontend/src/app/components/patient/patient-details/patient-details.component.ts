import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../../classes/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: [ './patient-details.component.css' ]
})
export class PatientDetailsComponent implements OnInit {

  id: string;
  patient: Patient;

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService) {
  }

  ngOnInit() {
    this.patient = new Patient();

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'.toString()];
        this.patientService.get(this.id)
          .subscribe(data => {
            console.log(data);
            this.patient = data;
          }, error => console.log(error));
      }
    );
  }

  deletePatient(id: string) {
    this.patientService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          // this.reloadData();
          this.patientService.sendListUpdateAlert('Deleted');
        },
        error => console.log(error));
    this.router.navigate([ 'patients' ]);
  }

  updatePatient(id: string) {
    this.router.navigate([ 'patients/update', id ]);
  }

  generateReport(id: string) {
    this.router.navigate([ 'reports/add', id ]);
  }
}
