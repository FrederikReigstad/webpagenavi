import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  @Input() files!: File[]
  @Input() deleteFileFromList!: (args: any) => void;
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
