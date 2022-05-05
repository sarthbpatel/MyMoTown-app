import { Injectable } from '@angular/core';
import { PostModel } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getRating(post: PostModel) {
    if(post && post.reviews) {
      let sum = 0;
      post.reviews.forEach(item => sum += item.rating);
      
      return sum / post.reviews.length;
    }

    return 0;
  }

}
