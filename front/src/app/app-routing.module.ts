import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './features/topics/components/list/list.component';
import { LoginComponent } from './features/auth/components/login/login.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {
    path:'topics',
    component: ListComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  { path: '',
    component: HomeComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
