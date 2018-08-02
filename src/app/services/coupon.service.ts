import { Injectable } from '@angular/core';
import { Coupon } from '../components/common/Coupon';
import { Http, Headers, Request, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable()
export class CouponService {

public urlAll = 'getallcoupons';
public urlNonPurchased = 'getnonpurchasedcoupons';
public url = 'getpurchasedcoupons'; 
public urlType = 'getpurchasedcouponsbytype'; 
public urlPrice = 'getpurchasedcouponsbyprice';
public urlLogin = 'getlogincustomer';

   // dependency injection for http object and date pipe
   constructor(private _http : Http, private _datepipe: DatePipe ) {}

  public getLoginCustomerName()  {
    return this._http.get(this.urlLogin)
       .map(response=> response.text());
   }  

   public getAllCoupons()  {
    return this._http.get(this.urlAll)
       .map(response=> response.json());
   }


   public getCoupon (id: number) {
    return this._http.get(this.urlAll +'/'+id)
    .map(response=> response.json());
 }

 public getAllNonPurchasedCoupons()  {
    return this._http.get(this.urlNonPurchased)
    .map(response=> response.json());

   }
    
public putCoupon (id: number, coupon: Coupon) {
  return this._http.put(this.urlAll +'/'+id, coupon); 
  }

 public getAllPurchasedCoupons()  {
  return this._http.get(this.url)
     .map(response=> response.json());
 }
  
   public getAllPurchasedCouponsByPrice(price: number)  {
    return this._http.get(this.urlPrice +'/'+price)
       .map(response=> response.json());
   }
   
   public getAllPurchasedCouponsByType(type: string)  {
    return this._http.get(this.urlType +'/'+type)
       .map(response=> response.json());
   }
 
}
