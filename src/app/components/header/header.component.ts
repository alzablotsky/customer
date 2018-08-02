import { Component, OnInit } from '@angular/core';
import { Coupon } from '../common/Coupon';
import {CouponService} from '../../services/coupon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public name: string;

  public url ='../index.html';

  constructor(private _service: CouponService) { }

  ngOnInit() {
    this.getLoginCustomerName();
  }

public getLoginCustomerName() {
  var self = this;
  this._service.getLoginCustomerName()
     .subscribe(
      name => self.name=name,  
      error =>  console.log(error) 
        );
    }
  
    public logout () {
      window.location.assign(this.url);
      }   

}
