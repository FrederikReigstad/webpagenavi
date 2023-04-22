import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {getApp} from "@angular/fire/app";
// import firebase from "firebase/compat";
import * as config from '../../firebaseconfig.js'
import {initializeApp} from "firebase/app";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 constructor() {
 }

}
