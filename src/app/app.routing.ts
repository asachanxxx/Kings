import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path:"player",
        loadChildren:'./players/players.module#PlayersModule'    
    },
    {
        path:"buildings",
        loadChildren:'./buildings/buildings.module#BuildingsModule'    
    },
    {
        path:'',
        redirectTo:'',
        pathMatch:'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRouterModule { }
