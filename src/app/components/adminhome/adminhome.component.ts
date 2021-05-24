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

/* export interface TreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}
 */


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  sidno: number = 0;
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

  

testdata : TreeNode[];
  
tempfl: Array<any> = [];
  featureList: Array<any> = [
    /* { ProductID: 1,  Items: 'Double Door', Price: 30, UnitOfMeasure: '', Quantity: '', FinalPrice: '', Discount: '', DiscountedPrice: '' },
    { ProductID: 2,  Items: 'Single Door', Price: 45, UnitOfMeasure: '', Quantity: '', FinalPrice: '', Discount: '', DiscountedPrice: '' },
    { ProductID: 3,  Items: 'Brown', Price: 26, UnitOfMeasure: '', Quantity: '', FinalPrice: '', Discount: '', DiscountedPrice: '' },
    { ProductID: 4,  Items: 'Red', Price: 30, UnitOfMeasure: '', Quantity: '', FinalPrice: '', Discount: '', DiscountedPrice: '' }
   */
  ];

  constructor(private http: HttpClient, private http2: HttpClient
    //, private toastr: ToastrService
    ) { }

  ngOnInit() {
    
    this.http2.get(this.rootURL).subscribe(
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
    var editFielddd = event.target.textContent;
    
    //this.featureList[id][property] = editFielddd;
    this.tempfeatureList[id][property] = editFielddd;
    //console.log('abc' + editFielddd);
    //console.log(this.featureList);
  }

  /* remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.featureList.splice(id, 1);
  } */

  /* add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.featureList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  } */

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
    //console.log('xyz' + this.editField);
    //console.log(this.featureList); 
  }

  incomingfile(event) 
  {
    this.datas = [];
    this.featureList = [];
    this.exceltoJson = {};
    let headerJson = {};
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    //console.log("filename", target.files[0].name);
    this.exceltoJson['filename'] = target.files[0].name;
    var dd : any;
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      for (var i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        var data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        this.exceltoJson[`sheet${i + 1}`] = data;
        dd  =  this.exceltoJson[`sheet${i + 1}`];
        
        const headers = this.get_header_row(ws);
        headerJson[`header${i + 1}`] = headers;
        //  console.log("json",headers)
      }
      this.exceltoJson['headers'] = headerJson;
      //console.log(this.exceltoJson);

      var temporaryFeatures : Array<any> = [];
      var ij = 0;

      dd.forEach(el => {
        
        //console.log('eachdata');
        //console.log(el);
        if(el["Parent ID"] != undefined){

          if(el["Parent ID"].toString().includes("&")){
            var splitdata = el["Parent ID"].toString().split("&");
            splitdata.forEach(dat => {
              ij = ij+1;
              var innerstr = dat.toString().trim();
              var innerproduct = parseInt(innerstr);
  
              
              var productid = '';
              var items = '';
              var price = '';
              var unitofmeasure = '';
              var quantity = '';
              var finalprice = '';
              var discount = '';
              var discountedprice = '';
              var descforCust = '';
              var bath1 = '';
              var bath2 = '';
              var noteforrep = '';
              var minquantity = '';
              var misc = '';
              
              if(el['Product ID'] !== undefined){
                  productid = el['Product ID'];
              }
              if(el['Items'] !== undefined){
                  items = el['Items'];
              }
              if(el['Price'] !== undefined){
                  price = el['Price'];
              }
              if(el['UnitOfMeasure'] !== undefined){
                  unitofmeasure = el['Unit of Measure'];
              }
              if(el['Quantity'] !== undefined){
                  quantity = el['Quantity'];
              }
              if(el['FinalPrice'] !== undefined){
                  finalprice = el['Final Price'];
              }
              if(el['Discount'] !== undefined){
                  discount = el['Discount'];
              }
              if(el['Discounted Price'] !== undefined){
                  discountedprice = el['Discounted Price'];
              }
              if(el['Description For Customer'] !== undefined){
                descforCust = el['Description For Customer'];
              }
              if(el['Bath1'] !== undefined){
                bath1 = el['Bath1'];
              }
              if(el['Bath2'] !== undefined){
                bath2 = el['Bath2'];
              }
              if(el['Min Quantity'] !== undefined){
                minquantity = el['Min Quantity'];
              }
              if(el['Note For Rep'] !== undefined){
                noteforrep = el['Note For Rep'];
              }
              if(el['Misc'] !== undefined){
                misc = el['Misc'];
              }
            var jsonobj = { "ParentID": innerproduct.toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
            "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
            "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
            "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc, "tempid":0}
  
              
              var obj2 : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
              var objectsearch : TreeNode;
              var checkcondition : boolean = false;
              var exceptionlist : number[];
              if(el['Exception ID'] !== undefined){
                if(el["Exception ID"].toString().includes("&")){
                  var excepsplitdata = el["Exception ID"].toString().split("&");
                  excepsplitdata.forEach(exlst => {
                    exceptionlist.push(parseInt(exlst.toString().trim()));
                  });
                }else{
                  exceptionlist.push(parseInt(el['Exception ID'].toString().trim()));
                }
              }
              for(var xy = 0; xy < this.datas.length; xy++){
                if(checkcondition){
                  continue;
                }
                var atreenode = this.datas[xy];
  
                this.nodeTraversal(obj2, atreenode, exceptionlist);//pass list of exceptionid here
                
              }
  
              
              //var currfilter1 = <TreeNode>this.datas.filter(dd => parseInt(dd.data.ProductID) == innerproduct)[0];
              /* const tg = (currfilter1: any): currfilter1 is TreeNode => {return true }
              console.log('aaa');
              console.log(currfilter1);
              console.log(currfilter1.children); */
  
              //objectsearch.children.push(obj2);
  
              
            });
          }else{
            var productid = '';
            var items = '';
            var price = '';
            var unitofmeasure = '';
            var quantity = '';
            var finalprice = '';
            var discount = '';
            var discountedprice = '';
            var descforCust = '';
            var bath1 = '';
            var bath2 = '';
            var noteforrep = '';
            var minquantity = '';
            var misc = '';
            
            if(el['Product ID'] !== undefined){
                productid = el['Product ID'];
            }
            if(el['Items'] !== undefined){
                items = el['Items'];
            }
            if(el['Price'] !== undefined){
                price = el['Price'];
            }
            if(el['UnitOfMeasure'] !== undefined){
                unitofmeasure = el['Unit of Measure'];
            }
            if(el['Quantity'] !== undefined){
                quantity = el['Quantity'];
            }
            if(el['FinalPrice'] !== undefined){
                finalprice = el['Final Price'];
            }
            if(el['Discount'] !== undefined){
                discount = el['Discount'];
            }
            if(el['Discounted Price'] !== undefined){
                discountedprice = el['Discounted Price'];
            }
            if(el['Description For Customer'] !== undefined){
              descforCust = el['Description For Customer'];
            }
            if(el['Bath1'] !== undefined){
              bath1 = el['Bath1'];
            }
            if(el['Bath2'] !== undefined){
              bath2 = el['Bath2'];
            }
            if(el['Min Quantity'] !== undefined){
              minquantity = el['Min Quantity'];
            }
            if(el['Note For Rep'] !== undefined){
              noteforrep = el['Note For Rep'];
            }
            if(el['Misc'] !== undefined){
              misc = el['Misc'];
            }
          var jsonobj1 = { "ParentID": el["Parent ID"].toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
          "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
          "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
          "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc,"tempid":0}
  
              
              var obj2 : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
              var checkcondition : boolean = false;
              var exceptionlist : number[];
              if(el['Exception ID'] !== undefined){
                if(el["Exception ID"].toString().includes("&")){
                  var excepsplitdata = el["Exception ID"].toString().split("&");
                  excepsplitdata.forEach(exlst => {
                    exceptionlist.push(parseInt(exlst.toString().trim()));
                  });
                }else{
                  exceptionlist.push(parseInt(el['Exception ID'].toString().trim()));
                }
              }
              for(var xy = 0; xy < this.datas.length; xy++){
                if(checkcondition){
                  continue;
                }
                var atreenode = this.datas[xy];
  
                this.nodeTraversal(obj2, atreenode, exceptionlist);//pass list of exceptionid here
                
              }
            
          }
          
        }else{
          ij = ij+1;
          var parentid = '';
          
          if(el["Parent ID"] !== undefined){
            parentid = el["Parent ID"];
          }
          var productid = '';
              var items = '';
              var price = '';
              var unitofmeasure = '';
              var quantity = '';
              var finalprice = '';
              var discount = '';
              var discountedprice = '';
              var descforCust = '';
              var bath1 = '';
              var bath2 = '';
              var noteforrep = '';
              var minquantity = '';
              var misc = '';
              
              if(el['Product ID'] !== undefined){
                  productid = el['Product ID'];
              }
              if(el['Items'] !== undefined){
                  items = el['Items'];
              }
              if(el['Price'] !== undefined){
                  price = el['Price'];
              }
              if(el['UnitOfMeasure'] !== undefined){
                  unitofmeasure = el['Unit of Measure'];
              }
              if(el['Quantity'] !== undefined){
                  quantity = el['Quantity'];
              }
              if(el['FinalPrice'] !== undefined){
                  finalprice = el['Final Price'];
              }
              if(el['Discount'] !== undefined){
                  discount = el['Discount'];
              }
              if(el['Discounted Price'] !== undefined){
                  discountedprice = el['Discounted Price'];
              }
              if(el['Description For Customer'] !== undefined){
                descforCust = el['Description For Customer'];
              }
              if(el['Bath1'] !== undefined){
                bath1 = el['Bath1'];
              }
              if(el['Bath2'] !== undefined){
                bath2 = el['Bath2'];
              }
              if(el['Min Quantity'] !== undefined){
                minquantity = el['Min Quantity'];
              }
              if(el['Note For Rep'] !== undefined){
                noteforrep = el['Note For Rep'];
              }
              if(el['Misc'] !== undefined){
                misc = el['Misc'];
              }
            var jsonobj = { "ParentID": parentid.toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
            "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
            "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
            "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc,"tempid":0}
          /* if(el["Parent ID"] != undefined && parseInt(el["Parent ID"].toString()) > 0){
            var obj1 : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
            var mnparentid = parseInt(el["Parent ID"].toString());
            
            var currfilter  = <TreeNode>this.datas.filter(dd => parseInt(dd.data.ProductID) == mnparentid)[0];
           
            currfilter.leaf = true;
            currfilter.children.push(obj1);
          }else{
            var obj : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
            this.datas.push(obj);
          } */

          var obj : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
            this.datas.push(obj);


          
          temporaryFeatures.push(jsonobj);
        }
        
      });

      var ik = 1;
      temporaryFeatures.forEach(val => {
        val["sid"] = ik;
        ik = ik + 1;
      });

      console.log('tempdata');
      
      console.log(this.datas);

      this.treestruct = [];
      this.treestruct = <TreeNode[]>this.datas;
      console.log(this.treestruct);

      /* const fieldSorter = (fields) => (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

      temporaryFeatures.sort(fieldSorter(['ParentID', 'ProductID'])); */

      /* this.featureList = temporaryFeatures;

      temporaryFeatures.forEach(xy => {
        this.tempfeatureList.push(JSON.parse(JSON.stringify(xy)));
      }); */
      
    };

    
  }

  

  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
      // console.log("cell",cell)
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
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

  searchNode(productid : any, arr: TreeNode) {
    
    
    
    if(parseInt(arr.data.ProductID) == parseInt(productid)){
      return arr;
    }
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.searchNode(productid, el);
      });
    }else{
      var jsonobj = { "ProductID" : "-1"}
      var tempobj : TreeNode  = { data : jsonobj, children : [], leaf: false, expanded: false}
      return tempobj;
    }
  }

  nodeTraversal(storenode : TreeNode, arr: TreeNode, exlist: number[]) {
    
    var isinlist: boolean = false;
    exlist.forEach(lst => {
      if(parseInt(arr.data.ProductID) == lst){
        isinlist = true;
      }
    });
    if(isinlist){
      return;
    }

    
    if(parseInt(arr.data.ProductID) == parseInt(storenode.data.ProductID)){
      arr.children.push(storenode);
    }
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.searchNode(storenode, el);
      });
    }else{
      return;
    }
  }

  updateSidNo(arr: TreeNode) {
    
    

    arr.data.tempid = this.sidno;
    this.sidno = this.sidno + 1;
    
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.updateSidNo(el);
      });
    }else{
      return;
    }
  }

  onClicked(i){
    
  }

  
  save(){
    for(var jj = 0; jj < this.treestruct.length; jj++){
      this.sidno = 0;
      this.updateSidNo(this.treestruct[jj]);
    }

    console.log(this.treestruct);

    this.http.post<any>(this.rootURL, { featurelist: this.treestruct }).subscribe(data => {
        
        alert('Data Saved Successfully!');
    });

    /* this.toastr.success('Data Saved successfully!', 'Success',{
          timeOut: 2000,
          progressBar: true
        }); */

    
  }

}
