import { OnInit } from '@angular/core';
import { Component } from '@angular/core'
import { firebase } from "@nativescript/firebase";


@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.init({
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done".toUpperCase());
      },
      error => {
        console.log(`firebase.init error: ${error}`.toUpperCase());
      }
    );
  }
}
