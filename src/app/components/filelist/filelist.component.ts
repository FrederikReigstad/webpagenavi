import {Component, Input, OnInit} from "@angular/core";
import {StorageReference} from "firebase/storage";

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  @Input() files!: any[]
  @Input() deleteFileFromList!: (args: any) => void;
  @Input() canSelect: boolean = false;
  selectedFilesList: any[] = [];
  selectedFiles: any;
  constructor() {
    this.selectedFilesList = [];
  }

  ngOnInit(): void {

  }



  removeItem(name) {
    if (this.deleteFileFromList != undefined){
      this.deleteFileFromList(name);
    }
  }

  clickedFiles($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;


    this.files = this.files.map((f) =>{
      if (f.id ===id){
        f.select = isChecked;
        return f;
      }
      return f;
    });
    console.log(id,isChecked)

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

}
