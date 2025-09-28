import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  featuredProducts: any[] = [];
  categories = [
    {
      name: 'Tops',
      description: 'T-shirts, blouses, and more',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    },
    {
      name: 'Jackets',
      description: 'Denim, leather, and casual jackets',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400'
    },
    {
      name: 'Dresses',
      description: 'Elegant and casual dresses',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
    },
    {
      name: 'Bottoms',
      description: 'Jeans, pants, and shorts',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'
    }
  ];
  email = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });
  }

  navigateToCategory(categoryName: string) {
    // Navigate to products page with category filter
    console.log('Navigate to category:', categoryName);
  }

  onAddToCart(event: any) {
    this.cartService.addToCart(event.product, event.size, event.color, event.quantity);
  }

  subscribe() {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      this.email = '';
      alert('Thank you for subscribing!');
    }
  }
}
