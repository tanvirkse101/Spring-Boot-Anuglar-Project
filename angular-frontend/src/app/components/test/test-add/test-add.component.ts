import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../../classes/medicine';
import { FormBuilder, Validators } from '@angular/forms';
import { MedicineService } from '../../../services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../../../classes/test';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit {
  test = new Test();
  testId: string;
  submitted = false;

  // Build Report Form
  testForm = this.fb.group({
    name: [ '', Validators.required ],
    shortname: [ '', Validators.required ],
    samname: [ '', Validators.required ],
    price: [ '', Validators.required ]
  });

  constructor(private testService: TestService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    this.test = this.testForm.value;
    this.testService.createTest(this.test).subscribe(
      testData => {
        this.test = testData;
        this.testId = this.test.id;
        this.test = new Test();
        this.testService.sendListUpdateAlert('Added');
        this.goToList();
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goToList() {
    this.router.navigate([ 'tests/details', this.testId ]);
  }

  cancelAdd() {
    this.router.navigate([ 'tests' ]);
  }

}
