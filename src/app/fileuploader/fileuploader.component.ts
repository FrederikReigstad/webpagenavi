import { Component, OnInit } from '@angular/core';
import {getStorage, ref, uploadBytes} from "firebase/storage";


@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  storage;
  storageRef;
  firebaseApplication;
  files: File[];

  private event;
  private baseUrl = 'gs://navilogic-cd051.appspot.com/navFolder';
  public isUploading: boolean = false;


  ngOnInit(): void {

  }

  constructor() {
    this.files = [];
    this.storage = getStorage();
  }


  public onFileSelected(event: any): void {
    this.event = event;
    const selectedFiles = Object.assign([], event.target.files);
    console.log('selectedFiles',selectedFiles);

    for (const file of selectedFiles) {
      if (!this.files.find(f => f.name === file.name)) { // Check if the file name does not exist in the array
        this.files.push(file);
      }
    }


  }

  async upload() {
    this.isUploading = true;
    // Upload a files in the files list and clear
    const uploadFiles = async () => {
      for (let i = 0; i < this.files.length; i++) {
        let file: File = this.files[i];
        this.storageRef = ref(this.storage, this.baseUrl + '/' + file.name);

        await uploadBytes(this.storageRef, file).then((snapshot) => {
          console.log('Uploaded file', file);
        })

      }
    }
    await uploadFiles().finally(() => {
      this.clearFiles();
      this.isUploading = false;
      console.log("Is done");
    });
  }

  public toggleFileInput() {
    document.getElementById('file-selector')?.click();
  }

  private clearFiles() {
    this.files = [];
    this.event.target.value = '';
  }

  deleteFileFromList(name: string) {
    for (let i = 0; i < this.files.length; i++) {
      let file = this.files[i];
      if (file.name == name) { // Check if the file name does not exist in the array
        this.files.splice(i, 1);
      }
    }
    console.log(this.files);
  }

}
