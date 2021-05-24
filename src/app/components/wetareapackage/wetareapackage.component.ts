import { DatainteractionService } from './../../datainteraction.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {TreeTable} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import { A11yModule } from '@angular/cdk/a11y';
import { AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-wetareapackage',
  templateUrl: './wetareapackage.component.html',
  styleUrls: ['./wetareapackage.component.css']
})
export class WetareapackageComponent implements OnInit {

  flattenNodes: TreeNode[];
  treestruct : TreeNode[];
  treestructLoad : TreeNode[];
  treestructAdditonal : TreeNode[];
  treestructpass: TreeNode[];
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
  cols: any[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private shared: DatainteractionService,
    private http2: HttpClient) { }

  ngOnInit() {
    this.cols = [
      { field: 'Items', header: 'Items', width: '25%' },
      { field: 'Price', header: 'Price', width: '6%' },
      { field: 'UnitOfMeasure', header: 'Unit Of Measure', width: '6%' },
      { field: 'MinQuantity', header: 'Min Quantity', width: '6%' },
      //{ field: 'Quantity', header: 'Quantity', width: '6%' },
      { field: 'Bath1', header: 'Bath1', width: '5%' },
      { field: 'Bath2', header: 'Bath2', width: '5%' },
      { field: 'NoteForRep', header: 'Note For Rep', width: '13%' },
      { field: 'FinalPrice', header: 'Final Price', width: '7%' },
      { field: 'Discount', header: 'Discount', width: '7%' },
      { field: 'DiscountedPrice', header: 'Discounted Price', width: '7%' },
      
  ];

    
      this.shared.getPhase().subscribe(datainput => {

        if(datainput == null){
          
          
          var res = this.shared.getmaintree();
              
      
          this.treestructLoad = <TreeNode[]>res;
          console.log(this.treestructLoad);
  
          for(var j = 0; j< this.treestructLoad.length; j++){
            
            if(this.treestructLoad[j].data.Items.includes('Phase')){
              this.shared.loadPhase(this.treestructLoad[j]);
            }else{
              this.shared.loadWet(this.treestructLoad[j]);
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

              console.log('call happening');
          this.callServiceForTree();
              
              
            

        }else{

          this.callServiceForTree();
        }
        
        
        /* for(var i = 1; i < 15; i++){
          var inum = 5000 + i;
          var jsonobj = { "ParentID": "", "ProductID" : inum.toString(), "Items": '',"Quantity":'',
            "Price": '', "UnitOfMeasure" : '', "FinalPrice": '', 
            "Discount":'', "DiscountedPrice" : '',"sid":'', "DescForCust": '',
            "Bath1": '', "Bath2": '', "MinQuantity": '', "NoteForRep": '', "Misc": '',"tempid":inum, "CheckSingle":0,
            "CheckMultiple": 0}

            var obj : TreeNode = { data : jsonobj, children : [], leaf: true, expanded: true}
            this.treestructAdditonal.push(obj);
        } */
        
        
      });


      

  }

  clearWetArea(){

    this.clearQuantity(this.treestruct[0]);
    this.treestructAdditonal.forEach(element => {
      if(element.data.Items != 'Additional Items'){
        element.data.Items = '';
      }
      
      element.data.UnitOfMeasure = '';
      element.data.Price = '';
      element.data.Quantity = '';
      element.data.FinalPrice = '';
      element.data.DiscountedPrice = '';
      element.data.Discount = '';
      element.data.Bath1 = '';
      element.data.Bath2 = '';
      element.data.NoteForRep = '';
      element.data.MinQuantity = '';

    });
  }

  clearQuantity(arrNode : TreeNode){

    if(arrNode == null){
      return;
    }
    arrNode.data.Quantity = '';
    arrNode.data.FinalPrice = '';
    arrNode.data.DiscountedPrice = '';
    arrNode.data.Discount = '';
    arrNode.data.DiscountedPrice = '';
    arrNode.data.Discount = '';
    arrNode.data.NoteForRep = '';
    if(arrNode.children != null && arrNode.children.length > 0){
      arrNode.children.forEach(el => {
        
        this.clearQuantity(el);

      });

    }else{
      return;
    }

  }


  callServiceForTree(){
    this.treestructpass = [];
    this.shared.getPhase().subscribe(datainputnew21 => {
      this.treestructpass.push(<TreeNode>datainputnew21);
      this.treestructpass.forEach(element => {
        this.nodeTraversal(element);
        });
      });

      
      this.shared.getWet().subscribe(datainput21 => {
        this.treestruct = [];
        
        this.treestruct.push(<TreeNode>datainput21);
        console.log('tempcheck');
        console.log(this.treestruct);
        this.treestruct.forEach(eld => {
          this.nodeTraversal(eld);
        });
        this.flattenNodes = [];
        this.flattenTree(this.treestruct[0]);

      });
      this.shared.getWetAdd().subscribe(datainput31 => {
        this.treestructAdditonal = [];
        this.treestructAdditonal = <TreeNode[]>datainput31;
      });
  }

  phasearea(){
    this.shared.loadWet(this.treestruct[0]);
    this.shared.loadWetAdd(this.treestructAdditonal);
    this.router.navigateByUrl('/phase2items');
  }

  nodeTraversal(arr: TreeNode) {
    
    if(arr == null){
      return;
    }
    if(arr.children != null && arr.children.length > 0){
      arr.children.forEach(el => {
        el.expanded = false;
        //el.leaf = false;
        this.nodeTraversal(el);

      });
    }else{
      arr.expanded = true;
      //arr.leaf = true;
      
      return;
    }
    
  }

  next(){

    this.shared.loadWet(this.treestruct[0]);
    this.shared.loadWetAdd(this.treestructAdditonal);
    
    
    this.shared.getPhaseAdd().subscribe(datainput3 => {

      var treestructAdd = [];
      treestructAdd = <TreeNode[]>datainput3;

      var finaltree : TreeNode[];
    finaltree = [];
    for(var i = 0; i < this.treestruct.length; i++){
      finaltree.push(this.treestruct[i]);
    }

    for(var i = 0; i < this.treestructpass.length; i++){
      finaltree.push(this.treestructpass[i]);
    }

    for(var i = 0; i < this.treestructAdditonal.length; i++){
      finaltree.push(this.treestructAdditonal[i]);
    }

    for(var i = 0; i < treestructAdd.length; i++){
      finaltree.push(treestructAdd[i]);
    }

    for(var i = 0; i < finaltree.length; i++){
      this.flattendata(finaltree[i]);
    }

    
    this.totaldiscountedprice = this.totalprice - this.totaldiscount;
    var totaljsonobj = {"TotalPrice": this.totalprice, "TotalDiscount": this.totaldiscount, "TotalDiscountedPrice": this.totaldiscountedprice};
    //console.log(this.flatten(this.treestruct));
    this.shared.loadtotal(totaljsonobj);

    
    
    
    this.shared.loadFeature(this.featureList);
    this.router.navigateByUrl('/completeoverview');
    });

    
  }

  onClicked(i){
    //pasted edit code here
    this.treestruct.forEach(el => {
      this.flattendataCalc(el);
    });
    /* console.log('onclicked');
    console.log(i); */
    if(i.ProductID !== undefined && i.ProductID != "" && parseInt(i.ProductID) < 5000){
      
      //alert(JSON.stringify(i));
      var result = this.flattenNodes.filter(
        cx => parseInt(cx.data.ProductID) === parseInt(i.ProductID));

      var isallsame : boolean = true;
      var isreturn : boolean = false;
      var initialvalue = 0;
      result.forEach(eld => {
        if(eld.data.CheckSingle !== undefined && eld.data.CheckSingle != ''){
          if(initialvalue == 0){
            initialvalue = eld.data.CheckSingle;
          }else{
            if(initialvalue != eld.data.CheckSingle){

              isallsame = false;
            }
          }

        }else{
          isreturn = true;
        }
      });
      if(isreturn){
        return;
      }
      
      
      if(i.CheckSingle !== undefined && i.CheckSingle > 0 && i.Quantity != ''){
        if(parseInt(i.Quantity) != i.CheckSingle && !isallsame){
          result[0].data.Quantity = '';
          result[0].data.FinalPrice = '';
          result[0].data.Discount = '';
          result[0].data.DiscountedPrice = '';
          return;
        }
        this.treestruct.forEach(element => {
          this.updateQuantity(i.ParentID, element, i.ProductID);
        });
        
      }
    }else{
      if(i.Items !== undefined && i.Items != '' && i.Price !== undefined && i.Price != ''){
        
        var node : TreeNode;
        this.treestructAdditonal.forEach(elp => {
          if(elp.data.Items == i.Items){
            var quantityRebath1 : number = 0;
            var quantityRebath2 : number = 0;
            if(i.Bath1 != ''){
              quantityRebath1= parseInt(i.Bath1);
            }
            if(i.Bath2 != ''){
              quantityRebath2= parseInt(i.Bath2);
            }

            var totalsum = quantityRebath1 * parseInt(i.Price) + quantityRebath2 * parseInt(i.Price);
              if(totalsum != 0){
                elp.data.FinalPrice = totalsum;
              }

            
          if(i.Discount !== undefined && i.Discount != '' && totalsum != 0){
            elp.data.DiscountedPrice = parseInt(i.FinalPrice) - parseInt(i.Discount);
          }
          }
        });
        
      }
    }
    
    
  }

  searchNode(items : any, arr: TreeNode) {
    
    
    
    if(arr.data.Items == items){
      return arr;
    }
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        this.searchNode(items, el);
      });
    }else{
      var jsonobj = { "ProductID" : "-111"}
      var tempobj : TreeNode  = { data : jsonobj, children : [], leaf: false, expanded: false}
      return tempobj;
    }
  }

  onEdit(event: { field: string, data: any }): void {
    /* console.log('edit');
    console.log(event.field);
    console.log(event.data);
    this.treestruct.forEach(el => {
      this.flattendataCalc(el);
    }); */
  }

  

  updateQuantity(parentid: any, treenode : TreeNode, productid : any){
    
    if(treenode.children.length > 0){
      treenode.children.forEach(el => {
        
        
        this.updateQuantity(parentid, el, productid);

      });
      
    }else{
      if(treenode.data.ParentID !== undefined && treenode.data.ParentID != '' && treenode.data.ParentID == parentid && productid != treenode.data.ProductID){
        if(treenode.data.CheckSingle !== undefined && treenode.data.CheckSingle != "" && treenode.data.CheckSingle > 0){
          treenode.data.Quantity = '';
          treenode.data.FinalPrice = '';
          treenode.data.Discount = '';
          treenode.data.DiscountedPrice = '';
        }
        
      }
      return;
    }
  }

  flattenTree(arr: TreeNode) {

    if(arr == null){
      return;
    }
    this.flattenNodes.push(arr);
    if(arr.children.length > 0){
      arr.children.forEach(el => {
        
        this.flattenTree(el);

      });
    }else{
      
      return;
    }
    
  }

  flattendataCalc(arr: TreeNode) {
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

  flattendata(arr: TreeNode) {
    var quantityRebath1 : number = 0;
    var quantityRebath2 : number = 0;
    if(arr.data.Bath1 != ''){
      quantityRebath1= parseInt(arr.data.Bath1);
    }
    if(arr.data.Bath2 != ''){
      quantityRebath2= parseInt(arr.data.Bath2);
    }

    
    if(arr.data.Price != ''){
      
      this.totalprice = this.totalprice + (quantityRebath1 * parseInt(arr.data.Price) + quantityRebath2 * parseInt(arr.data.Price));

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
    this.router.navigateByUrl('/customerreq');
  }

  filterByString(data) {
    return data.filter(e => e.Quantity != '');
 }

}
