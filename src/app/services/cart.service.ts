import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/interfaces/product.interface';

interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addItem(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItems = [...currentItems, { ...product, quantity: 1 }];
      this.cartItems.next(newItems);
      this.saveToLocalStorage(newItems);
    }
  }

  removeItem(productId: number) {
    const newItems = this.cartItems.value.filter(
      (item) => item.id !== productId
    );
    this.cartItems.next(newItems);
    this.saveToLocalStorage(newItems);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const newItems = this.cartItems.value.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.next(newItems);
    this.saveToLocalStorage(newItems);
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getItemCount(): number {
    return this.cartItems.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  private saveToLocalStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
