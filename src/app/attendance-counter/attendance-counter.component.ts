import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';
import { PostModel } from '../models/post.model';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-attendance-counter',
  templateUrl: './attendance-counter.component.html',
  styleUrls: ['./attendance-counter.component.css']
})
export class AttendanceCounterComponent {

  @Input() count: any = 0;
  @Input() postID: number = -1;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) { }

  async incrementAttendance(event: Event) 
  {
    event.stopPropagation();

    if(this.authService.user) {
      let post = await firstValueFrom(this.firebaseService.getItem<PostModel>("Posts", this.postID.toString()));

      let index = this.authService.user.attendingPosts ? this.authService.user.attendingPosts.indexOf(this.postID) : -1;
      if(index != -1) {
        this.count--;
        this.authService.user.attendingPosts.splice(index, 1);
      } else {
        this.count++;

        if(!this.authService.user.attendingPosts) {
          this.authService.user.attendingPosts = [];
        }

        this.authService.user.attendingPosts.push(this.postID);

      }
      
      this.firebaseService.setItem<UserModel>("Users", this.authService.user.uid, this.authService.user);

      if (post) {
        post.attendanceCount = this.count;
        this.firebaseService.setItem<PostModel>("Posts", this.postID.toString(), post);
      }
    }
  }
}
