import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDownloadURL, ref } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.css']
})
export class FileviewComponent implements OnInit {

  @Input() files!: File[];
  storage = getStorage();
  url: string = "";
  file = this.files;

  constructor(private _http: HttpClient) { }

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
}
