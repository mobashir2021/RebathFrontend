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
import { Router } from '@angular/router';
import { DatainteractionService } from 'src/app/datainteraction.service';


@Component({
  selector: 'app-choosepackages',
  templateUrl: './choosepackages.component.html',
  styleUrls: ['./choosepackages.component.css']
})
export class ChoosepackagesComponent implements OnInit {

  datas : Array<TreeNode> = [];
  treestruct : TreeNode[];
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

  constructor(private http: HttpClient, private http2: HttpClient,private router: Router, private shared: DatainteractionService) { }

  ngOnInit() {
     this.http2.get(this.rootURL).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest);

        this.treestruct = <TreeNode[]>tempconsole;
        console.log(this.treestruct);

        for(var j = 0; j< this.treestruct.length; j++){
          
          if(this.treestruct[j].data.Items.includes('Phase')){
            this.shared.loadPhase(this.treestruct[j]);
          }else{
            this.shared.loadWet(this.treestruct[j]);
          }
          
        }

        var treestructAdditonalPhase = [];
        for(var i = 1; i < 10; i++){
          var inum = 5000 + i;
          var jsonobj = { "ParentID": "", "ProductID" : inum.toString(), "Items": '',"Quantity":'',
            "Price": '', "UnitOfMeasure" : '', "FinalPrice": '', 
            "Discount":'', "DiscountedPrice" : '',"sid":'', "DescForCust": '',
            "Bath1": '', "Bath2": '', "MinQuantity": '', "NoteForRep": '', "Misc": '',"tempid":inum, "CheckSingle":0,
          "CheckMultiple": 0}

          if(i == 1){
            jsonobj.Items = 'Additional Items';
          }

            var obj : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: true}
            treestructAdditonalPhase.push(obj);
        }
            this.shared.loadPhaseAdd(treestructAdditonalPhase);

        

          var treestructAdditonalWet = [];
          for(var i = 1; i < 10; i++){
            var inum = 5000 + i;
            var jsonobj = { "ParentID": "", "ProductID" : inum.toString(), "Items": '',"Quantity":'',
              "Price": '', "UnitOfMeasure" : '', "FinalPrice": '', 
              "Discount":'', "DiscountedPrice" : '',"sid":'', "DescForCust": '',
              "Bath1": '', "Bath2": '', "MinQuantity": '', "NoteForRep": '', "Misc": '',"tempid":inum, "CheckSingle":0,
            "CheckMultiple": 0}

            if(i == 1){
              jsonobj.Items = 'Additional Items';
            }
  
              var obj : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: true}
              treestructAdditonalWet.push(obj);
          }
              this.shared.loadWetAdd(treestructAdditonalWet);

        
        
        
      },
      err => {
        console.log(err);
      }); 

      
  }

  phase2click(){    
    this.router.navigateByUrl('/phase2items');
  }

  wetareasclick(){
    this.router.navigateByUrl('/wetareas');
  }

}
