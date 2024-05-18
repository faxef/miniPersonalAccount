import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {BreadCrumb} from "../../core/interfaces/breadcrumb";
import {BreadcrumbsService} from "../../core/services/breadcrumbs.service";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: Observable<BreadCrumb[]>;

  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;
  }

  ngOnInit(): void {}
}
