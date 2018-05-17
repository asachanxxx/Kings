import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsmainComponent } from './buildingsmain/buildingsmain.component';

@NgModule({
  imports: [
    CommonModule,
    BuildingsRoutingModule
  ],
  declarations: [BuildingsmainComponent]
})
export class BuildingsModule { }
