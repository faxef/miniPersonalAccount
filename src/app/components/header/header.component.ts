import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {TicketsService} from "../../core/services/tickets.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  navToggle: Boolean = false;
  userId: String = ''

  constructor(
    private router: Router,
    private authService: AuthService,
    private ticketsService: TicketsService,
  ) {
  }

  ngOnInit() {
    this.userId = this.authService.getUserData().id
  }

  logout() {
    this.authService.logout().pipe(
      tap((data)=>{
        if(data){
          this.ticketsService.tickets$.next([])
          this.router.navigate(['/login']);
        }
      })
    ).subscribe();
  }

  toggleNav() {
    this.navToggle = !this.navToggle;
  }

}
