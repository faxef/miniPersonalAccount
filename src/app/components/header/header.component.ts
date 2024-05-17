import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navToggle: Boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  toggleNav() {
    this.navToggle  = !this.navToggle;
  }

}
