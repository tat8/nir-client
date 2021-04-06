import { Component, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() experimentId: any = 0;
  @Input() experimentNumber: any = "1";
  @Input() baseAPI: string = "";
  @Output() onTaskFinished: EventEmitter<any> = new EventEmitter();

  public questions: Array<{ question: string, answers: Array<string>, key: number }> = [];
  public participantAnswers: Array<number> = [];
  public currentQuestion = 0;
  public showResults: boolean = false;
  public rightAnswersCount: number = 0;

  constructor(private httpClient: HttpClient, private cdRef: ChangeDetectorRef, private toasterService: ToasterService) {
  }

  ngOnInit() {
    
  }

}
