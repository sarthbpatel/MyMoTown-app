import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.card.html',
    styleUrls: ['./upload.card.css']
  })
  export class UploadComponent {

    uploadForm: FormGroup = this.formBuilder.group({
    });
  
    constructor(private formBuilder: FormBuilder, private router: Router) { }

    upload() {
      this.router.navigateByUrl('/home');
    }
  
  }