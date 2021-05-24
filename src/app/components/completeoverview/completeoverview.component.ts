import { Observable, forkJoin } from 'rxjs';
import { DatainteractionService } from './../../datainteraction.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
 
import { Component, ElementRef, OnInit, ViewChild ,Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { SignaturePad } from "angular2-signaturepad";
import { Customercl } from 'src/app/customercl.model';
//import { ToastrService } from "ngx-toastr";
 
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-completeoverview',
  templateUrl: './completeoverview.component.html',
  styleUrls: ['./completeoverview.component.css']
})


export class CompleteoverviewComponent implements OnInit {

  private httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };
 
   elementdata : any;
  checksix : boolean = true;
  checkeight: boolean = true;
  showtext: boolean = true;
  printtext: boolean = false;
  permission1 = 0;
  permission2 = 0;
  permission3 = 0;
  
  

  checksixchk : boolean = false;
  checkeightchk: boolean = false;
  
  customername : string = '';
  customeremail : string = '';
  customerphone: string = '';
  address: string = '';
  firstdiv: any = 0;
  firstsignaturepad : any;
  secondsignaturepad : any;
  thirdsignaturepad : any;
  seconddiv: any = 0;
  datepassplusthree: string = '';
  readonly rootURL = "https://rebathnodeapp21.azurewebsites.net/customer";
  readonly rootURLEmail = "https://rebathnodeapp21.azurewebsites.net/emailsend";
  locationdata: string = '';
  designcons : string = '';
  designconsemail : string = '';
  datepass : string = '';
  datepass3days : string = '';
  responseData: any;
  filterdata : Array<any> =  [];
  filterdataPhase : Array<any> =  [];
  filterdataWet : Array<any> =  [];
  inputdata: any;
  jobtotal : any =  '$-';
  discountcoupon : any = '$-';
  salesamt : any = '$-';
  additionalnotes: string = '';
  custId : string = '';
  customerObj : Customercl = new Customercl();
  additionaldata: Array<any> =  [];
  emailarray: Array<string> = [];
  isadditionaldata : boolean = false;
  

  attachmentdata : any;


  issavehappened : boolean = false;

  showheader = false;
  headerdata: string = '';
  @ViewChild('target', {static: false}) private myScrollContainer: ElementRef;
  @ViewChild('appenddata', {static: false}) appenddata: ElementRef;
  @ViewChild('signpad', {static: false})  signaturePad: SignaturePad;
  @ViewChild('signpad1', {static: false})  signaturePad1: SignaturePad;
  @ViewChild('signpad2', {static: false})  signaturePad2: SignaturePad;
   @ViewChild('closeBtn', {static: false}) closeBtn: ElementRef;
   @ViewChild('closeBtn2', {static: false}) closeBtn2: ElementRef;
   

  public signaturePadOptions = {
    'minWidth': 2,
    penColor: 'red',
    backgroundColor: 'rgb(255, 255, 255)',
    canvasWidth: 600,
    canvasHeight: 180

  };
  




  constructor(private http: HttpClient,private http2: HttpClient, private route: ActivatedRoute, private router:Router, private shared: DatainteractionService
    ,private toastr: ToastrService,private elementRef:ElementRef,private renderer: Renderer2, private http3: HttpClient) {
    /* this.route.queryParams.subscribe(params => {
      this.customername = params["cname"];
      this.customeremail = params["cemail"];
      this.customerphone = params["cphone"];
      this.location = params["loc"];
      this.address = params["addr"];
      this.designcons = params["desgcons"];
      this.designconsemail = params["desgconsemail"];
      this.datepass = params["datepass"];
      this.filterdata = params["filterfeature"];
  }); */
  

   }

  ngOnInit() {
    this.issavehappened = false;
    this.customername = localStorage.getItem('customername');
    this.customeremail = localStorage.getItem('customeremail');
    this.customerphone = localStorage.getItem('customerphone');
    this.locationdata = localStorage.getItem('location');
    this.address = localStorage.getItem('address');
    this.designcons = localStorage.getItem('salesrep');
    this.designconsemail = localStorage.getItem('salesrepemail');
    this.datepass = localStorage.getItem('datepass');
    this.datepassplusthree = localStorage.getItem('datepassplusthree');
    

    this.customerObj.Customername = this.customername;
      this.customerObj.Customeremail = this.customeremail;
      this.customerObj.Customerphone = this.customerphone;
      this.customerObj.Address = this.address;
      this.customerObj.Locationdata = this.locationdata;
      this.customerObj.DesgConsult = this.designcons;
      this.customerObj.DesgConsultEmail = this.designconsemail;
      this.customerObj.DatePass = this.datepass;
    
    
    this.shared.getData().subscribe(datainput => {
      this.inputdata= datainput;
      /* this.customername = datainput.cname;
      this.customeremail = datainput.cemail;
      this.customerphone = datainput.cphone;
      this.locationdata = datainput.loc;
      this.address = datainput.addr;
      this.designcons = datainput.desgcons;
      this.designconsemail = datainput.desgconsemail;
      this.datepass = datainput.datepass;

      this.customerObj.Customername = this.customername;
      this.customerObj.Customeremail = this.customeremail;
      this.customerObj.Customerphone = this.customerphone;
      this.customerObj.Address = this.address;
      this.customerObj.Locationdata = this.locationdata;
      this.customerObj.DesgConsult = this.designcons;
      this.customerObj.DesgConsultEmail = this.designconsemail;
      this.customerObj.DatePass = this.datepass; */
  
    });
    this.shared.getFeature().subscribe(datainput2 => {
      this.filterdata = datainput2;
    //  console.log(this.filterdata);
      this.filterdataPhase = [];
      this.filterdataWet = [];
      this.additionaldata = [];
      for(var j = 0; j < this.filterdata.length; j++){
        if(parseInt(this.filterdata[j].ProductID) < 5000){
          if(this.filterdata[j].sid == 2){
            this.filterdataPhase.push(this.filterdata[j]);
          }else{
            this.filterdataWet.push(this.filterdata[j]);
          }
            
          
        }else{
          this.additionaldata.push(this.filterdata[j]);
        }
      }

      if(this.additionaldata.length > 0){
        this.isadditionaldata = true;
      }


      console.log('testtest');
      console.log(this.additionaldata);
      this.customerObj.feature = this.filterdata;
      
      
    });

    this.shared.gettotal().subscribe(datainput3 => {
      var indatas = JSON.parse(JSON.stringify(datainput3)) ;
      
      this.jobtotal = '$' + indatas.TotalPrice;
      this.discountcoupon = '$' + indatas.TotalDiscount;
      this.salesamt = '$' + indatas.TotalDiscountedPrice;
      

    });
  }


  gotoWetArea(){
    this.router.navigateByUrl('/wetareas');
  }

  gotoPhase2(){
    this.router.navigateByUrl('/phase2items');

  }
/*   scrollToElement(el): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  } */

 /*  scroll(el: HTMLElement) {
    el.scrollIntoView();
} */

drawClear(){
  this.signaturePad2.clear();
  this.permission3 =  0;
  console.log('this.permission3 ',this.permission3 );
  
}
drawClear1(){
  this.signaturePad1.clear();
  this.permission2 = 0;
  console.log('this.permission2 ',this.permission2 );
}
drawClear2(){
  this.signaturePad.clear();
  this.permission1 = 0;
  console.log('this.permission1 ',this.permission1 );
}

funcsix(){

  
  
  

}

funceight(){
  if(this.checkeight){
    this.checksix = false;
    this.checkeight = true;
  }else{
    this.checksix = true;
    this.checkeight = false;
  }
  
}

onSixChange(eve: any) {
  console.log('six');
  this.checksixchk = !this.checksixchk;
  if(this.checksixchk){
    this.checkeight = false;
  }else{
    this.checkeight = true;
  }

}

oneightChange(eve: any) {
  console.log('eight');
  this.checkeightchk = !this.checkeightchk;
  if(this.checkeightchk){
    this.checksix = false;
  }else{
    this.checksix = true;
  }

}

converter(dom) {
  if (dom.nodeType === Node.TEXT_NODE) {
      return dom.nodeValue;
  }
  if (dom.nodeType === Node.DOCUMENT_NODE) {
      dom = dom.documentElement;
  }
  const obj : any = {};
  obj.nodeType = dom.nodeType;
  if (dom.nodeType === Node.ELEMENT_NODE) {
      obj.tagName = dom.tagName;
      obj.attributes = []; // Array.from(obj.attributes) gives us a lot of things we don't want
      for (let i = 0, len = dom.attributes.length; i < len; ++i) {
          const attr = dom.attributes[i];
          obj.attributes.push({name: attr.name, value: attr.value});
      }
      obj.children = [];
      for (let child = dom.firstChild; child; child = child.nextSibling) {
          obj.children.push(this.converter(child));
      }
  } else {
      obj.nodeValue = dom.nodeValue;
  }
  return obj;
}



drawComplete(){
  this.showtext = false;
  this.printtext = true;
  this.firstsignaturepad = this.signaturePad.toDataURL('image/png', 0.5);
  this.secondsignaturepad = this.signaturePad1.toDataURL('image/png', 0.5);
  this.thirdsignaturepad = this.signaturePad2.toDataURL('image/png', 0.5);
  //const blob = this.base64toBlob(base64data);
  //console.log(base64data);
  //console.log(blob);
this.seconddiv = 1;
  this.customerObj.Jobtotal = this.jobtotal;
  this.customerObj.SalesAmt = this.salesamt;
  this.customerObj.Discountcoupon = this.discountcoupon;
  //this.customerObj.Esignaturedata = base64data;
  this.customerObj.AdditionalNotes = this.additionalnotes;

  //console.log(this.customerObj);
 

  this.http.post<any>(this.rootURL, { customerobj: this.customerObj }).subscribe(data1 => {
    this.issavehappened = true;
    

    this.custId = data1._id;
    this.headerdata = "Re-Bath Envelope ID: " + this.custId.toString();
    var email1 = 'zamanmobashir@gmail.com';

    this.emailarray = [];
    this.emailarray.push(this.customeremail);
    this.emailarray.push(this.designconsemail);
    this.emailarray.push(email1);
    var elementdata2 = document.getElementById('maindivdata').innerHTML;
    
   
   
    
  
 /*    const divHeight = elementdata.clientHeight;
  const divWidth = elementdata.clientWidth;
  const options = { background: '#FFFDFB', width: divWidth, height: divHeight }; */

  const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'text/html'
    }),
    responseType: 'text'
};

/* const jsondata = JSON.stringify(this.converter(elementdata2), null, 4);
console.log(jsondata); */
  
  this.http3.post('https://digimarkon.com/pdfcode/report/pdfBydata',{text:  elementdata2  }
  , {headers:new HttpHeaders().set('Content-Type', 'text/html; charset=utf-8').set('Accept', 'text/html'), responseType: 'text' } 
  ).subscribe(datanew => { 
    console.log(datanew);
     
    this.attachmentdata = datanew;
    var arrpost = [];
    this.emailarray.forEach(mailarray => {

      arrpost.push(this.http2.post<any>(this.rootURLEmail, { attachment: this.attachmentdata, email: [mailarray],
        'subject': 'Rebath Contract agreement', 'message':'Kindly find the attached file for more information.', 
        'fromusername': 'rebath2021@gmail.com', 'frompassword': 'rebath@123' }));
    });
    forkJoin(arrpost).subscribe(results =>{
      
    });
    this.closeBtn2.nativeElement.click();

    this.toastr.success('Mail has been sent, kindly check in sometime!', 'Success',{
      timeOut: 5000,
      positionClass: 'toast-center-center',
      progressBar: true
    });
  
  }); 
  /* domtoimage.toPng(elementdata, options).then((imgData) => {
    const doc = new jsPDF("l", "mm", "a4"); 
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, 'PNG', 40, 15, pdfWidth, pdfHeight); */
    //doc.save('pdfDocument.pdf');

    // this.attachmentdata = doc.output('datauristring');
    // var arrpost = [];
    // this.emailarray.forEach(mailarray => {

    //   arrpost.push(this.http2.post<any>(this.rootURLEmail, { attachment: this.attachmentdata, email: [mailarray],
    //     'subject': 'Rebath Contract agreement', 'message':'Kindly find the attached file for more information.', 
    //     'fromusername': 'rebath2021@gmail.com', 'frompassword': 'rebath@123' }));
    // });
    // forkJoin(arrpost).subscribe(results =>{
      
    // });
    // this.closeBtn2.nativeElement.click();

    // this.toastr.success('Mail has been sent, kindly check in sometime!', 'Success',{
    //   timeOut: 5000,
    //   positionClass: 'toast-center-center',
    //   progressBar: true
    // });
    
   //});
   
}); 

 
 

}

sendMailLoop(emailid){
  
  this.http2.post<any>(this.rootURLEmail, { attachment: this.attachmentdata, email: "pranavweb686@gmail.com",
  'subject': 'Rebath Contract agreement', 'message':'Kindly find the attached file for more information.', 
  'fromusername': 'rebath2021@gmail.com', 'frompassword': 'rebath@123' }).subscribe(datanew => {

}); 

}

customedetailclick(){
  localStorage.setItem('showcustinfo', 'yes');
  this.router.navigateByUrl('/customerinfo');
}


base64toBlob(base64){
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(':')[0];
  const byteNumbers = new Array(byteString.length);

  for(let i = 0; i < byteString.length; i++){
    byteNumbers[i] = byteString.charAt(i);
  }

  const ia = new Uint8Array(byteNumbers);
  return new Blob([ia], {type: mimeString});
}


downloadpdf(){
  //this.closeBtn2.nativeElement.click();
  var elementdata = document.getElementById('maindivdata');
  /* html2canvas(elementdata).then((canvas) => {
    var imgtodata = canvas.toDataURL('image/png');
    var doc = new jsPDF('p', 'mm', 'a4');
    doc.addImage(imgtodata, 'PNG', 0 , 0, canvas.width, canvas.height);
    doc.save('image.pdf');
    

  });  */

  /* const options = { background: 'white', height: 1900, width: 1400 };
  domtoimage.toPng(elementdata, options).then((dataUrl) => {
    //Initialize JSPDF
    const doc = new jsPDF('p', 'mm', 'a4');
    //Add image Url to PDF
    doc.addImage(dataUrl, 'jpg', 10, 10, 220, 350);
    doc.save('pdfDocument.pdf');
  }); */

  const divHeight = elementdata.clientHeight;
  const divWidth = elementdata.clientWidth;
  const options = { background: '#FFFDFB', width: divWidth, height: divHeight };
 
 
  domtoimage.toPng(elementdata, options).then((imgData) => {
    const doc = new jsPDF('p', 'mm', [divWidth, divHeight]);
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, 'PNG', 40, 15, pdfWidth, pdfHeight);
    doc.save('pdfDocument.pdf');

    this.attachmentdata = doc.output('datauristring');
  });

}

tncpopup(){

}

public downloadAsPDF() {
  /* 
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const pdfTable = this.pdfTable.nativeElement;
  doc.addImage(pdfTable.innerHTML, 15, 15, {
    width: 190,
    'elementHandlers': specialElementHandlers
  });

  doc.save('tableToPdf.pdf'); */
}

closemodal(){
  this.closeBtn.nativeElement.click();
  this.firstdiv= 1; 
}



dlpdf() {
  this.elementdata = document.getElementById('maindivdata');
  console.log("sssssssssssss", this.elementdata);  
  /* const mainheaders = new HttpHeaders().set('Content-Type', 'text/html; charset=utf-8');
  mainheaders.set('responseType', 'text'); */
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/html'
    }),
    'responseType': 'text'
  };
  this.http2.post('http://webdost.in/school/Report/pdfBydata', {text: this.elementdata}
  , 
  {
    observe: 'response',
    responseType: 'text'
  }).subscribe(datanew => { 
    console.log(datanew); 
}); 
}


  getpermission1()
  {     
    this.permission1 = 1;     
    console.log('this.permission1',this.permission1);
    
  }
  getpermission2()
  {     
    this.permission2 = 1;     
    console.log('this.permission2',this.permission2);
  }
  getpermission3()
  {     
    this.permission3 = 1;  
    console.log('this.permission3',this.permission3);   
  }


}
