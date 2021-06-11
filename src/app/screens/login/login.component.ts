import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "@nativescript/core/ui/page";
import { firebase ,firestore} from "@nativescript/firebase";
import { User, UserService } from "../../services/user.service";





@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public appName = `LETS PLAY`
  public labelPicker:string;
  public user = new User();
  currentUserFullDetails:Object;


  constructor( public page: Page,public router: Router,private userService: UserService) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

  async poopoo(){
    console.log(`BLOB`)
    let usersCollection = firestore.collection('users')
    usersCollection.doc('yqBwCCZ2VEZS2oMZ9jS4SzHzZiC2').set({
      user_img: `string`,
      email: `string`,
      password: `string`,
      check_password: `string`,
      user_birthdate: new Date(),
      user_city: `string`,
      user_first_name: `string`,
      user_last_name: `string`,
      user_gender: `string`,
      user_uid: `string`,
      user_username: `string`,
      user_distance: 4,
      user_status: true,
    });
    console.log(`collection`, )
  }

  loginToAccount(){
    console.log(`loginToAccount()`)
    console.log(this.user.email,this.user.password)
    firebase.login(
      {
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(result => this.currentUserFullDetails = JSON.stringify(result))
      .catch(error => console.log(error));
      console.log(this.currentUserFullDetails)
  }

  forgotPassword() {
    console.log(`forgotPassword()`)
    firebase
    .sendPasswordResetEmail(this.user.email)
      .then(() => {
        console.log("Password reset email sent".toUpperCase())})
      .catch(error => console.log("Error sending password reset email: ".toUpperCase() + error));
  }

  createUser() {
    if (this.user.password && this.user.password === this.user.check_password) {
      firebase
        .createUser({
          email: this.user.email,
          password: this.user.password
        })
        .then(result => {
          console.log("User created: ".toUpperCase() , result);
          this.user.user_uid = result.uid;
          const usersCollection = firestore
            .collection("users");
          usersCollection.doc(this.user.user_uid).set(this.user);
          this.goBackLogin();
        })
        .catch(error => console.log(error));
    }
    console.log(this.user.email);
  }

  showForgotPass() {
    this.labelPicker = "forgot_password";
  }

  goBackLogin() {
    this.labelPicker = "login";
  }

  showRegister() {
    this.labelPicker = "register";
  }

}
