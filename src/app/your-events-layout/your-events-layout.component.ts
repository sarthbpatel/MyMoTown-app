import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { PostModel } from '../models/post.model';
import { PostService } from '../post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-your-events-layout',
  templateUrl: './your-events-layout.component.html',
  styleUrls: ['./your-events-layout.component.css']
})
export class YourEventsLayoutComponent {

  postObservable: Observable<PostModel[]> | null = null;

  constructor(
    public authService: AuthService, 
    public postService: PostService,
    public location: Location,
    private router: Router, 
    private firebaseService: FirebaseService
  ) { 
    this.authService.afAuth.user.subscribe((user) => {
      if(!user) {
        this.router.navigateByUrl('/login');
      } else {
        this.firebaseService.getAll<PostModel>("Posts").subscribe((posts: PostModel[]) => {
          this.postObservable = of(posts.filter(x => x.postingUserId == user.uid))
        });
      }
    })
  }

}
