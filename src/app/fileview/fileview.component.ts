import {Component, Input, OnInit} from '@angular/core';
import { readFileSync } from 'fs';
import {HttpClient} from '@angular/common/http';
import {getDownloadURL, ref, StorageReference} from 'firebase/storage';
import {getStorage, listAll, ListResult} from 'firebase/storage';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.css']
})
export class FileviewComponent implements OnInit {

  files: StorageReference[] = [];
  storage = getStorage();
  url: string = "";
  file = this.files;
  isLoading : boolean = true;


  constructor(private _http: HttpClient) {
    const listRef = ref(this.storage, 'gs://navilogic-cd051.appspot.com/navFolder');

    listAll(listRef)
      .then((listResult) => {
        // Log the prefixes (subdirectories) in the bucket
        console.log('Subdirectories:', listResult.prefixes);

        // Log the items (files) in the bucket
        console.log('Files:', listResult.items);
        listResult.items.forEach((item) => {
          this.files.push(item);
        })
      })
      .catch((error) => {
        console.error('Error listing files:', error);
      }).finally(() => {
        this.isLoading = false;
      });


  }


  ngOnInit(): void {
  }

  async readFileFromFirebase(file: File) {
    const storageRef = ref(this.storage, 'navFolder/' + file.name);
    const url = await getDownloadURL(storageRef);
    console.log('File URL:', url);
    this.url = url;
  }

  clearUrl() {
    this.url = "";
  }

  deleteFileFromList(name: string) {
    // To-do find out how to delete file from firebase
    for (let i = 0; i < this.files.length; i++) {
      let file = this.files[i];
      if (file.name == name) { // Check if the file name does not exist in the array
        this.files.splice(i, 1);
      }
    }
  }


  compareFiles() {

  }
}
