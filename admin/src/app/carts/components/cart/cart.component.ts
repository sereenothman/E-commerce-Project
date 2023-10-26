import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  products: any[] = [];
  total = 0;
  form!: FormGroup;
  details: any;
  
  constructor(
    private service: CartsService,
    private build: FormBuilder,
    private productService: ProductsService
  ) { }
  
  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: ['']
    });
    this.getAllCarts();
  }
  
  getAllCarts() {
    this.service.getAllCarts().subscribe(
      (res: any) => {
        this.carts = res;
      },
      error => {
        console.error(error); // Handle error if applicable
      }
    );
  }
  
  applyFilter() {
    const date = this.form.value;
    this.service.getAllCarts(date).subscribe(
      (res: any) => {
        this.carts = res;
      },
      error => {
        console.error(error); // Handle error if applicable
      }
    );
  }
  
  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe(
      res => {
        this.getAllCarts();
        alert("Cart deleted Success");
      },
      error => {
        console.error(error); // Handle error if applicable
      }
    );
  }
  
  view(index: number) {
    this.products = [];
    this.details = this.carts[index];
    for (let product of this.details.products) {
      this.productService.getProductById(product.productId).subscribe(
        res => {
          this.products.push({
            item: res,
            quantity: product.quantity
          });
        },
        error => {
          console.error(error); // Handle error if applicable
        }
      );
    }
    console.log(this.details);
  }
}