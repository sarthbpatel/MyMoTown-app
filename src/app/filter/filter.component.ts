import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output('filter') filter: EventEmitter<any> = new EventEmitter();

  filterForm: FormGroup = this.formBuilder.group({
    'sports': false,
    'parties': false,
    'dining': false,
    'adventure': false,
    'other': false,
    'rating': [0, Validators.required],
    'cash': false,
    'card': false
  });

  constructor(private formBuilder: FormBuilder) { }

  onFilterSelect = () => {
    this.filter.emit(this.filterForm.value);
  }

  clear = () => {
    this.filterForm = this.formBuilder.group({
      'sports': false,
      'parties': false,
      'dining': false,
      'adventure': false,
      'other': false,
      'rating': [0, Validators.required],
      'cash': false,
      'card': false
    });
    this.onFilterSelect();
  }

}