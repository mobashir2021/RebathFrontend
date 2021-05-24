import { DatainteractionService } from './../../datainteraction.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {TreeTable} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  treestruct : TreeNode[];
  customername : string = '';
  customeremail : string = '';
  customerphone: string = '';
  address: string = '';
  location: string = '';
  designcons : string = '';
  designconsemail : string = '';
  datepass : string = '';
  responseData: any;
  readonly rootURL = "https://rebathnodeapp21.azurewebsites.net/template";
  featureList: Array<any> = [];
  editField: string;
  arrayBuffer:any;
  filtertemp : Array<any> =  [];
  tempfl: Array<any> = [];
  totalprice : number = 0;
  totaldiscount: number = 0;
  totaldiscountedprice : number = 0;

  tempfeatureList: Array<any> = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private shared: DatainteractionService) {

    /* console.log(this.route.snapshot.queryParams["cname"]);
    this.route.queryParams.subscribe(params => {
      this.customername = params["cname"];
      this.customeremail = params["cemail"];
      this.customerphone = params["cphone"];
      this.location = params["loc"];
      this.address = params["addr"];
      this.designcons = params["desgcons"];
      this.designconsemail = params["desgconsemail"];
      this.datepass = params["datepass"];
  }); */

   }

  ngOnInit() {
    
    
    this.http.get(this.rootURL).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest);
        this.treestruct = <TreeNode[]>tempconsole;

        
      },
      err => {
        console.log(err);
      });
  }

  updateList(id: number, property: string, event: any) {
    var editFieldtemp = event.target.textContent;
    //this.featureList[id][property] = editFieldtemp;
    this.tempfeatureList[id][property] = editFieldtemp;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  next(){
    /* this.filtertemp = this.filterByString(this.featureList);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cname: this.customername, cemail: this.customeremail,
      cphone: this.customerphone, loc: location, addr: this.address, desgcons: this.designcons, desgconsemail: this.designconsemail,
      datepass: this.datepass, filterfeature: this.filtertemp
      }
    };

    this.filtertemp = this.filterByString(this.featureList);
    console.log(this.filtertemp); */

    for(var i = 0; i < this.treestruct.length; i++){
      this.flattendata(this.treestruct[i]);
    }

    
    this.totaldiscountedprice = this.totalprice - this.totaldiscount;
    var totaljsonobj = {"TotalPrice": this.totalprice, "TotalDiscount": this.totaldiscount, "TotalDiscountedPrice": this.totaldiscountedprice};
    //console.log(this.flatten(this.treestruct));
    this.shared.loadtotal(totaljsonobj);

    
    
    
    this.shared.loadFeature(this.featureList);
    this.router.navigateByUrl('/completeoverview');
  }

  onClicked(i){
    
  }

  onEdit(event: { field: string, data: any }): void {
    this.treestruct.forEach(el => {
      this.flattendataCalc(el);
    });
  }

  flattendataCalc(arr: TreeNode) {
    
    if(arr.data.Quantity != '' && arr.data.Price != ''){
      arr.data.FinalPrice = parseInt(arr.data.Quantity) * parseInt(arr.data.Price);
      if(arr.data.Discount != ''){
        arr.data.DiscountedPrice = parseInt(arr.data.FinalPrice) - parseInt(arr.data.Discount);
      }
    }
    
    if(arr.children.length == 0){
      return;
    }
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.flattendataCalc(el);
      });
    }
  }

  flattendata(arr: TreeNode) {
    
    if(arr.data.Quantity != '' && arr.data.Price != ''){
      
      this.totalprice = this.totalprice + (parseInt(arr.data.Quantity) * parseInt(arr.data.Price));

      if(arr.data.Discount != ''){
        this.totaldiscount = this.totaldiscount + parseInt(arr.data.Discount) ;
        
      }


      this.featureList.push(arr.data);
    }
    
    if(arr.children.length == 0){
      return;
    }
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.flattendata(el);
      });
    }
  }

  cancel(){

  }

  filterByString(data) {
    return data.filter(e => e.Quantity != '');
 }

}
