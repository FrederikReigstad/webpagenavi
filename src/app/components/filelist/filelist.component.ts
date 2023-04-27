import {Component, Input, OnInit} from "@angular/core";
import { HttpClient} from "@angular/common/http";
import {getDownloadURL, getStorage, ref, StorageReference} from "firebase/storage";
import {storage} from "../../../../firebaseconfig";
import * as url from "url";

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {
  @Input() file!: any;
  @Input() files!: any[];
  @Input() deleteFileFromList!: (args: any) => void;
  @Input() canSelect: boolean = false;
  @Input() url: string = "";
  storage = getStorage();
  selectedFilesList: any[] = [];
  urlList: any[] = [];
  selectedFiles: any;



  constructor(private _http:HttpClient) {
    this.selectedFilesList = [];
  }

  ngOnInit(): void {

  }


  removeItem(name) {
    if (this.deleteFileFromList != undefined) {
      this.deleteFileFromList(name);
    }
  }

  clickedFiles(file) {
    if (!this.selectedFilesList.find(f => f.name === file.name)) {
      this.selectedFilesList.push(file)
      console.log(this.selectedFilesList)

    } else if (this.selectedFilesList.find(f => f.name === file.name)) {
      this.selectedFilesList = this.selectedFilesList.filter(f => f.name != file.name)
      console.log(this.selectedFilesList)

    }

    /*if (selectedFile.checked) {
      this.selectedFilesList.push(selectedFile.name);
      console.log("selected files", this.selectedFilesList);
    }*/
    /* for (selectedFiles in this.files){
      this.selectedFilesList = selectedFiles.push(selectedFiles.name);
      console.log(selectedFiles);
      if(selectedFiles == null){
        selectedFiles = [];
      }
    }*/
  }

  async showDateOfFileText1(file) {
    const file1Textarea = document.getElementById("file1") as HTMLTextAreaElement;
    file1Textarea.value = 'This is the text that will be displayed in the textarea.';

    for (let i = 0; i < this.selectedFilesList.length; i++) {
      const file = this.selectedFilesList[i];
      console.log("before",file)
      const storageRef = ref(this.storage, 'navFolder/' + file.name);
      const url = await getDownloadURL(storageRef);
      console.log('File URL:', url);
      this.url = url;
      this.urlList.push(url,"?alt=media");
      this._http.get(url, {responseType: "text"}).subscribe(
        (res) => {
          console.log(res)
          this.urlList.pop();
          console.log("After",file.name)

          const file1Textarea = document.getElementById("file1") as HTMLTextAreaElement;
          file1Textarea.value = res;
          console.log("file1",file1Textarea);
        })

    }

  }

  async showDateOfFileText2(file) {
    const file2Textarea = document.getElementById("file2") as HTMLTextAreaElement;
    file2Textarea.value = 'This is the text that will be displayed in the textarea.';

    for (let i = 0; i < this.selectedFilesList.length; i++) {
      const file = this.selectedFilesList[i];
      console.log("before",file)
      const storageRef = ref(this.storage, 'navFolder/' + file.name);
      const url = await getDownloadURL(storageRef);
      console.log('File URL:', url);
      this.url = url;
      this.urlList.push(url,"?alt=media");
      this._http.get(url, {responseType: "text"}).subscribe(
        (res) => {
          console.log(res)
          this.urlList.pop();
          console.log("After",file.name)

          const file2Textarea = document.getElementById("file2") as HTMLTextAreaElement;
          file2Textarea.value = res;
          console.log("file2",file2Textarea);
        })

    }
  }

  clearTextarea1() {
    const file1Textarea = document.getElementById('file1') as HTMLTextAreaElement;
    file1Textarea.value = '';
  }

  clearTextarea2() {
    const file2Textarea = document.getElementById('file2') as HTMLTextAreaElement;
    file2Textarea.value = '';
  }
}
