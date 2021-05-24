import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, ObjectUnsubscribedError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatainteractionService {

  private datapass = new BehaviorSubject<any>(null);
  private datatotal = new BehaviorSubject<any>(null);
  private datafeature = new BehaviorSubject<Array<any>>(null);
  private treenodePhase = new BehaviorSubject<TreeNode>(null);
  private treenodeWet = new BehaviorSubject<TreeNode>(null);
  private additionalWet = new BehaviorSubject<TreeNode[]>(null);
  private additionalPhase = new BehaviorSubject<TreeNode[]>(null);

  private maintreedata = new BehaviorSubject<TreeNode[]>(null);

  constructor() { }

  /* loadmaintree(data: TreeNode[]){
    
    //localStorage.setItem('maintree', JSON.stringify(data));
    this.maintreedata.next(data);
  }

  getmaintree(): Observable<TreeNode[]>{
    //this.maintreedata = JSON.parse(localStorage.getItem('maintree'));
    return this.maintreedata.asObservable();
  } */

  loadmaintree(data: TreeNode[]){
    
    localStorage.setItem('maintree', JSON.stringify(data));
    
  }

  getmaintree(){
    return JSON.parse(localStorage.getItem('maintree'));
    //return this.maintreedata.asObservable();
  }

  loadPhase(data: TreeNode){
    this.treenodePhase.next(data);
  }

  getPhase(): Observable<TreeNode>{
    return this.treenodePhase.asObservable();
  }
  loadWet(data: TreeNode){
    this.treenodeWet.next(data);
  }

  getWet(): Observable<TreeNode>{
    return this.treenodeWet.asObservable();
  }

  loadPhaseAdd(data: TreeNode[]){
    this.additionalPhase.next(data);
  }

  getPhaseAdd(): Observable<TreeNode[]>{
    return this.additionalPhase.asObservable();
  }
  loadWetAdd(data: TreeNode[]){
    this.additionalWet.next(data);
  }

  getWetAdd(): Observable<TreeNode[]>{
    return this.additionalWet.asObservable();
  }

  loadData(data: any){
    this.datapass.next(data);
  }

  getData(): Observable<any>{
    return this.datapass.asObservable();
  }

  loadtotal(data: any){
    this.datatotal.next(data);
  }

  gettotal(): Observable<any>{
    return this.datatotal.asObservable();
  }

  loadFeature(data: Array<any>){
    this.datafeature.next(data);
  }

  getFeature(): Observable<Array<any>>{
    return this.datafeature.asObservable();
  }
}
