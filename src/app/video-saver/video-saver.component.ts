import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as RecordRTC from 'recordrtc';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-video-saver',
  templateUrl: './video-saver.component.html',
  styleUrls: ['./video-saver.component.scss']
})
export class VideoSaverComponent {
  @Input() experimentId: any = 0;
  @Input() experimentNumber: any = "1";
  @Input() baseAPI: string = "";

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 6000
    });

  public calibrationCirclePosition = "center";
  public calibrationStep = 0;
  public isCalibration = true;

  public calibrationIndex: number = -1;
  public calibrationCoordinates: Array<any> = [];
  public message: string = "";
  public taskNumber = 1;

  private recorder: any = null;
  private recordedChunks: Array<any> = [];
  private videoWidth = 1280;
  private videoHeight = 720;
  private errorOnPrevStep: boolean = false;

  private toasterService: ToasterService;
  constructor(private httpClient: HttpClient, private cdRef: ChangeDetectorRef,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.start();
  }

  public calibrate() {
    this.getPupilPosition();
  }

  public onTaskFinished() {
    this.stop();
  }

  private start() {
    this.httpClient.get(`${this.baseAPI}/init`).subscribe(data => {
      var result = data as JSON;
      this.calibrationIndex = (<any>result).index;
      console.log(data);
      this.initCamera();
    });
  }

  private initCamera() {
    try{
      var browser = <any>navigator;
      this.recordedChunks = [];
      // todo: set video width and height
      browser.mediaDevices.getUserMedia({ video: true, audio: false }).then(async (stream: any) => {
        this.recordedChunks.push(stream);
        this.recorder = new RecordRTC(stream, {
          type: 'video'
        });
  
        this.recorder.startRecording();
      });
    }
    catch{
      this.toasterService.pop('error', "Ошибка", "Не удалось подключиться к камере.");
    }
  }

  private stop() {
    this.recorder.stopRecording((x: any) => {
      let blob = this.recorder.getBlob();
      RecordRTC.invokeSaveAsDialog(blob, `${this.experimentId}-video.avi`);

      this.recordedChunks.forEach((stream: any) => {
        stream.getTracks().forEach((track: any) => track.stop())
      });
    });
  }

  private getPupilPosition() {
    this.recorder.stopRecording((x: any) => {
      this.recorder.getDataURL((x: any) => {

        var data = {
          'index': this.calibrationIndex,
          'dataURL': x,
          'expId': this.experimentId,
          'calibrationStep': this.calibrationStep
        };

        this.httpClient.post(`${this.baseAPI}/calibrate`, data).subscribe(data => {

          console.log(data);
          if ((<any>data).isSuccess) {
            if (this.errorOnPrevStep) {
              this.calibrationStep = 0;
              this.configureCirclePosition();
              this.calibrationCoordinates = [];
            }
            else {
              this.calibrationCoordinates.push([(<any>data).data.left_pupil_x, (<any>data).data.left_pupil_y]);
              this.calibrationStep += 1;
              if (this.calibrationStep == 10) {
                this.finishCalibration();
              }
              else {
                this.configureCirclePosition();
              }
            }

            this.errorOnPrevStep = false;
            this.message = "";
          }
          else {
            this.message = (<any>data).message;
            this.toasterService.pop('error', "Ошибка", "Зрачки не были обнаружены. Попробуйте сделать камеру ближе или измените освещение.");
            console.log(this.message);
            this.errorOnPrevStep = true;
          }

          this.cdRef.detectChanges();

          try{
            this.recordedChunks.forEach((stream: any) => {
              stream.getTracks().forEach((track: any) => track.stop())
            });
          }
          catch{
            this.toasterService.pop('error', "Ошибка", "Не удалось подлючиться к камере.");
          }

          this.initCamera();
        },
          error => {
            this.message = "Error";
            this.toasterService.pop('error', "Ошибка");
            this.errorOnPrevStep = true;
            this.cdRef.detectChanges();

            this.recordedChunks.forEach((stream: any) => {
              stream.getTracks().forEach((track: any) => track.stop())
            });

            this.initCamera();
          });
      });
    });
  }

  private finishCalibration() {
    this.httpClient.post(`${this.baseAPI}/finish`, { 'index': this.calibrationIndex }).subscribe(data => {
      this.calibrationIndex = -1;
      this.calibrationStep = 0;
      this.errorOnPrevStep = false;
      this.isCalibration = false;
    });
  }

  private configureCirclePosition() {
    if (this.calibrationStep == 0 || this.calibrationStep == 5 || this.calibrationStep == 10) {
      this.calibrationCirclePosition = "center";
    }

    if (this.calibrationStep == 1 || this.calibrationStep == 6 || this.calibrationStep == 11) {
      this.calibrationCirclePosition = "top";
    }

    if (this.calibrationStep == 2 || this.calibrationStep == 7 || this.calibrationStep == 12) {
      this.calibrationCirclePosition = "right";
    }

    if (this.calibrationStep == 3 || this.calibrationStep == 8 || this.calibrationStep == 13) {
      this.calibrationCirclePosition = "bottom";
    }

    if (this.calibrationStep == 4 || this.calibrationStep == 9 || this.calibrationStep == 14) {
      this.calibrationCirclePosition = "left";
    }
  }
}
