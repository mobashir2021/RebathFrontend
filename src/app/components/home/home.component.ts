import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { DatainteractionService } from 'src/app/datainteraction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private router: Router, private http: HttpClient, private shared: DatainteractionService) { }

  ngOnInit() {
    
  }


  salesrep(){
    this.router.navigateByUrl('/customerinfo');
  }

}
