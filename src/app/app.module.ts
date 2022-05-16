import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product/product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AddProductComponent, AddDialogHeader } from './product/add-product/add-product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule, NgbNavbar } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {
  EditProductComponent,
  EditDialogHeader,
} from './product/edit-product/edit-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { appRoutes } from '../routes';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    AddProductComponent,
    EditDialogHeader,
    AddDialogHeader,
    EditProductComponent,
    ProductListComponent,
    ToolbarComponent,
    SidebarComponent,
    NavbarComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatOptionModule,
    MatRadioModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    NgbDropdownModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent],
  exports: [
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatOptionModule,
    MatRadioModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    ConfirmDialogComponent,
  ],
})
export class AppModule {}
