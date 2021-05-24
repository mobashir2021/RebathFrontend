import { ChoosepackagesComponent } from './components/choosepackages/choosepackages.component';
import { AdminwetareasitemsComponent } from './components/adminwetareasitems/adminwetareasitems.component';
import { Adminphase2itemsComponent } from './components/adminphase2items/adminphase2items.component';
import { WetareapackageComponent } from './components/wetareapackage/wetareapackage.component';
import { Phase2itemsComponent } from './components/phase2items/phase2items.component';
import { TemplatechooseComponent } from './components/templatechoose/templatechoose.component';
import { CompleteoverviewComponent } from './components/completeoverview/completeoverview.component';
import { UserComponent } from './components/user/user.component';
import { CustomerinfoComponent } from './components/customerinfo/customerinfo.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'admin', component:AdminComponent},
  {path:'choosetemplate', component:TemplatechooseComponent},
  {path: 'adminhome', component: AdminhomeComponent},
  {path: 'customerinfo', component: CustomerinfoComponent},
  {path: 'customerreq', component: ChoosepackagesComponent},
  {path: 'phase2items', component: Phase2itemsComponent},
  {path: 'wetareas', component: WetareapackageComponent},
  {path: 'adminphase2items', component: Adminphase2itemsComponent},
  {path: 'adminwetareas', component: AdminwetareasitemsComponent},
  {path: 'completeoverview', component: CompleteoverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
