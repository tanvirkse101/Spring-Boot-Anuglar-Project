import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {TutorialService} from '../../../services/tutorial.service';
import {Tutorial} from '../../../classes/tutorial';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();
  submitted = false;
  selectedFile: File;
  constructor(private tutorialService: TutorialService,
              private router: Router) {
  }

  ngOnInit() {
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    this.tutorialService
      .create(this.tutorial).subscribe(data => {
        console.log(data);
        this.tutorial = new Tutorial();
        console.log(this.tutorial);
        this.gotoList();
      },
      error => console.log(error));
    console.log(this.tutorial.title);
    console.log(this.selectedFile.type);
    // this.tutorialService.createWithImage(this.tutorial.title,
    //   this.tutorial.description,
    //   // this.tutorial.published,
    //   this.selectedFile).subscribe(data => {
    //     this.tutorial = new Tutorial();
    //     this.gotoList();
    //   }, error => console.log(error)
    // );
  }

  onSubmit() {
    this.submitted = true;
    // this.tutorial.published = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/tutorials']);
  }

}
