import {
  ViewContainerRef
} from '@angular/core';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalDialogService
} from '@nativescript/angular';
import {
  Page
} from "@nativescript/core/ui/page";
import {
  firestore,
  firebase
} from "@nativescript/firebase";
import {
  FeedInterface
} from "../home/feed-interface"
import {
  prompt,
  PromptResult,
} from "tns-core-modules/ui/dialogs";
import {
  DatePicker
} from 'tns-core-modules';


@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public feedList = []
  public context
  public title
  public currentUser
  public minDate: Date = new Date(1975, 0, 29);
  public maxDate: Date = new Date(2045, 4, 12);
  public time
  public birthdatePicker = false;

  constructor(public page: Page, private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
    page.actionBarHidden = true;
  }

  async ngOnInit() {
    this.loadFeed()
    this.currentUser = await firebase.getCurrentUser()
    console.log(`this.currentUser`, this.currentUser)
  }

  loadFeed() {
    console.log(`loadFeed()`)
    firestore.collection(`posts`).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data()
          console.log(doc.id, '=>', data);
          this.feedList.unshift({
            id: +data.id,
            title: data.title,
            context: data.context,
            email: data.email,
            image: data.image,
            time: this.timeFormater(data.time)
          })
          this.feedList.sort((a: any, b: any) => b - a)
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  timeFormater(d) {
    const year = d.getFullYear() // 2019
    const date = d.getDate()
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ]
    const monthName = months[d.getMonth()]
    const formatted = `${days[d.getDay()]}, ${date} ${months[d.getMonth()]} ${year}`
    console.log(`=====================`,formatted)
    return formatted

  }

  addPost() {
    console.log(`addPost()`.toUpperCase())
    let newPost = {
      id: this.currentUser.uid,
      image: `https://img-premium.flaticon.com/png/512/3131/premium/3131446.png?token=exp=1623782402~hmac=f77f580d4a00a99eb3f7858c6af31dbf`,
      title: this.title,
      context: `${this.context}`,
      email: this.currentUser.email,
      time: this.time
    }
    this.feedList.unshift(newPost)
    this.updateCollection(`posts`, newPost)
    this.context = ''
  }

  showImage(item) {
    console.log(item)
    alert({
      title: item.title,
      message: item.context,
      okButtonText: "ok"
    })
  }

  updateCollection(collection, toPost) {
    firestore.collection(collection).add(toPost).then(documentRef => {
      alert({
        message: `Post Added`,
        okButtonText: "OK"
      })
      console.log(`Post Added ${documentRef.id}`);
    }).catch(err => {
      alert({
        message: `Try again`,
        okButtonText: "OK"
      })
      console.log(err)
    })
  }

  onDatePickerLoaded(args) {
    this.time = args.object as DatePicker;
  }


}
