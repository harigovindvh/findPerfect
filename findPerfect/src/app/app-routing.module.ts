import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren:
        ()=> import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'perfectshoe',
        loadChildren:
        ()=> import('./perfect-shoe-module/perfect-shoe-module.module').then(m => m.PerfectShoeModuleModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
