import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main-component/app.component';

import { VideoSaverComponent } from './video-saver/video-saver.component';
import { WelcomerComponent } from './welcomer/welcomer.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { TaskComponent } from './task/task.component';
import { TaskNewComponent } from './task-new/task-new.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoSaverComponent,
    WelcomerComponent,
    CalibrationComponent,
    TaskComponent,
    TaskNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
