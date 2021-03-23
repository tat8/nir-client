import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./task-new.component.scss']
})
export class TaskNewComponent {

  public resultText: string = "";
  constructor() {
  }

  ngOnInit() {
  }

}
