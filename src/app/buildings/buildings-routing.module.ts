import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingsmainComponent } from '../buildings/buildingsmain/buildingsmain.component';

const routes: Routes = [
  {
    path:'',
    component:BuildingsmainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
