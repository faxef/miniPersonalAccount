import {NgModule} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {TicketsPageComponent} from "./tickets-page/tickets-page.component";
import {TicketPageComponent} from "./tickets-page/ticket-page/ticket-page.component";
import {MainPagesComponent} from "./main-pages.component";
import {filter} from "rxjs";
import {BreadCrumb} from "../../core/interfaces/breadcrumb";
import {map, mergeMap} from "rxjs/operators";
import {BreadcrumbsService} from "../../core/services/breadcrumbs.service";

const routes: Routes = [
  {
    path: '', component: MainPagesComponent, data: {breadcrumb: 'Главная страница'}, children: [
      {path: '', component: HomePageComponent, data: {breadcrumb: ''}},
      {path: 'profile/:id', component: ProfilePageComponent, data: {breadcrumb: 'Профиль-'}},
      {
        path: 'tickets', data: {breadcrumb: 'Тикеты'}, children: [
          {path: '', data: {breadcrumb: ''}, component: TicketsPageComponent},
          {path: 'ticket/:id', component: TicketPageComponent, data: {breadcrumb: 'Тикет-'}}
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = this.getLabel(child);
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getLabel(route: ActivatedRoute): string | null {
    const label = route.snapshot.data['breadcrumb'];
    if (!label) {
      return null;
    }
    if (label.includes('-') && route.snapshot.params) {
      for (const key in route.snapshot.params) {
        if (route.snapshot.params.hasOwnProperty(key)) {
          return label.replace('-', '-' + route.snapshot.params[key]);
        }
      }
    }
    return label;
  }
}
