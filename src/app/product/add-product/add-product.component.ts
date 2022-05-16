import { ProductListComponent } from './../product-list/product-list.component';
import { ProductService } from './../../service/product.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../product';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-product.dialog',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
  exampleHeader = AddDialogHeader;

  nameControl = new FormControl('', Validators.required);
  categoryControl = new FormControl('', Validators.required);
  conditionControl = new FormControl('', Validators.required);
  priceControl = new FormControl('', Validators.required);
  dateControl = new FormControl('', Validators.required);
  commentControl = new FormControl('', Validators.required);
  descriptionControl = new FormControl('', Validators.required);
  quantityControl = new FormControl('', Validators.required);

  viewProducts!: ProductListComponent;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  private list!: ProductListComponent;
  categories: string[] = [
    'Electronics',
    'DIY Tools',
    'Hand-held devices',
    'Music Instruments',
  ];
  selectedCondition!: string;
  selectedCategory: string | undefined;
  totalProductPrice!: number;
  radioSel: any;
  radioSelected!: string;
  radioSelectedString!: string;
  conditions: any[] = ['Brand New', 'Second Hand', 'Refurbished'];
  product: Product = new Product();
  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private appService: ProductService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      productCategory: ['', Validators.required],
      date: ['', Validators.required],
      productCondition: ['', Validators.required],
      productPrice: ['', Validators.required],
      comment: ['', Validators.required],
      productDescription: ['', Validators.required],
      productQuantity: ['', Validators.required],
    });
  }

  onSubmit() {
    // if (this.productForm.valid) {
    console.log(this.radioSelected + '');

    this.product.comment = this.productForm.get('comment')?.value;
    this.product.price = this.productForm.get('productPrice')?.value;
    this.product.total = this.productForm.get('productQuantity')?.value;
    this.product.productCategory =
      this.productForm.get('productCategory')?.value;
    this.product.productName = this.productForm.get('name')?.value;
    this.product.date = this.productForm.get('date')?.value;
    this.product.description =
      this.productForm.get('productDescription')?.value;
    this.product.productCondition = this.radioSelected;
    this.appService.createProduct(this.product).subscribe({
      next: (result) => {
        this.productForm.reset();
        this.dismiss();
        this.viewProducts.getAllProducts();
        this.modalSave.emit(null);
      },
      error: (errorM) => {
        this._snackBar.open('An error has occurred', errorM);
      },
    });
  }
  onItemChange(event: MatRadioChange) {
    this.radioSelected = String(event.value);
    console.log(this.radioSelected);
  }
  dismiss() {
    this.dialogRef.close();
  }
}
/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-double-arrow .mat-icon {
        margin: -22%;
      }
    `,
  ],
  template: `
    <div class="example-header">
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="previousClicked('year')"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <button mat-icon-button (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{ periodLabel }}</span>
      <button mat-icon-button (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="nextClicked('year')"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDialogHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}
