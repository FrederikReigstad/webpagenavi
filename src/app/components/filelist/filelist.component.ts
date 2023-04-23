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
  constructor() {
  }

  ngOnInit(): void {

  }



  removeItem(name) {
    if (this.deleteFileFromList != undefined){
      this.deleteFileFromList(name);
    }
  }
}
