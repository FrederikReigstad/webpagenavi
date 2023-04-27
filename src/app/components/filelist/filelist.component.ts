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

  async showDateOfFiles(file) {
    for (let i = 0; i < this.selectedFilesList.length; i++) {
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
        })

    }

  }
}
