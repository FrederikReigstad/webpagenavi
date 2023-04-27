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
  storage = getStorage();
  selectedFilesList: any[] = [];
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
  url = "https://firebasestorage.googleapis.com/v0/b/navilogic-cd051.appspot.com/o/navFolder%2FNAV%202013R2%20DK%202015-11-07%20Nem%20-%20Objects%20LIVE%20-%20with%20CU12%20and%204%20add-on.txt?alt=media&token=638a3eca-7aa4-45bb-932f-026fb0817fbf?alt=media";
  showDateOfFiles(file: any) {
    const storageRef = ref(this.storage, 'navFolder/' + this.selectedFilesList.filter(f => f.name != file.name));
    this._http.get(this.url,{responseType:"text"}).subscribe(
      (res) => {
        console.log(res)
      }
    )

    for (let i = 0; i < this.selectedFilesList.length; i++) {
      const storageRef = ref(this.storage, 'navFolder/' + this.selectedFilesList.filter(f => f.name != file.name));

      getDownloadURL(ref(storageRef,))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          }
        })
    }
  }
}
