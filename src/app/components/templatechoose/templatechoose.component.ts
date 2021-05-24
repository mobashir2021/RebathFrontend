import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-templatechoose',
  templateUrl: './templatechoose.component.html',
  styleUrls: ['./templatechoose.component.css']
})
export class TemplatechooseComponent implements OnInit {
  

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
  parentid : number = 0;
  dataflat: TreeNode[];
  roots :TreeNode[];
  isModalShown : boolean = false;
  previousActiveElement: Document;
  @ViewChild('focusInput', {static : false}) focusInput: ElementRef;
  @ViewChild('modaldiv', {static : false}) modaldiv: ElementRef;


  constructor(private http: HttpClient, private http2: HttpClient,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    /* this.http2.get(this.rootURL).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest);

        this.treestruct = <TreeNode[]>tempconsole;
        
      },
      err => {
        console.log(err);
      }); 
      
      */
  }

  importtoggele(){
    //this.previousActiveElement = document;
    this.isModalShown = true;
  }

  modalclose(){
    this.isModalShown = false;
    //location.reload();
    
  }


  incomingfile(event) 
  {
    this.datas = [];
    this.dataflat = [];
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
        
      }
      this.exceltoJson['headers'] = headerJson;
      //console.log(this.exceltoJson);

      var temporaryFeatures : Array<any> = [];
      var ij = 0;

      dd.forEach(el => {
        
        if(el["Parent ID"] != undefined){

          if(el["Parent ID"].toString().includes(",")){
            var splitdata = el["Parent ID"].toString().split(",");
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
              var explist = '';
              var checksingle = 0;
              var checkmultiple = 0;
              
              if(el['Exception ID'] !== undefined){
                explist = el['Exception ID'];
            }
              if(el['Product ID'] !== undefined){
                  productid = el['Product ID'];
              }
              if(el['Items'] !== undefined){
                  items = el['Items'];
              }
              if(el['Price'] !== undefined){
                  price = el['Price'];
              }
              if(el['Unit of Measure'] !== undefined){
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
              if(el['CheckSingle'] !== undefined){
                checksingle = el['CheckSingle'];
              }
              // if(el['CheckMultiple'] !== undefined){
              //   checkmultiple = el['CheckMultiple'];
              // }
              
            var jsonobj = { "ParentID": innerproduct.toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
            "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
            "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
            "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc,"tempid":0, 
          "ExceptionID": explist, "IsinException": false, "CheckSingle": checksingle}
  
              
              var obj2 : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
              this.dataflat.push(obj2);
  
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
            var checksingle = 0;
              var checkmultiple = 0;
            ij = ij + 1;
            
            var explist1 = '';
              
            if(el['Exception ID'] !== undefined){
              explist1 = el['Exception ID'];
            }
            if(el['Product ID'] !== undefined){
                productid = el['Product ID'];
            }
            if(el['Items'] !== undefined){
                items = el['Items'];
            }
            if(el['Price'] !== undefined){
                price = el['Price'];
            }
            if(el['Unit of Measure'] !== undefined){
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

            if(el['CheckSingle'] !== undefined){
              checksingle = el['CheckSingle'];
            }
            // if(el['CheckMultiple'] !== undefined){
            //   checkmultiple = el['CheckMultiple'];
            // }
          var jsonobj1 = { "ParentID": el["Parent ID"].toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
          "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
          "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
          "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc,"tempid":0,
        "ExceptionID": explist1,"IsinException": false, "CheckSingle": checksingle}
  
              
              var obj5 : TreeNode = { data : jsonobj1, children : [], leaf: false, expanded: false}
              
              this.dataflat.push(obj5);
            
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
              var explist2 = '';
              var checksingle = 0;
              var checkmultiple = 0;
              
              if(el['Exception ID'] !== undefined){
                explist2 = el['Exception ID'];
            }
              
              if(el['Product ID'] !== undefined){
                  productid = el['Product ID'];
              }
              if(el['Items'] !== undefined){
                  items = el['Items'];
              }
              if(el['Price'] !== undefined){
                  price = el['Price'];
              }
              if(el['Unit of Measure'] !== undefined){
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
              if(el['CheckSingle'] !== undefined){
                checksingle = el['CheckSingle'];
              }
              // if(el['CheckMultiple'] !== undefined){
              //   checkmultiple = el['CheckMultiple'];
              // }
            var jsonobj = { "ParentID": parentid.toString(), "ProductID" : productid, "Items": items,"Quantity":quantity,
            "Price": price, "UnitOfMeasure" : unitofmeasure, "FinalPrice": finalprice, 
            "Discount": discount, "DiscountedPrice" : discountedprice,"sid":ij, "DescForCust": descforCust,
            "Bath1": bath1, "Bath2": bath2, "MinQuantity": minquantity, "NoteForRep": noteforrep, "Misc": misc,"tempid":0,
          "ExceptionID": explist2, "IsinException": false, "CheckSingle": checksingle}
          
          var obj : TreeNode = { data : jsonobj, children : [], leaf: false, expanded: false}
            this.datas.push(obj);


          
          this.dataflat.push(obj);
        }
        
      });

      var ik = 1;
      this.dataflat.forEach(val => {
        val["sid"] = ik;
        ik = ik + 1;
      });

      
      
      //console.log(this.dataflat);

      
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

  phase2click(){
    this.router.navigateByUrl('/adminphase2items')
  }

  wetareasclick(){
    this.router.navigateByUrl('/adminwetareas')
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

  


  nodeBackTraversal(id : Number, parentnode: TreeNode, mainnode: TreeNode){
    if(parentnode.data.ParentID == ""){
      return false;
    }
    if(parseInt(parentnode.data.ProductID) == id){
      mainnode.data.IsinException = true;
      return true;
    }
    if(parentnode.parent !== undefined){
     
       this.nodeBackTraversal(id, parentnode.parent, mainnode);
    }else{
      return false;
    }

    return false;
  }

  nodeTraversal(storenode : TreeNode, arr: TreeNode) {
    
    

    
    if(parseInt(arr.data.ProductID) == parseInt(storenode.data.ParentID)){
      
      arr.children.push(storenode);
      return;
    }

    
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.nodeTraversal(storenode, el);

      });
    }else{
      return;
    }
    
  }

  onClicked(i){
    
  }

  isExceptionparentexists(arr: TreeNode, exlist: number[]) {
    
    

    arr.data.tempid = this.sidno;
    arr.data.sid = this.parentid;
    this.sidno = this.sidno + 1;
    
    
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.updateSidNo(el);
      });
    }else{
      return;
    }
  }

  updateSidNo(arr: TreeNode) {
    
    

    arr.parent = undefined;
    arr.data.tempid = this.sidno;
    arr.data.sid = this.parentid;
    this.sidno = this.sidno + 1;
    
    
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.updateSidNo(el);
      });
    }else{
      return;
    }
  }

  list_to_tree(list) {
    
    
    var map = new Map<number, number>(), node, i;
    this.roots = [];
    for (i = 0; i < list.length; i++) {
      //map[list[i].ProductID] = i; // initialize the map
      map.set(parseInt(list[i].data.ProductID), i);
      //console.log(map);
      list[i].children = []; // initialize the children
    }

    //console.log(map[20]);
    
    
    for (i = 0; i < list.length; i++) {
      node = list[i];
      if (node.data.ParentID.toString() !== "") {
        // if you have dangling branches check that map[node.parentId] exists

        /* if(parseInt(node.data.ParentID) == 20){
          console.log(node);
          console.log(map.get(parseInt(node.data.ParentID)));
        } */

        var result = list.filter(
          cx => parseInt(cx.data.ProductID) === parseInt(node.data.ParentID));
        
        if(result.length > 1){
          
          result.forEach(elset => {
            var temptreend : TreeNode = JSON.parse(JSON.stringify(node));
            var exceptionlist : Array<any> = [];
            if(node.data.ExceptionID != ""){
              
              exceptionlist = [];
              
              if(node.data.ExceptionID.toString().includes(",")){
                var excepsplitdata = node.data.ExceptionID.toString().split(",");
                excepsplitdata.forEach(exlstd => {
                  exceptionlist.push(parseInt(exlstd.toString().trim()));
                });
              }else{
                exceptionlist.push(parseInt(node.data.ExceptionID.toString().trim()));
              }

              exceptionlist.forEach(exarray => {
                
                var returnresdd = this.nodeBackTraversal(exarray, elset, temptreend);
                
                if(!temptreend.data.IsinException){
                  elset.children.push(temptreend);
                  temptreend.parent = elset;
                }
              });
              
              
            }else{
              elset.children.push(temptreend);
              temptreend.parent = elset;
            }
            
          });
        }else{
          list[map.get(parseInt(node.data.ParentID))].children.push(node);
          node.parent = list[map.get(parseInt(node.data.ParentID))];
        }

        
        
      } else {
        node.parent = undefined;
        this.roots.push(node);
      }
    }
    return this.roots;
  }

  filterDuplicate(element, index, array) { 
    return (element == 10); 
 } 

  
  save(){

    var res = this.list_to_tree(this.dataflat);
    for(var jj = 0; jj < this.roots.length; jj++){
      this.sidno = 0;
      this.roots[jj].data.tempid = this.sidno;
      this.roots[jj].parent = undefined;
      
      this.parentid = parseInt(this.roots[jj].data.ProductID);
      this.roots[jj].data.sid = this.parentid;

      for(var k = 0; k < this.roots[jj].children.length; k++){
        this.sidno = this.sidno + 1;
        this.roots[jj].children[k].data.tempid = this.sidno;
        this.roots[jj].children[k].data.sid = this.parentid;
        this.roots[jj].children[k].parent = undefined;
      }
      for(var k = 0; k < this.roots[jj].children.length; k++){
        
        for(var z = 0; z < this.roots[jj].children[k].children.length; z++){
          this.roots[jj].children[k].children[z].parent = undefined;
          this.updateSidNo(this.roots[jj].children[k].children[z]);
        }
        
      }
      
    }

    
    //console.log(this.roots);

    
    

    
    
    
    //this.focusInput.nativeElement.focus();
    

    

     

    

    this.http.post<any>(this.rootURL, { featurelist: this.roots   }).subscribe(data => {
      this.isModalShown = false;
    
    
    this.toastr.success('Data Imported successfully!', 'Success',{
      timeOut: 5000,
      positionClass: 'toast-center-center',
      progressBar: true
    }).onHidden.subscribe(() => {
      //location.reload();
    });
    }); 

    

    
  }



 

}
