import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MediaComponent } from './media/media.component';
import { TestComponent } from './test/test.component';
import { MediaListComponent } from './media-list/media-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaComponent,
    TestComponent,
    MediaListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
