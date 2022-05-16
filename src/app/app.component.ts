import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, Inject, Injector } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import {UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// declare interface RouteInfo {
//   path: string;
//   title: string;
//   icon: string;
//   class: string;
//   permission: string;
// }
// export const ROUTES: RouteInfo[] = [
//   {
//     path: '/app/dashboard',
//     title: 'Dashboard',
//     icon: 'fa fa-home blue',
//     class: '',
//     permission: '',
//   },
//   {
//     path: '/app/product-list',
//     title: 'Products',
//     icon: 'fa fa-shopping-cart blue',
//     class: '',
//     permission: '',
//   },
// ];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
    private observer: BreakpointObserver,
    private router: Router,
    injector: Injector
  ) {}
  ngOnInit() {
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
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
  toogleSidenav() {
    if (this.sidenavStatus === true) {
      this.sidenavStatus = true;
    } else {
      this.sidenavStatus = true;
    }
    if (this.sidenavWidth === 4) {
      this.increase();
    } else {
      this.decrease();
    }
  }

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
}


function appModuleAnimation(): any {
  throw new Error('Function not implemented.');
}

