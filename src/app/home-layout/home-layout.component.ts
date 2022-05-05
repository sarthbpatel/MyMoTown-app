import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterComponent } from '../filter/filter.component';
import { FirebaseService } from '../firebase.service';
import { PostModel } from '../models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent implements OnInit {

  postObservable: Observable<PostModel[]> | null = null;

  posts: PostModel[] = [];
  filteredPosts: Observable<PostModel[]> | null = null;

  constructor(private firebaseService: FirebaseService, public postService: PostService) { }

  ngOnInit(): void {
    this.postObservable = this.firebaseService.getAll<PostModel>("Posts");
    this.postObservable.subscribe((data: PostModel[]) => {
      this.posts = data;
    });
    this.filteredPosts = this.postObservable;
  }

  filter(filters: any) {
    let categories = ['sports', 'parties', 'dining', 'adventure', 'other'];
    let paymentTypes = ['cash', 'card'];
    let showingAllCategories = true;
    let showingAllPaymentTypes = true;
    let filtered: PostModel[] = [];

    // Check to see if all category filters are equal
    let cat = filters[categories[0]];
    for(const category of categories) {
      showingAllCategories = cat == filters[category];

      if(!showingAllCategories) break;
    }

    // Check to see if all payment type filters are equal
    let pt = filters[paymentTypes[0]];
    for(const paymentType of paymentTypes) {
      showingAllPaymentTypes = pt == filters[paymentType];

      if(!showingAllPaymentTypes) break;
    }

    categories = categories.filter(x => filters[x]);
    paymentTypes = paymentTypes.filter(x => filters[x]);

    filtered = this.posts.filter((post: PostModel) => this.postService.getRating(post) >= filters['rating']);

    if(showingAllCategories && !showingAllPaymentTypes) {
      filtered = filtered.filter(x => {
        for(const paymentType of x.paymentTypes) {
          if(paymentTypes.includes(paymentType)) {
            return true;
          }
        }

        return false;
      });
    } else if(!showingAllCategories && showingAllPaymentTypes) {
      filtered = filtered.filter(x => categories.includes(x.category.toLowerCase()));
    } else if(!showingAllCategories && !showingAllPaymentTypes) {
      filtered = filtered.filter(x => {
        for(const paymentType of x.paymentTypes) {
          if(paymentTypes.includes(paymentType)) {
            return true;
          }
        }

        return false;
      });

      filtered = filtered.filter(x => categories.includes(x.category.toLowerCase()));
    }

    this.filteredPosts = of<PostModel[]>(filtered);
  }

}
