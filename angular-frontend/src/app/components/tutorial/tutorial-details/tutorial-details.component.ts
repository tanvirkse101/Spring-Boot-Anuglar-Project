import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TutorialService} from '../../../services/tutorial.service';
import {Tutorial} from '../../../classes/tutorial';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  id: string;
  tutorial: Tutorial;
  imageUrl;
  private sanitzedImageData: SafeUrl;
  private imageData: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private tutorialService: TutorialService,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.tutorial = new Tutorial();

    this.id = this.route.snapshot.params['id'.toString()];

    // this.tutorialService.get(this.id)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.tutorial = data;
    //   }, error => console.log(error));

    this.tutorialService.getTutorialWithImage(this.id)
      .subscribe(data => {
        console.log(data);
        this.tutorial = data;
        // this.ImgUrl = `data:image/png;base64,${{this.inspectionDetails.reportImage}}`;
        // this.base64Image = this.tutorial.image.arrayBuffer();
        // this.tutorial.image = this.domSanitizer.bypassSecurityTrustUrl(myReader.result);
        console.log(this.tutorial.image.type, this.tutorial.image, this.tutorial.image.size);
        // const imageBinary = this.tutorial.image;
        // @ts-ignore
        // this.imageData = 'data:image/png;base64,' + this.tutorial.image;
        this.sanitzedImageData = this.domSanitizer.bypassSecurityTrustUrl(this.tutorial.image);
        // console.log(this.sanitizedImageData);
        // let imageBase64String: string;
        // imageBase64String = atob(this.tutorial.image);
        // this.imageUrl = 'data:image/jpeg;base64,' + imageBase64String;
        // console.log(this.imageUrl);
      }, error => console.log(error));

  }

  list() {
    this.router.navigate(['tutorials']);
  }

  updateLink() {
    this.router.navigate(['update/' + this.tutorial.id]);
  }

}
