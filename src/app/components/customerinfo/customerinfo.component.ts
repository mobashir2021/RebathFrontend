import { DatainteractionService } from './../../datainteraction.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.css']
})
export class CustomerinfoComponent implements OnInit {

  s1: boolean = false;
  s2: boolean = false;
  s3: boolean = false;
  s4: boolean = false;
  s5: boolean = false;
  s6: boolean = false;
  s7: boolean = false;
  s8: boolean = false;
  customername: string = '';
  customeremail: string = '';
  customerphone: string = '';
  address: string = '';
  locationdata: string = '';
  designcons: string = '';
  designconsemail: string = '';
  datepass: string = '';
  datepassplusthree: Date = new Date();
  dateoriginal : string = '';
  constructor(private router: Router, private shared: DatainteractionService,private toastr: ToastrService,private datepipe: DatePipe) { }

  ngOnInit() {
    
    if (localStorage.getItem("showcustinfo") === null) {
      
    }else if(localStorage.getItem("showcustinfo") == 'yes'){
      this.customername = localStorage.getItem('customername');
      this.customeremail = localStorage.getItem('customeremail');
      this.customerphone = localStorage.getItem('customerphone');
      this.locationdata = localStorage.getItem('location');
      this.address = localStorage.getItem('address');
      this.designcons = localStorage.getItem('salesrep');
      this.designconsemail = localStorage.getItem('salesrepemail');
      this.datepass = localStorage.getItem('datepassoriginal');
      localStorage.removeItem('showcustinfo');
    }
  }

  next() {

    this.dateoriginal = this.datepass;
    if(this.customername == ''){
      /* this.toastr.error('Customer name required !', 'error',{
        timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      }); */
    
       if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.customerphone == ''){
    /*   this.toastr.error('Customer Phone required !', 'error',{
        timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      }); */
      
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    var res = this.customeremail.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
    if(res == null){
     /*  this.toastr.error('Wrong Customer Email Format!', 'error',{
        timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      }); */
     
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      this.s8 = true;
      
      return;
    }
    if(this.customeremail == ''){
     /*  this.toastr.error('Customer Email required !', 'error',{
        timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      }); */
    
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.locationdata == ''){
     /*  this.toastr.error('Customer location required !', 'error',{
        timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      }); */
      
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.address == ''){
      // this.toastr.error('Customer address required !', 'error',{
      //   timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      // });
        
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.designcons == ''){
      // this.toastr.error('Consultant name required !', 'error',{
      //   timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      // });
      
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.designconsemail == ''){
      // this.toastr.error('Consultant email required !', 'error',{
      //   timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      // });
      
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    var res1 = this.designconsemail.match('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
    if(res1 == null){
      // this.toastr.error('Wrong SalesRep Email Format!', 'error',{
      //   timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      // });
     
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }
    if(this.datepass == ''){
      // this.toastr.error('Date is required !', 'error',{
      //   timeOut: 5000, positionClass: 'toast-center-center',progressBar: true
      // });
     
      if(this.customername == '')
      this.s1 = true;
      else  this.s1 = false;
      if(this.customerphone == '')
      this.s2 = true;
      else  this.s2 = false;
      if(this.customeremail == '')
      this.s3 = true;
      else  this.s3 = false;
      if(this.locationdata == '')
      this.s4 = true;
      else  this.s4 = false;
      if(this.address == '')
      this.s5 = true;
      else  this.s5 = false;
      if(this.designcons == '')
      this.s6 = true;
      else  this.s6 = false;
      if(this.designconsemail == '')
      this.s7 = true;
      else  this.s7 = false;
      if(this.datepass == '')
      this.s8 = true;
      else  this.s8 = false;
      return;
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        cname: this.customername, cemail: this.customeremail,
        cphone: this.customerphone, loc: this.locationdata, addr: this.address, desgcons: this.designcons, desgconsemail: this.designconsemail
      }
    };


    var jsonobj = {
      cname: this.customername,
      cemail: this.customeremail,
      cphone: this.customerphone, loc: this.locationdata, addr: this.address, desgcons: this.designcons, desgconsemail: this.designconsemail,
      datepass: this.datepass.toString()
    }

    this.shared.loadData(jsonobj);
    localStorage.setItem('customername', this.customername);
    localStorage.setItem('customeremail', this.customeremail);
    localStorage.setItem('customerphone', this.customerphone);
    localStorage.setItem('location', this.locationdata);
    localStorage.setItem('address', this.address);
    localStorage.setItem('salesrep', this.designcons);
    localStorage.setItem('datepassoriginal', this.dateoriginal);
    localStorage.setItem('salesrepemail', this.designconsemail);
    var tempdate = new Date(this.datepass);
    this.datepassplusthree.setDate( tempdate.getDate() + 3 );
    localStorage.setItem('datepass', this.datepipe.transform(this.datepass, 'MM-dd-yyyy'));
    localStorage.setItem('datepassplusthree', this.datepipe.transform(this.datepassplusthree, 'MM-dd-yyyy'));

    this.router.navigateByUrl('/customerreq');

  }

  cancel() {
    this.customername = '';
    this.customeremail = '';
    this.customerphone = '';
    this.address = '';
    this.locationdata = '';
    this.designcons = '';
    this.designconsemail = '';
    this.datepass = '';
  }

}
