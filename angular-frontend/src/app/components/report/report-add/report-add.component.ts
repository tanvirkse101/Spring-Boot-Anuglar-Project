import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../classes/patient';
import { Observable } from 'rxjs';
import { Doctor } from '../../../classes/doctor';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '../../../classes/report';
import { ReportService } from '../../../services/report.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: [ './report-add.component.css' ]
})
export class ReportAddComponent implements OnInit {
  report: Report = new Report();
  submitted = false;
  reportID: string;
  patientID: string;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  // patient: Patient;
  // doctor: Doctor;

  // Build Report Form
  reportForm = this.fb.group({
    patientid: [ '', Validators.required ],
    doctorid: [ '', Validators.required ],
    bloodpressure: [ '', Validators.required ],
    pulserate: [ '', Validators.required ],
    weight: [ '', Validators.required ],
    allergies: this.fb.array([
      this.fb.control('')
    ]),
    disabilities: this.fb.array([
      this.fb.control('')
    ]),
    medicines: this.fb.array([ this.buildMedicine() ]),
    diets: this.fb.array([ this.buildDiet() ]),
    patienthistory: [ '', Validators.required ],
    followupdoctorid: [ '', Validators.required ]
  });

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private reportService: ReportService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  // Form array functions

  get allergies() {
    return this.reportForm.get('allergies') as FormArray;
  }

  get disabilities() {
    return this.reportForm.get('disabilities') as FormArray;
  }

  get medicines() {
    return this.reportForm.get('medicines') as FormArray;
  }

  get diets() {
    return this.reportForm.get('diets') as FormArray;
  }

  addAllergies() {
    this.allergies.push(this.fb.control(''));
  }

  removeAllergies(i: number) {
    this.allergies.removeAt(i);
  }

  addDisabilities() {
    this.disabilities.push(this.fb.control(''));
  }

  removeDisabilities(i: number) {
    this.disabilities.removeAt(i);
  }

  addMedicines() {
    this.medicines.push(this.buildMedicine());
  }

  removeMedicines(i: number) {
    this.medicines.removeAt(i);
  }

  addDiets() {
    this.diets.push(this.buildDiet());
  }

  removeDiets(i: number) {
    this.diets.removeAt(i);
  }

  // Form array functions
  ngOnInit() {
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();
    this.patientID = this.route.snapshot.params['id'.toString()];
    // console.log(this.patientID);
    // this.patient = new Patient();
    // this.doctor = new Doctor();
    // try {
    //   this.patientService.get(this.patientID).subscribe(
    //     patientData => {
    //       this.patient = patientData;
    //       console.log(this.patient);
    //       this.doctorService.get(this.patient.doctorid).subscribe(
    //         doctorData => {
    //           this.doctor = doctorData;
    //           console.log(this.doctor);
    //         }
    //       );
    //     }
    //   );
    // } catch ( e ) {
    //   console.log('Failed to load patient data');
    // }
  }

  save() {
    this.report = this.reportForm.value;
    this.reportService
      .create(this.report).subscribe(reportData => {
        this.report = reportData;
        this.reportID = this.report.id;
        this.report = new Report();
        this.reportService.sendListUpdateAlert('Added');
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate([ 'reports/details', this.reportID ]);
  }

  cancelAdd() {
    this.router.navigate([ 'reports' ]);
  }

  // Build Medicine form
  private buildMedicine(): FormGroup {
    return this.fb.group({
      drugname: [ '', Validators.required ],
      unit: [ '', Validators.required ],
      dosage: [ '', Validators.required ],
    });
  }

  // Build Diet form
  private buildDiet(): FormGroup {
    return this.fb.group({
      dietname: [ '', Validators.required ],
      description: [ '', Validators.required ],
    });
  }
}