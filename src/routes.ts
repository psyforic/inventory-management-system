import { Routes } from "@angular/router";
import { DashboardComponent } from "./app/dashboard/dashboard.component";
import { EditProductComponent } from "./app/product/edit-product/edit-product.component";
import { ProductListComponent } from "./app/product/product-list/product-list.component";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
export const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'edit-product/:id', component: EditProductComponent },
];
