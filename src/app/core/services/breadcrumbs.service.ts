import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {BreadCrumb} from "../interfaces/breadcrumb";



@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private breadcrumbsSubject = new BehaviorSubject<BreadCrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  setBreadcrumbs(breadcrumbs: BreadCrumb[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }
}
