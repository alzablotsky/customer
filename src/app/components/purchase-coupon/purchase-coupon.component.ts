import { Component, OnInit } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Coupon } from '../common/Coupon';
import {CouponService} from '../../services/coupon.service';
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-purchase-coupon',
  templateUrl: './purchase-coupon.component.html',
  styleUrls: ['./purchase-coupon.component.css']
})
export class PurchaseCouponComponent implements OnInit {

  public _coupons: Coupon[];

  public id: number;

  public coupon :  Coupon= new Coupon();
  
  public couponForm: HTMLFormElement;

    
    constructor( private _service: CouponService ) {}
 //private _http : Http, 

    ngOnInit() {
      this.coupon.image="";
      this.getAllNonPurchasedCoupons();
      this.couponForm = <HTMLFormElement>document.getElementById("couponForm");
   }
  
   public getAllNonPurchasedCoupons() {
    var self = this;
   this._service.getAllNonPurchasedCoupons()
     .subscribe(
         coupons =>
         {
         for(let c of coupons) {
               console.log(c);
             }
             self._coupons = coupons;
           },
         error => console.log(error)  
        );
    }

    public getCoupon() {
      var self = this;
      this._service.getCoupon(this.id)
         .subscribe(
             coupon => {
               console.log(coupon);
               self.coupon=coupon;
             }, 
              error =>  console.log(error) 
            );
        }
       

     
  public purchaseCoupon () {
   var self = this;
  this._service.putCoupon(this.id, this.coupon)
  .subscribe(
               response =>
                {
                 console.log(response);
                // alert("Coupon " + self.coupon.title + " was successfully purchased.");
                swal({
                  type: 'success',
                  title:'Congratulations!',
                  text:'Coupon ' + self.coupon.title + ' was purchased.'
                  });
                self.reset();
                },
               error =>
                  {
                  console.log(error);  
                //  alert("Error occured. Coupon " + self.coupon.title + "  cannot be purchased.");
                swal({
                  type: 'error',
                  title: 'Error occured!',
                  text: 'Coupon ' + self.coupon.title + ' cannot be purchased.',
                  });
                self.reset();
                }  
                );
   }
  
   public reset () {
     this.coupon.image="";
     this.getAllNonPurchasedCoupons();
     this.couponForm.reset();
  }

}
