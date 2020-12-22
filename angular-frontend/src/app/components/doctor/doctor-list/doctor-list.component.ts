import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../classes/doctor';
import { Observable } from 'rxjs';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: [ './doctor-list.component.css' ]
})
export class DoctorListComponent implements OnInit {

  doctors: Observable<Doctor[]>;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
  }


  reloadData() {
    this.doctors = this.doctorService.getAll();
  }

  deleteDoctor(id: string) {
    this.doctorService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  doctorDetails(id: string) {
    this.router.navigate([ 'details', id ], { relativeTo: this.route });
  }

  updateDoctor(id: string) {
    this.router.navigate([ 'update', id ]);
  }
}
