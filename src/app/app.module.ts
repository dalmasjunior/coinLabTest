import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrokerComponent } from './broker/broker.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [{
  path: 'brokers',
  component: BrokerComponent,
  data: {}
  },
  {
    path: '',
    redirectTo: '/brokers',
    pathMatch: 'full'
  }];

@NgModule({
  declarations: [
    AppComponent,
    BrokerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
