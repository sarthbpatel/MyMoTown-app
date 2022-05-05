import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent {

  constructor(public authService: AuthService) { }

}
