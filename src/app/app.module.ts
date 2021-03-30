import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule } from 'angular2-toaster';
import { KatexModule } from 'ng-katex';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main-component/app.component';

import { VideoSaverComponent } from './video-saver/video-saver.component';
import { WelcomerComponent } from './welcomer/welcomer.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { TaskComponent } from './task/task.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { TaskNew2Component } from './task-new-2/task-new-2.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoSaverComponent,
    WelcomerComponent,
    CalibrationComponent,
    TaskComponent,
    TaskNewComponent,
    TaskNew2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
