import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory',
  standalone: true,
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: any[], category: string): any[] {
    if (!category) return products;
    return products.filter((product) => product.category === category);
  }
}
