import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RoutingModule } from './modules/routing/routing.module';
import { LoadingComponent } from './components/loading/loading.component';
import { AddComponent } from './pages/add/add.component';
import { BtnBackDashboardComponent } from './components/btn-back-dashboard/btn-back-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailsComponent,
    PageNotFoundComponent,
    LoadingComponent,
    AddComponent,
    BtnBackDashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
