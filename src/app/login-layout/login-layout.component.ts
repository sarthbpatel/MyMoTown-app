import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent {

  loginForm: FormGroup = this.formBuilder.group({
    email: "",
    password: ""
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.router.navigateByUrl('/home');
  }

}
