import { Injectable } from '@angular/core';
import 'firebase/compat/firestore'

import * as config from '../../firebaseconfig.js'
import {getStorage, ref} from "firebase/storage";
import {initializeApp} from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  firebaseApplication;

  constructor() {
    this.firebaseApplication = initializeApp(config.firebaseConfig);
    getStorage(this.firebaseApplication);
  }



}
