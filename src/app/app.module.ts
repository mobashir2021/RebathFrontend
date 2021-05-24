import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { TermsconditionComponent } from './components/termscondition/termscondition.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EsignComponent } from './components/esign/esign.component';
import { CompleteoverviewComponent } from './components/completeoverview/completeoverview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import * as XLSX from 'xlsx';
import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { SalesrepComponent } from './components/salesrep/salesrep.component';
import { CustomerinfoComponent } from './components/customerinfo/customerinfo.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SignaturePadModule } from "angular2-signaturepad";
import {MatExpansionModule} from '@angular/material/expansion';
import {FileUploadModule} from 'primeng/fileupload';
import { DialogModule } from "primeng/dialog";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import {TreeTable, TreeTableModule, TTEditableColumn, TTScrollableView} from 'primeng/treetable';
import { FilterService, TreeNode, MessageService, PrimeNGConfig } from 'primeng/api';
import { TemplatechooseComponent } from './components/templatechoose/templatechoose.component';
import { Phase2itemsComponent } from './components/phase2items/phase2items.component';
import { WetareapackageComponent } from './components/wetareapackage/wetareapackage.component';
import { Adminphase2itemsComponent } from './components/adminphase2items/adminphase2items.component';
import { AdminwetareasitemsComponent } from './components/adminwetareasitems/adminwetareasitems.component';
import { ChoosepackagesComponent } from './components/choosepackages/choosepackages.component';
import { ImportdialogComponent } from './components/importdialog/importdialog.component';
import { MatDialogModule } from '@angular/material';
import { DatePipe } from '@angular/common'

/* import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  */



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    TermsconditionComponent,
    SummaryComponent,
    EsignComponent,
    CompleteoverviewComponent,
    AdminhomeComponent,
    SalesrepComponent,
    CustomerinfoComponent,
    TemplatechooseComponent,
    Phase2itemsComponent,
    WetareapackageComponent,
    Adminphase2itemsComponent,
    AdminwetareasitemsComponent,
    ChoosepackagesComponent,
    ImportdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    TreeTableModule,
  DialogModule,
    FileUploadModule,
    
    MatDialogModule,
    SignaturePadModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    MatExpansionModule
    
  ],
  providers: [FilterService, TTEditableColumn, TTScrollableView, TreeTable, MessageService, PrimeNGConfig, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ImportdialogComponent]

})
export class AppModule { }
