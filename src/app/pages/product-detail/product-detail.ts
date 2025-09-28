import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, ProductCard],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  selectedSize = '';
  selectedColor = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.product = this.productService.getProduct(productId) || null;
      
      if (this.product) {
        // Get related products from the same category
        this.relatedProducts = this.productService.getProductsByCategory(this.product.category)
          .filter(p => p.id !== this.product!.id)
          .slice(0, 4);
      }
    });
  }

  getStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product && this.selectedSize && this.selectedColor) {
      this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor, this.quantity);
      alert('Product added to cart!');
    }
  }

  onAddToCart(event: any) {
    this.cartService.addToCart(event.product, event.size, event.color, event.quantity);
  }
}
