import {
  Component,
  NgZone,
  OnInit
} from '@angular/core';
import * as geolocation from '@nativescript/geolocation'
import {
  MapView,
  Marker,
  Position
} from "nativescript-google-maps-sdk";
import {
  CoreTypes
} from '@nativescript/core'
import {
  registerElement
} from '@nativescript/angular';
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import { firestore,firebase } from '@nativescript/firebase'



@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public currentUserData


  location = {
    latitude: 32.0525304,
    longitude: 34.7677576
  }

  constructor(private zone: NgZone) {}

  async ngOnInit() {
    this.location = await geolocation.getCurrentLocation({
      maximumAge: 5000,
      timeout: 20000
    })
    this.currentUserData = await  this.fetchUser()
  }

  async fetchUser() {
    let tmp  = await firebase.getCurrentUser()
    return (await firestore.collection(`users`).doc(tmp.uid).get()).data()
  }

  onMapReady = (event) => {
    let mapView = event.object as MapView;

    let NA_CENTER_LATITUDE = this.location.latitude;
    let NA_CENTER_LONGITUDE = this.location.longitude;

    mapView.latitude = NA_CENTER_LATITUDE;
    mapView.longitude = NA_CENTER_LONGITUDE;
    mapView.zoom = 100;

    let coordinates = {
      latitude: NA_CENTER_LATITUDE,
      longitude: NA_CENTER_LONGITUDE
    };

    let newMarker = new Marker();
    newMarker.position = Position.positionFromLatLng(coordinates.latitude, coordinates.longitude);
    newMarker.title = "You Location.";
    newMarker.snippet = "Your here";
    newMarker.color = "#f1f1f1";
    mapView.addMarker(newMarker);
  }

  setCurrentLocation() {
    console.log(this.location.latitude, this.location.longitude)
  }

  async test() {
    let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.location.latitude + "," + this.location.longitude + "&sensor=true"
    let res = await fetch(url)
    console.log(typeof(res))
    console.log(this.currentUserData)
  }

}
