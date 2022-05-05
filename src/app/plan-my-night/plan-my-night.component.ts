import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'add-plan-my-night',
  templateUrl: './plan-my-night.component.html',
  styleUrls: ['./plan-my-night.component.css']
})
export class PlanMyNightComponent implements OnInit {

  @Output('filter') filter: EventEmitter<any> = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  //Created a filter form to allow users to filter through the list of posts
  filterForm: FormGroup = this.formBuilder.group({
    '1Option1': false,
    '1Option2': false,
    '1Option3': false,
    '1Option4': false,
    '2Option1': false,
    '2Option2': false,
    '2Option3': false,
    '2Option4': false,
    '3Option1': false,
    '3Option2': false,
    '3Option3': false,
    '3Option4': false,
    '4Option1': false,
    '4Option2': false,
    '4Option3': false,
    '4Option4': false
  });
  
  //Function to emit the filter form to the parent component
  onFilterSelect = () => {
    this.filter.emit(this.filterForm.value);
  }
}
