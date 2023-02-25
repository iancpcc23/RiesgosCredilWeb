import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PageNotFoundComponentComponent } from './views/page-not-found-component/page-not-found-component.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"home",
    pathMatch: "full"
  }
  ,{
    path:"login",
    component:LoginComponent
  }
  ,{
    path:"register",
    component:RegisterComponent
  }
  ,{
    path:'home',
    component:HomeComponent
    
  }
  ,{
    path:'**',
   component:PageNotFoundComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
