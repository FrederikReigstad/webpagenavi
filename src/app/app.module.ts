import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FireService} from "./fire.service";
import {MatBadgeModule} from "@angular/material/badge";
import {MatListModule} from "@angular/material/list";
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {FilelistComponent} from "./components/filelist/filelist.component";

const routes: Routes = [
  {
    path: '', component: FileuploaderComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FileuploaderComponent,
    FilelistComponent,
    FilelistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatToolbarModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    let fireService = new FireService();
  }
}
