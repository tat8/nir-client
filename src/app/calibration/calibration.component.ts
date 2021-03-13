import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.scss']
})
export class CalibrationComponent {
  @Input() circlePosition: string = "center";
  @Output() onCalibrate: EventEmitter<any> = new EventEmitter();

  public centerStyle: string = "";
  public leftStyle: string = "";
  public rightStyle: string = "";
  public bottomStyle: string = "";
  public topStyle: string = "";

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() {

  }

  public onCircleClick() {
    this.onCalibrate.emit();
  }

  @HostListener('window:resize', ['$event'])
  private getScreenSize(event?: any) {
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    var circleWidth = 60;
    var sharedStyle = `width: ${circleWidth}px; cursor: pointer;`
    this.centerStyle = `${sharedStyle} margin-top: ${screenHeight / 2 - circleWidth / 2}px; margin-left: ${screenWidth / 2 - circleWidth / 2}px`;
    this.topStyle = `${sharedStyle} margin-top: 0; margin-left: ${screenWidth / 2 - circleWidth / 2}px`;
    this.rightStyle = `${sharedStyle} margin-top: ${screenHeight / 2 - circleWidth / 2}px; margin-left: ${screenWidth - circleWidth}px`;
    this.bottomStyle = `${sharedStyle} margin-top: ${screenHeight - circleWidth - 5}px; margin-left: ${screenWidth / 2 - circleWidth / 2}px`;
    this.leftStyle = `${sharedStyle} margin-top: ${screenHeight / 2 - circleWidth / 2}px; margin-left: 0`;
  }
}
