import {ViewContainerRef} from '@angular/core';
import {Component,OnInit} from '@angular/core';
import {ModalDialogService} from '@nativescript/angular';
import {Page} from "@nativescript/core/ui/page";
import {firestore,firebase} from "@nativescript/firebase";
import {FeedInterface} from "../home/feed-interface"


@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public feedList: Array < FeedInterface > = []
  public context

  constructor(public page: Page, private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.loadFeed()
  }

  loadFeed() {
    console.log(`loadFeed()`)
    firestore.collection(`posts`).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data()
          console.log(doc.id, '=>', data);
          this.feedList.push({
            id: +data.user_id,
            image: data.imageURL.toString(),
            context: data.title
          })
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  expendPost(item) {
    console.log(item)
  }

  addPost() {
    console.log(`addPost()`.toUpperCase())
    let newPost = {
      id: Math.floor(Math.random() * 10),
      image: `adasd`,
      context: `New ${this.context}`
    }
    this.feedList.push(newPost)
    this.updateCollection(`posts`, newPost)
    // clean text input
  }

  updateCollection(collection, toPost) {
    firestore.collection(collection).add({
      imageURL: toPost.image,
      title: toPost.context,
      user_id: toPost.id
    }).then(documentRef => {
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

  

}
