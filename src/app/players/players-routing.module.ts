import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayermainComponent } from '../players/playermain/playermain.component';


const routes: Routes = [
  {
    path:'',
    component:PlayermainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
