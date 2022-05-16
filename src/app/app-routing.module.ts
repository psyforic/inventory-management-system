import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES } from './sidebar/sidebar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'edit-product/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
