import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public labelPicker: string = "default";

  constructor() { }

  ngOnInit(): void {
  }

}
