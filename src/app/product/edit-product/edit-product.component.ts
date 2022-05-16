import { ProductListComponent } from './../product-list/product-list.component';

import { ProductService } from 'src/app/service/product.service';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from '../product';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  editProductHeader = EditDialogHeader;
  product: Product = new Product();
  productControl = new FormControl('', Validators.required);
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  categories: string[] = [
    'Electronics',
    'DIY Tools',
    'Hand-held devices',
    'Music Instruments',
  ];
  conditions = ['Brand New', 'Second Hand', 'Refurbished'];
  selectedCondition: string | undefined;
  selectedCategory: string | undefined;
  radioSelected!: string;
  id!: number;
  productForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private appService: ProductService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  open(productId: number) {
    console.log(MAT_DIALOG_DATA);
    console.log(this.appService.getProductById(this.data));
  }
  initializeForm() {
    this.appService.getProductById(this.data).subscribe((response) => {
      this.product.productName = response.productName;
      this.product.productCondition=response.productCondition
      // if (this.product.productCondition === this.conditions[1]) {
      //   this.productForm.get('productCondition')?.setValue(this.conditions[1]);
      // }
      if (response != null)
        this.productForm = this.formBuilder.group({
          productCategory: [response.productCategory, Validators.required],
          date: [response.date, Validators.required],
          productCondition: [response.productCondition, Validators.required],
          productPrice: [response.price, Validators.required],
          comment: [response.comment, Validators.required],
          productName: [response.productName, Validators.required],
          productQuantity: [response.total, Validators.required],
          productDescription: [response.description, Validators.required],
        });
    });
  }
  onSubmit() {
    this.product.comment = this.productForm.get('comment')?.value;
    this.product.price = this.productForm.get('productPrice')?.value;
    this.product.productCondition =
    this.radioSelected;
    this.product.productCategory =
    this.productForm.get('productCategory')?.value;
    this.product.productName = this.productForm.get('name')?.value;
    this.product.date = this.productForm.get('date')?.value;
    this.product.description =
      this.productForm.get('productDescription')?.value;

    this.appService
      .updateProduct(this.data, this.product)
      .subscribe((result) => {
        console.log(this.product.productCondition);
        this._snackBar.open('Product Updated Successfully', 'Dismiss');
        this.productForm.reset();
        this.dismiss();
        this.modalSave.emit(null);
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
export class EditDialogHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    //  _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
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
