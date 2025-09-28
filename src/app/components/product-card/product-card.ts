import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product: Product | null = null;
  @Output() addToCart = new EventEmitter<any>();

  selectedSize = '';
  selectedColor = '';

  getStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  viewDetails() {
    if (this.product) {
      // Navigate to product detail page
      console.log('View details for product:', this.product.id);
    }
  }

  onAddToCart() {
    if (this.product && this.selectedSize && this.selectedColor) {
      this.addToCart.emit({
        product: this.product,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: 1
      });
    }
  }
}
