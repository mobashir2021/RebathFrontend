import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { DatainteractionService } from './datainteraction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  treestructLoad : TreeNode[];
  responseData: any;
  readonly rootURL = "https://rebathnodeapp21.azurewebsites.net/template";

  constructor(private router: Router, private http: HttpClient, private shared: DatainteractionService) { }

  ngOnInit(): void {
    console.log('appcomponent');

    const promise = this.http.get(this.rootURL).toPromise();
    


    this.http.get(this.rootURL).subscribe(
      res => {
        var itemstest = JSON.stringify(res);
        var tempconsole = JSON.parse(itemstest);

        this.treestructLoad = <TreeNode[]>tempconsole;
        this.shared.loadmaintree(this.treestructLoad);
        console.log(this.treestructLoad);

        

        
        
        
      },
      err => {
        console.log(err);
      }); 
  }
  title = 'Rebath';
}
