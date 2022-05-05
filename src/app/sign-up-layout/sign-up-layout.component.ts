import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up-layout',
  templateUrl: './sign-up-layout.component.html',
  styleUrls: ['./sign-up-layout.component.css']
})
export class SignUpLayoutComponent {

  signUpForm: FormGroup = this.formBuilder.group({
    email: "",
    password: "",
    confirmPassword: ""
  });

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) { }

  signUp() {
    if(this.signUpForm.value.password != this.signUpForm.value.confirmPassword) {
      window.alert("Passwords must match");
    } else if(this.signUpForm.value.password.length < 8) {
      window.alert("Password must be at least 8 characters long");
    } else {
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password);

      this.router.navigateByUrl('/home');
    }
  }

}

