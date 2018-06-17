import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DetailsComponent } from '../../pages/details/details.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';
import { AddComponent } from '../../pages/add/add.component';



const appRoutes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: AddComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}
