import { MessageService, TreeNode } from 'primeng/api';
import { TemplatechooseComponent } from './../templatechoose/templatechoose.component';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import {FileUpload} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
//import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-importdialog',
  templateUrl: './importdialog.component.html',
  styleUrls: ['./importdialog.component.css']
})
export class ImportdialogComponent implements OnInit {
  uploadedFiles: any[] = [];

  treestruct : TreeNode[];
  @ViewChild('fileInput', { static: false }) fileInput: FileUpload; 

  constructor(private dialog: MatDialog,private dialogRef : MatDialogRef<ImportdialogComponent>, @Inject(MAT_DIALOG_DATA) data,
  private messageService: MessageService) {
    
      //this.treestruct = data.treestruct;
    
   }

  ngOnInit() {
  }

  onUpload(event) {
    console.log(event);
    for(let file of event.files) {
        console.log(file);
        this.uploadedFiles.push(file);
    }

    //this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  onNoClick(){
    this.dialogRef.close();
  }

}
