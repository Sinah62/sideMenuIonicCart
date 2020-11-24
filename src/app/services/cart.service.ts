import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  imageurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

data: Product[ ]=[{ id: 0, name:"Pizza ",price:150,amount:0,imageurl: "https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg"},
{id: 1, name:"Black Forest Cake Roll ",price:100,amount:0, imageurl: "https://freedesignfile.com/upload/2017/12/Cherry-black-forest-cake-roll-Stock-Photo.jpg"},
{id: 2, name:"Burger ",price:50,amount:0, imageurl: "https://i.guim.co.uk/img/media/42bec9e038a74f948c708096dac0a5a2ed4d3644/0_330_3500_2100/master/3500.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=135036d53fe10881a0f403331abeb6f0"}
];
private cart=[];
private cartItemCount = new BehaviorSubject(0);
  constructor() { }
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
