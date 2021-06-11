import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { LoginComponent } from './screens/login/login.component'


const mainRout = `login`
const routes: Routes = [
  { path: '', redirectTo: `/${mainRout}`, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
