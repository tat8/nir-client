import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcomer',
  templateUrl: './welcomer.component.html',
  styleUrls: ['./welcomer.component.scss']
})
export class WelcomerComponent {

  public participantAge: any = null;
  public participantGender: any = null;
  public experimentNumber: any = "1";

  @Output() onStart: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public onSubmit(){
    var event = {
      'participantAge': this.participantAge,
      'participantGender': this.participantGender,
      'experimentNumber': this.experimentNumber
    };

    this.onStart.emit(event);
  }
}
