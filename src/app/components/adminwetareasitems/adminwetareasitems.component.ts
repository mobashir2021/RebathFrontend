import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { MatPaginator, MatTableModule, MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import {TreeTable} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import { A11yModule } from '@angular/cdk/a11y';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-adminwetareasitems',
  templateUrl: './adminwetareasitems.component.html',
  styleUrls: ['./adminwetareasitems.component.css']
})
export class AdminwetareasitemsComponent implements OnInit {

  datas : Array<TreeNode> = [];
  treestruct : TreeNode[];
  treestructpass : TreeNode[];
  responseData: any;
  readonly rootURL = "https://rebathnodeapp21.azurewebsites.net/template";
  editField: string;
  arrayBuffer:any;
  iskeyupdone : boolean = false;
file:File;
exceltoJson = {};
tempfeatureList: Array<any> = [];
displayedRows$: Observable<any>;
  private tableData = new MatTableDataSource<any>();
  cols: any[];

  constructor(private http: HttpClient, private http2: HttpClient,private toastr: ToastrService) { }

  ngOnInit() {
    this.cols = [
      { field: 'Items', header: 'Items', width: '25%' },
      { field: 'Price', header: 'Price', width: '6%' },
      { field: 'UnitOfMeasure', header: 'Unit Of Measure', width: '6%' },
      { field: 'MinQuantity', header: 'Min Qty', width: '6%' },
      //{ field: 'Quantity', header: 'Qty', width: '6%' },
      { field: 'Bath1', header: 'Bath1', width: '5%' },
      { field: 'Bath2', header: 'Bath2', width: '5%' },
      { field: 'NoteForRep', header: 'Note For Rep', width: '13%' },
      { field: 'FinalPrice', header: 'Final Price', width: '7%' },
      { field: 'Discount', header: 'Discount', width: '7%' },
      { field: 'DiscountedPrice', header: 'Dis. Price', width: '7%' },
      
  ];
  
    this.http2.get(this.rootURL).subscribe(
      res => {
        /* var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest); */

        var vals = <TreeNode[]>res;
        for(j = 0; j < vals.length; j++){
          this.nodeTraversal(vals[j]);
        }
        this.treestructpass = <TreeNode[]>res;

        for(var j = 0; j < vals.length; j++){
          var searcheddata = <TreeNode>vals[j];
          if(searcheddata.data.Items.includes('Wet')){
            this.treestruct = [];
            this.treestruct.push(<TreeNode>searcheddata);
          }
        }
        
      },
      err => {
        console.log(err);
      });
  }

  onEdit(event: { field: string, data: any }): void {
    /* this.treestruct.forEach(el => {
      this.flattendataCalc(el);
    }); */
  }

  nodeTraversal(arr: TreeNode) {
    
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        el.expanded = false;
        
        this.nodeTraversal(el);

      });
    }else{
      arr.expanded = true;
      
      return;
    }

  }

  flattendataCalc(arr: TreeNode) {
    
    /* if(arr.data.MinQuantity !== undefined && arr.data.MinQuantity != '' 
      && parseInt(arr.data.Quantity) < parseInt(arr.data.MinQuantity)){
        totalquantity = parseInt(arr.data.MinQuantity);
      } */
      
    

      var quantityRebath1 : number = 0;
    var quantityRebath2 : number = 0;
    if(arr.data.Bath1 != ''){
      quantityRebath1= parseInt(arr.data.Bath1);
    }
    if(arr.data.Bath2 != ''){
      quantityRebath2= parseInt(arr.data.Bath2);
    }

    if(arr.data.Price != ''){
      var totalsum = quantityRebath1 * parseInt(arr.data.Price) + quantityRebath2 * parseInt(arr.data.Price);
      if(totalsum != 0){
        arr.data.FinalPrice = totalsum;
      }
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

  onClicked(i){
    this.treestruct.forEach(el => {
      this.flattendataCalc(el);
    });
  }

  
  save(){
    const replacerFunc = () => {
      const visited = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (visited.has(value)) {
            return;
          }
          visited.add(value);
        }
        return value;
      };
    };

    for(var j = 0; j< this.treestructpass.length; j++){
      var popdata = <TreeNode>this.treestructpass[j];
      if(popdata.data.Items.includes('Wet')){
        this.treestructpass[j] = this.treestruct[0];
      }
      popdata.expanded = false;
    }

    var temptree : TreeNode[] = JSON.parse(JSON.stringify(this.treestructpass, replacerFunc()));

    console.log(temptree);
    

    this.http.post<any>(this.rootURL, { featurelist: temptree }).subscribe(data => {
        
      this.toastr.success('Data Saved successfully!', 'Success',{
        timeOut: 5000,
        positionClass: 'toast-center-center',
        progressBar: true
      });
    });

    /* this.toastr.success('Data Saved successfully!', 'Success',{
          timeOut: 2000,
          progressBar: true
        }); */

    
  }

}
