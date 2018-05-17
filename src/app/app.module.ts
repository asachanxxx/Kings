import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainRouterModule } from 'src/app/app.routing';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MainRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
