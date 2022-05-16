import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/app/home', title: 'Dashboard', icon: 'fa fa-home blue', class: '', permission: '' },
  { path: '/app/products', title: 'Products', icon: 'fa fa-shopping-cart blue', class: '', permission: '' },
  { path: '/app/quotation', title: 'Quotations', icon: 'fa fa-th-list blue', class: '', permission: '' },
  { path: '/app/suppliers', title: 'Suppliers', icon: 'fa fa-list-alt blue', class: '', permission: '' },
  { path: '/app/client', title: 'Clients', icon: 'fa fa-user-circle-o fa-2x blue', class: '', permission: '' },
  { path: '/app/order', title: 'Orders', icon: 'fa fa-credit-card blue', class: '', permission: '' },
  { path: '/app/invoice', title: 'Invoices', icon: 'fa fa-file-text-o blue', class: '', permission: '' },
  { path: '/app/transaction', title: 'Transactions', icon: 'fa fa-list-ol blue', class: '', permission: '' },
  { path: '/app/users', title: 'Users', icon: 'fa fa-users blue', class: '', permission: 'Pages.Users' },
  // { path: '#', title: 'Suppliers',  icon: 'ni-single-02 text-yellow', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems!: any[];
  public isCollapsed = true;

  constructor(
    injector: Injector,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  // showItem(item: any): boolean {
  //   if (item.permission) {
  //     return this.permission.isGranted(item.permission);
  //   }
  //   return true;
  // }
}
