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
  public labelPicker: string;
  public user = new User();


  constructor(public page: Page, public router: Router, private userService: UserService) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {}

  loginToAccount() {
    firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(result => {
        console.log(JSON.stringify(result))
        alert({title: `Login Success`,message: result.email,okButtonText: "OK"})
        this.router.navigate(["/tabs"]);
      })
      .catch(error => {
        console.log(error)
        alert({title: `Login Failed`,message: error,okButtonText: "OK"})
      });
  }

  forgotPassword() {
    firebase
      .sendPasswordResetEmail(this.user.email)
      .then(() => {
        console.log("Password reset email sent".toUpperCase())
        alert({title: `Password reset email sent`,message: `Check your email.`,okButtonText: "OK"})
        this.goBackLogin()
      })
      .catch(error => {
        console.log("Error sending password reset email: ".toUpperCase() + error)
        alert({title: `Error sending password reset email`,message: error,okButtonText: "OK"})
      });
  }

  createUser() {
    if (!this.user.password || !this.user.email || this.user.password !== this.user.check_password) {
      throw alert({title: `Error creating account`,message: `Something went wrong ,enter details again`,okButtonText: "OK"})
    }
    firebase
      .createUser({
        email: this.user.email,
        password: this.user.password
      }).then(result => {
        console.log(`Client Created `.toUpperCase())
        console.log(result)
        this.user.user_uid = result.uid;
        const usersCollection = firestore.collection("users");
        usersCollection.doc(this.user.user_uid).set({user: this.user});
        alert({title: `User Created`,message: `Login with your credentials`,okButtonText: "OK"})
        this.goBackLogin()
      })
      .catch(err => {
        console.log(`An error occured`, err)
        alert({title: `Error creating account`,message: err,okButtonText: "OK" })
      })
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

// async poopoo() {
//   console.log(`BLOB`)
//   let usersCollection = firestore.collection('users')
//   usersCollection.doc('yqBwCCZ2VEZS2oMZ9jS4SzHzZiC2').set({
//     user_img: `string`,
//     email: `string`,
//     password: `string`,
//     check_password: `string`,
//     user_birthdate: new Date(),
//     user_city: `string`,
//     user_first_name: `string`,
//     user_last_name: `string`,
//     user_gender: `string`,
//     user_uid: `string`,
//     user_username: `string`,
//     user_distance: 4,
//     user_status: true,
//   });
//   console.log(`collection`, )
// }
