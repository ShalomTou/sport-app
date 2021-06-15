import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptHttpClientModule, NativeScriptModule,NativeScriptFormsModule} from '@nativescript/angular'
import { CommonModule } from '@angular/common';
import { NativeScriptMaterialBottomNavigationModule } from "@nativescript-community/ui-material-bottom-navigation/angular";
import {TNSCheckBoxModule} from '@nstudio/nativescript-checkbox/angular'


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'


import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/tabs/home/home.component';
import { TabsComponent } from './screens/tabs/tabs.component';
import { ProfileComponent } from './screens/tabs/profile/profile.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [TNSCheckBoxModule,NativeScriptModule, AppRoutingModule,NativeScriptFormsModule,NativeScriptHttpClientModule,CommonModule,NativeScriptMaterialBottomNavigationModule,],
  declarations: [AppComponent, LoginComponent, HomeComponent, TabsComponent, ProfileComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
