import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navToggle: Boolean = false;
  userId: String = ''

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.userId = this.authService.getUserData().id
  }

  logout() {
    this.authService.logout();
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

}
