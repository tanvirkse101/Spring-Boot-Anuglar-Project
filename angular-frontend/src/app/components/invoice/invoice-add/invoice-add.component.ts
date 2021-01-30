import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Doctor } from '../../../classes/doctor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../../classes/invoice';
import { Test } from '../../../classes/test';
import { TestService } from '../../../services/test.service';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: [ './invoice-add.component.css' ]
})
export class InvoiceAddComponent implements OnInit {
  invoice: Invoice = new Invoice();
  submitted = false;
  invoiceID: string;
  patientID: string;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  patient: Patient;
  doctor: Doctor;
  testList: Observable<Test[]>;
  selectedTest: Test = new Test();
  Online = 'Online';
  Cash = 'Cash';

  invoiceForm = this.fb.group({
    patientid: [ '', Validators.required ],
    doctorid: [ '', Validators.required ],
    paymentmethod: [ '', Validators.required ],
    tests: this.fb.array([ this.buildTest()]),
  });

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private testService: TestService,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  // Form array get functions
  get tests() {
    return this.invoiceForm.get('tests') as FormArray;
  }
  // Form array add/remove functions
  addTests() {
    this.tests.push(this.buildTest());
  }

  removeTests(i: number) {
    this.tests.removeAt(i);
  }
  ngOnInit() {
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();
    this.testList = this.testService.getAllTests();
    this.patientID = this.route.snapshot.params['id'.toString()];
  }

  save() {
    this.invoice = this.invoiceForm.value;
    this.invoiceService
      .create(this.invoice).subscribe(invoiceData => {
        this.invoice = invoiceData;
        this.invoiceID = this.invoice.id;
        this.invoice = new Invoice();
        this.invoiceService.sendListUpdateAlert('Added');
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  setTest(index: string) {
    this.testService.getTest(index).subscribe(
      testData => {
        this.selectedTest = testData;
        console.log(this.selectedTest);
      }
    );
  }

  gotoList() {
    this.router.navigate([ 'invoices/details', this.invoiceID ]);
  }

  cancelAdd() {
    this.router.navigate([ 'invoices' ]);
  }

  // Build test form
  private buildTest(): FormGroup {
    return this.fb.group({
      name: [ '', Validators.required ],
      shortname: [ '', Validators.required ],
      price: [ '', Validators.required ],
      quantity: [ '', Validators.required ],
    });
  }
}
