import {Component,OnInit} from '@angular/core';
import {firebase,firestore} from '@nativescript/firebase'
import {User} from '../../../services/user.service'

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public viewToggle:string="view2"
  x:boolean = false
  public currentUserDoc = new User()
  public userEmailAndId


  constructor() {}

  async ngOnInit(){
    this.currentUserDoc = await this.fetchUser()
    console.log(`DOC`,this.currentUserDoc)
    console.log(`UserEmailAndId`,this.userEmailAndId)
  }

  async fetchUser() {
    this.userEmailAndId = await firebase.getCurrentUser()
    return (await firestore.collection(`users`).doc(this.userEmailAndId.uid).get()).data()
  }

  toggleView(){
    this.x = !this.x
    this.x?this.viewToggle = 'view1':this.viewToggle = 'view2'
    console.log(this.x,this.viewToggle)
  }
}

// Importat for profile updates
// Gender / distance /
