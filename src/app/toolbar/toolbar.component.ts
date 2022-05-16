import { ProductService } from './../service/product.service';
import { Component, OnInit, ViewChild, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, Observable } from 'rxjs';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { Product } from '../product/product';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'date',
    'productPrice',
    'productCategory',
    'productCondition',
    'productDescription',
    'comment',
    'actions',
  ];

  dataSource!: Observable<Product>;
  products: Product[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'ProductTracker';
  filter: '' | undefined;
  constructor(
    public productDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private appService: ProductService
  ) {

    // const products = Array.from({ length: 100 }, (_, k) => this.getAllProducts(k + 1));
  }
  ngOnInit(): void {}

  openDialog() {
    this.productDialog
      .open(AddProductComponent, {
        width: '50%',
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((val) => {
        // this.getAllProducts();
      });
  }

  view(row: any) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.appService.getProductList(this.filter).subscribe((result)=>{
    // this.products = result;
    // });
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
