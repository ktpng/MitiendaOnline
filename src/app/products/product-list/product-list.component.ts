import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CartComponent } from '../cart/cart.component';
import { FilterByCategoryPipe } from '../pipes/filter-by-category.pipe';
import { Product } from '../interfaces/product.interface';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    CartComponent,
    FilterByCategoryPipe,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  filteredCategories: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  categoryFilterCtrl = new FormControl('');
  protected _onDestroy = new Subject<void>();

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();

    this.categoryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCategories();
      });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.filteredCategories.next(this.categories.slice());
    });
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
  }

  private filterCategories() {
    if (!this.categories) return;

    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categories.slice());
      return;
    }

    search = search.toLowerCase();
    this.filteredCategories.next(
      this.categories.filter((category) =>
        category.toLowerCase().includes(search)
      )
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
