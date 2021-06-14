import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventData,
  ListPicker,
  Slider
} from '@nativescript/core';
import {
  firebase,
  firestore
} from '@nativescript/firebase'
import {
  User
} from '../../../services/user.service'

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public viewToggle: string = "view1"
  x: boolean = false
  public currentUserDoc: {[x: string]: any;distance ? : any;}
  public userEmailAndId: firebase.User
  public genders = [`Male`, `Female`, `Transgender`, `Prefere not to answer`]


  constructor() {}

  async ngOnInit() {
    this.currentUserDoc = await this.fetchUser()
    console.log(`DOC`, this.currentUserDoc)
    console.log(`UserEmailAndId`, this.userEmailAndId)
  }

  async fetchUser() {
    this.userEmailAndId = await firebase.getCurrentUser()
    return (await firestore.collection(`users`).doc(this.userEmailAndId.uid).get()).data()
  }

  updateDoc(docId: string, obj) {
    console.log(obj)
    firestore.collection(`users`).doc(docId).set(obj).then(()=>{
      alert({title: `Saved`,message: `Saved`,okButtonText: "OK"})
    }).catch(err => console.log(err))
  }

  public onSelectedIndexChanged(args: { object: ListPicker; }) {
    const picker = < ListPicker > args.object;
    this.currentUserDoc.gender = this.genders[picker.selectedIndex]
  }

  public toggleView() {
    if (this.x) {
      this.viewToggle = 'view1'
      this.updateDoc(this.userEmailAndId.uid, this.currentUserDoc)
    } else {
      this.viewToggle = 'view2'
    }
    this.x = !this.x
  }

  public onSliderValueChange(args: { object: Slider; value: any; }) {
    let slider = < Slider > args.object;
    this.currentUserDoc.distance = args.value
  }

}
