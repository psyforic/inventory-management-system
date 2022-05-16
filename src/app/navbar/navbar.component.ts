
import { Component, OnInit, ElementRef, Injector, ViewChild } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public location!: Location;
  events: string[] = [];
  opened!: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
  sidenavWidth = 4;
  sidenavStatus = true;
  public menuItems!: any[];
  public isCollapsed = true;
  title = 'product-inventory';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    injector: Injector,
    private observer: BreakpointObserver
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.getUser();
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  logout(): void {}

  getUser() {}

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    return 'Dashboard';
  }
}
