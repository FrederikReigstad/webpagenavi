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
import { FileviewComponent } from './fileview/fileview.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from "@angular/material/checkbox";

const routes: Routes = [
  {
    path: 'upload', component: FileuploaderComponent,
  },
  {
    path: '', component: FileviewComponent,
  }
]

@NgModule({
  declarations: [
    AppComponent,
    FileuploaderComponent,
    FilelistComponent,
    FileviewComponent
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
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    MatCheckboxModule,
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
