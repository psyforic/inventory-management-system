import { ProductTableUtil } from './../product-table-util';

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../product';
import { Location } from '@angular/common';
import { ConfirmDialogService } from 'src/app/shared/confirmDialogService';

const options = {
  title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
  message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
  cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
  confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT',
};
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfirmDialogService],
})
export class ProductListComponent implements OnInit {
  @ViewChild('editProductModal', { static: false })
  editProduct!: EditProductComponent;
  productControl!: EditProductComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'ProductTracker';
  displayedColumns: string[] = [
    'id',
    'productName',
    'productPrice',
    'quantity',
    'productCategory',
    'productCondition',
    'productDescription',
    'actions',
  ];
  products!: Product[];
  dataSource!: MatTableDataSource<Product>;
  public popupParent: HTMLElement = document.body;
  constructor(
    public productDialog: MatDialog,
    private appService: ProductService,
    private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  ngAfterViewInit() {
    this.getAllProducts();
  }
  getAllProducts() {
    this.appService
      .getAllProducts()
      .pipe()
      .subscribe((response) => {
        this.products = response;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  openDialog() {
    this.productDialog
      .open(AddProductComponent, {
        width: '50%',
        maxHeight: '90vh',
      })
      .afterClosed()
      .pipe()
      .subscribe((val) => {
        // this._snackBar.open('Product Has Been Added', 'Dismiss', {
        //   panelClass: ['my-custom-snackbar', 'red-snackbar'],
        //   duration: 9000,
        // });
        this.getAllProducts();
      });
  }
  exportToExcel(): void {
    ProductTableUtil.exportToPdf('Products');
  }

  edit(id: number) {
    this.productDialog
      .open(EditProductComponent, {
        width: '50%',
        maxHeight: '90vh',
        data: id,
      })
      .afterClosed()
      .pipe()
      .subscribe((val) => {
        this.getAllProducts();
      });
  }
  delete(id: number) {
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe((confirmed) => {
        this.appService.deleteProduct(id).subscribe({
          next: (result) => {
            this._snackBar.open('Product Deleted Successfully', 'Dismiss', {
              panelClass: ['my-custom-snackbar', 'red-snackbar'],
              duration: 3000,
            });
            this.getAllProducts();
          },
          error: (errorM) => {
            this._snackBar.open('An error has occurred', errorM, {
              panelClass: ['my-custom-snackbar', 'red-snackbar'],
              duration: 3000,
            });
            console.log(errorM);
          },
        });

    });

  }
  view(row: any) {
    this._snackBar.open('Product Deleted Successfully', 'Dismiss', {
      panelClass: '  my-custom-snackbar ',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
