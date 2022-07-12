import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { FileListComponent } from './file-list/file-list.component';
import { FileEditComponent } from './file-edit/file-edit.component';
import { FileViewComponent } from './file-view/file-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TreeModule} from '@circlon/angular-tree-component';
import {NgxIframeMessengerModule} from 'ngx-iframe-messenger';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    FileEditComponent,
    FileViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatTabsModule,
    TreeModule,
    NgxIframeMessengerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
