import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { LoginComponent } from './screens/login/login.component'
import { HomeComponent } from './screens/tabs/home/home.component'
import { TabsComponent } from './screens/tabs/tabs.component'
import { ProfileComponent } from './screens/tabs/profile/profile.component'


const targetRouter = 'login'
const routes: Routes = [
  { path: '', redirectTo: targetRouter, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },


]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
