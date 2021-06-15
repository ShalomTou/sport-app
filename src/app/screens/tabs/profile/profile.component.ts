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
import {
  TNSCheckBoxModule
} from '@nstudio/nativescript-checkbox/angular'


@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public viewToggle: string = "view1"
  x: boolean = false
  public currentUserDoc: {
    [x: string]: any;distance ? : any;
  }
  public userEmailAndId: firebase.User
  public genders = [`Male`, `Female`, `Transgender`, `Prefere not to answer`]
  public sports = [{
    name: `soccer`,
    selected: false
  }, {
    name: `basketball`,
    selected: false
  }, {
    name: `tennis`,
    selected: false
  }, {
    name: `jogging`,
    selected: false
  }, {
    name: `street-workout`,
    selected: false
  }]

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
    firestore.collection(`users`).doc(docId).set(obj).then(() => {
      alert({
        title: `Saved`,
        message: `Saved`,
        okButtonText: "OK"
      })
    }).catch(err => console.log(err))
  }

  checkSelectedSports() {
    this.currentUserDoc.sports = this.sports.filter(o => o.selected === true)
  }

  public onSelectedIndexChanged(args: {object: ListPicker;}) {
    const picker = < ListPicker > args.object;
    this.currentUserDoc.gender = this.genders[picker.selectedIndex]
  }

  public toggleView() {
    if (this.x) {
      this.viewToggle = 'view1'
      this.checkSelectedSports()
      this.updateDoc(this.userEmailAndId.uid, this.currentUserDoc)
    } else {
      this.viewToggle = 'view2'
    }
    this.x = !this.x
  }

  public onSliderValueChange(args: {
    object: Slider;value: any;
  }) {
    let slider = < Slider > args.object;
    this.currentUserDoc.distance = args.value
  }


}
