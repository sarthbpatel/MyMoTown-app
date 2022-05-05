import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { PostModel } from '../models/post.model';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ReviewModel } from '../models/review.model';

@Component({
  selector: 'app-view-event-layout',
  templateUrl: './view-event-layout.component.html',
  styleUrls: ['./view-event-layout.component.css']
})
export class ViewEventLayoutComponent {

  routeInfo: Params | null = null;
  postId: number = -1;
  post: PostModel | null = null;
  reviewRating: any = 0;

  constructor(
    private route: ActivatedRoute, 
    private firebaseService: FirebaseService, 
    public postService: PostService,
    public location: Location,
    private router: Router
  ) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.getPost();

    this.checkDate();
  }

  // date objects to compare the dates 
  currentDate: Date = new Date();
  eventDate: Date = new Date('05.11.2022'); 

  getPost() {
    this.firebaseService.getItem<PostModel>("Posts", this.postId).subscribe((data: PostModel | null) => {
      this.post = data;
    });
  }

  // check date method to check if current date is before event date 
  checkDate() {
    if (this.eventDate.getTime() < this.currentDate.getTime()) {
      console.log("Current date is before event date!")
    }
    if (this.eventDate.getTime() >= this.currentDate.getTime()) {
      console.log("Current date is after event date!")
    }
  }

  setReviewRating(event: any) {
    this.reviewRating = event;
  }

  postReview(review: ReviewModel) {
    let reviewUpload: ReviewModel = {
      rating: this.reviewRating,
	    reviewText: review.reviewText
    }

    if(this.post) {
      if(!this.post.reviews) {
        this.post.reviews = [];
      }

      this.post.reviews.unshift(reviewUpload);

      this.firebaseService.setItem("Posts", `${this.postId}`, this.post);

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }

}
