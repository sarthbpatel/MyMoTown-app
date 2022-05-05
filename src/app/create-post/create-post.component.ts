import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { PostModel } from '../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  // Variables for each component of the upload page
  uploadForm: FormGroup = this.formBuilder.group({
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventTimes: ""
  });
  file: any = null;
  postUpload: PostModel | null = null;
  imageSrc: any = "../../assets/images/wvucamera.png";

  // Backend constructor that communicates with firebase
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService, 
    private firebaseService: FirebaseService
  ) {
    this.authService.afAuth.user.subscribe((user) => {
      if(!user) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit(): void {
  }

  // Setting files/images to storage in our backend
  setFile(event: any) {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
  
      reader.onload = () => {
        if(reader.result) {
          this.file = reader.result;
          this.imageSrc = reader.result;
        }
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async upload() {
    let index = (await firstValueFrom(this.firebaseService.getAll<PostModel>("Posts"))).length;


    // Variables associated with uploading files and posts
    if(this.file && this.authService.user) {
      this.postUpload = {
        ageRestriction: 0,
        attendanceCount: 0,
        category: this.uploadForm.value.eventCategory,
        description: this.uploadForm.value.eventDescription,
        id: index,
        images: [ this.file ],
        isFlagged: false,
        locations: [],
        paymentTypes: [],
        postingUserId: this.authService.user.uid,
        reviews: [],
        rating: 0,
        times: [ this.uploadForm.value.eventTimes ],
        title: this.uploadForm.value.eventTitle
      }

      this.firebaseService.pushItem<PostModel>("Posts", this.postUpload);

      this.router.navigateByUrl('/home');
    }
  }

}
