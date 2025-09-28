import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product as ProductInterface } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductInterface[] = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      description: 'Premium cotton t-shirt with a comfortable fit',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'Tops',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray'],
      inStock: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 89.99,
      description: 'Classic denim jacket with vintage wash',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400',
      category: 'Jackets',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
      inStock: true,
      rating: 4.8,
      reviews: 95
    },
    {
      id: 3,
      name: 'Summer Dress',
      price: 79.99,
      description: 'Elegant summer dress perfect for any occasion',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      category: 'Dresses',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Floral', 'Navy', 'Pink'],
      inStock: true,
      rating: 4.6,
      reviews: 67
    },
    {
      id: 4,
      name: 'Slim Fit Jeans',
      price: 69.99,
      description: 'Modern slim fit jeans with stretch comfort',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      category: 'Bottoms',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black', 'Gray'],
      inStock: true,
      rating: 4.4,
      reviews: 156
    },
    {
      id: 5,
      name: 'Hoodie',
      price: 59.99,
      description: 'Cozy hoodie with kangaroo pocket',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      category: 'Tops',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Gray', 'Black', 'Navy'],
      inStock: true,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 6,
      name: 'Leather Jacket',
      price: 199.99,
      description: 'Premium leather jacket with classic style',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      category: 'Jackets',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Brown', 'Black'],
      inStock: false,
      rating: 4.9,
      reviews: 43
    }
  ];

  private productsSubject = new BehaviorSubject<ProductInterface[]>(this.products);

  constructor() { }

  getProducts(): Observable<ProductInterface[]> {
    return this.productsSubject.asObservable();
  }

  getProduct(id: number): ProductInterface | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): ProductInterface[] {
    return this.products.filter(product => product.category === category);
  }

  searchProducts(query: string): ProductInterface[] {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}
