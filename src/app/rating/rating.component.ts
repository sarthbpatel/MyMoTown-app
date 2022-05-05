import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: any = 0;
  @Input() canChange: boolean = false;

  @Output() value = new EventEmitter<number>();

  quantity: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.quantity = this.rating;
  }

  hoverRating(event: any, element: any) {
    if(this.canChange) {
      // Max rating value is 5 so multiply percent by 5
      this.rating = Math.ceil((event.offsetX / element.clientWidth) * 5);
    }
  }

  selectRating() {
    this.quantity = this.rating;
    this.value.emit(this.quantity);
  }

}
