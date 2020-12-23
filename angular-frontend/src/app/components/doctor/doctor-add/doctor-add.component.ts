import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: [ './doctor-add.component.css' ]
})
export class DoctorAddComponent implements OnInit {
  doctor: Doctor = new Doctor();
  submitted = false;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  newDoctor(): void {
    this.submitted = false;
    this.doctor = new Doctor();
  }

  save() {
    this.doctorService
      .create(this.doctor).subscribe(data => {
        console.log(data);
        this.doctor = new Doctor();
        this.doctorService.sendListUpdateAlert('Added');
        console.log(this.doctor);
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate([ 'doctors' ]);
  }

}
