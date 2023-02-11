import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  
  {
    path: 'home',
   
    loadChildren: () =>
      import('./components/core/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: 'testing', loadChildren: () => import('./testing/testing.module').then(m => m.TestingModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
