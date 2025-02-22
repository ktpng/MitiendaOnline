import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { CanCreateProductDirective } from '../../../directives/can-create-product.directive';
import { CanDeleteProductDirective } from '../../../directives/can-delete-product.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatSnackBarModule,
    CanCreateProductDirective,
    CanDeleteProductDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = [
    'actions',
    'image',
    'title',
    'price',
    'category',
    'delete',
  ];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  loading = false;
  currentPage = 0;
  pageSize = 30;
  totalProducts = 0;

  @ViewChild(MatTable) table!: MatTable<Product>;
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMoreProducts();
  }

  loadMoreProducts() {
    if (this.loading) return;

    this.loading = true;
    const skip = this.currentPage * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (newProducts) => {
        if (this.currentPage === 0) {
          this.products = newProducts;
        } else {
          this.products = [...this.products, ...newProducts];
        }

        this.currentPage++;
        this.loading = false;
        this.filterProducts();
        this.table?.renderRows();
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.loading = false;
      },
    });
  }

  onTableScroll(event: any) {
    const tableViewHeight = event.target.offsetHeight;
    const tableScrollHeight = event.target.scrollHeight;
    const scrollLocation = event.target.scrollTop;

    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.loadMoreProducts();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = filterValue;
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteProduct(product: Product, index: number) {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products.splice(index, 1);
        this.filterProducts();
        this.table?.renderRows();

        this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Producto creado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.loadMoreProducts();
      }
    });
  }
}
