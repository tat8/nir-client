import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ace from "ace-builds";
import { ToasterService } from 'angular2-toaster';

@Component({
    selector: 'app-task-new-2',
    templateUrl: './task-new-2.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./task-new-2.component.scss']
})
export class TaskNew2Component {
    @Input() experimentId: any = 0;
    @Input() baseAPI: string = "";

    @Output() onTaskFinished: EventEmitter<any> = new EventEmitter();

    public showTasks: boolean = true;
    public showTask1: boolean = true;
    public showTask2: boolean = false;
    public showTask3: boolean = false;

    public firstTask: boolean = true;
    public secondTask: boolean = false;
    public firstTaskNumber = "1";
    public secondTaskNumber = "2";

    public surveyAnswer: string = "";

    public participantAnswerFirst: string = "";
    public participantAnswerSecond: string = "";

    //public equation: string = '\\sum_{i=1}^nx_i';

    @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined;

    constructor(private httpClient: HttpClient, private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.setTask();
        this.firstTask = true;
        this.secondTask = false;
    }

    ngAfterViewInit(): void {
        if (this.editor != null) {
            ace.config.set("fontSize", "28px");
            ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
            const aceEditor = ace.edit(this.editor.nativeElement);
            if (this.showTask1) {
                this.setTask1();
            }

            if (this.showTask2) {
                this.setTask2();
            }

            if (this.showTask3) {
                this.setTask3();
            }

            aceEditor.session.setMode("ace/mode/python");
            aceEditor.commands.on("exec", function (e: any) {
                var rowCol = aceEditor.selection.getCursor();
                if ((rowCol.row == 0) || ((rowCol.row + 1) == aceEditor.session.getLength())) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }

    }

    public onSendAnswerClick() {
        if (this.secondTask) {
            this.showTasks = false;
            this.onTaskFinished.emit();
            return;
        }

        this.setTask(true);

        if (this.showTask1) {
            this.setTask1();
        }

        if (this.showTask2) {
            this.setTask2();
        }

        if (this.showTask3) {
            this.setTask3();
        }


        this.firstTask = false;
        this.secondTask = true;
    }

    public onSendSurveyClick() {
        this.sendAnswers();
    }

    private sendAnswers() {
        var participantAnswers = [this.participantAnswerFirst, this.participantAnswerSecond, this.surveyAnswer];
        var data = {
            "answers": participantAnswers,
            "task1Number": this.firstTaskNumber,
            "task2Number": this.secondTaskNumber,
            "expId": this.experimentId
        };

        this.httpClient.post(`${this.baseAPI}/saveAnswers`, data).subscribe(
            x => {
                this.toasterService.pop('success', "Ответы сохранены", "Спасибо за участие!");
            },
            error => {
                this.toasterService.pop('error', "Ошибка", "Не удалось сохранить результат");
            }
        );
    }

    private setTask(isSecond: boolean = false) {
        var randomTask = 1;
        if (isSecond) {
            if (this.showTask1 || this.showTask3) {
                randomTask = 2;
            }
            else {
                randomTask = Math.floor((Math.random() * 100 / 50) + 1);
                if (randomTask >= 2) {
                    randomTask = 3;
                }
            }
        }
        else {
            randomTask = Math.floor((Math.random() * 100 / 33) + 1);
        }

        if (randomTask > 3) {
            randomTask = 3;
        }

        if (randomTask < 1) {
            randomTask = 1;
        }

        if (randomTask == 1) {
            if (this.showTask1) {
                randomTask = 2;
            }
            else {
                this.showTask1 = true;
                this.showTask2 = false;
                this.showTask3 = false;
            }
        }

        if (randomTask == 2) {
            if (this.showTask2) {
                randomTask = 3;
            }
            else {
                this.setTask2();
                this.showTask1 = false;
                this.showTask2 = true;
                this.showTask3 = false;
            }
        }

        if (randomTask == 3) {
            this.showTask1 = false;
            this.showTask2 = false;
            this.showTask3 = true;
        }

        if (isSecond) {
            this.secondTaskNumber = randomTask.toString();
        }
        else {
            this.firstTaskNumber = randomTask.toString();
        }
    }

    private setTask1() {
        if (this.editor != null) {
            const aceEditor = ace.edit(this.editor.nativeElement);
            aceEditor.session.setValue('int main() { \r\n' +
                '   float a, b, x; \r\n' +
                '   scanf("%f%f", &a, &b); \r\n' +
                ' \r\n' +
                '   if(b == 0) \r\n' +
                '   { \r\n' +
                '       printf("Нет решения"); \r\n' +
                '       return 0; \r\n' +
                '   } \r\n' +
                ' \r\n' +
                '   x = 0; \r\n' +
                '   p1 = a * a; \r\n' +
                '   float p1, p2, p3, s1; \r\n' +
                '   p2 = 5 * a * b; \r\n' +
                '   p1 = p1 * p2; \r\n' +
                '   p2 = p2 - p3; \r\n' +
                '   p3 = (b + 5) / b; \r\n' +
                '   x = p1; \r\n' +
                ' \r\n' +
                '   printf("%f", x); \r\n' +
                '   return 0; \r\n' +
                '}'
            );
        }
    }

    private setTask2() {
        if (this.editor != null) {
            const aceEditor = ace.edit(this.editor.nativeElement);
            aceEditor.session.setValue('int main() { \r\n' +
                '   float a, b, x; \r\n' +
                '   scanf("%f%f", &a, &b); \r\n' +
                ' \r\n' +
                '   if(a == 0 || b == 0) \r\n' +
                '   { \r\n' +
                '       printf("Нет решения"); \r\n' +
                '       printf("%f", x); \r\n' +
                '   } \r\n' +
                ' \r\n' +
                '   float p1, p2, p3, s1; \r\n' +
                '   p1 = 10 * a; \r\n' +
                '   p2 = 5 * b * b + a; \r\n' +
                '   p3 = a * b; \r\n' +
                '   p1 = p1 - p2; \r\n' +
                '   p2 = p2 / p3; \r\n' +
                '   x = p1; \r\n' +
                ' \r\n' +
                '   return 0; \r\n' +
                '   return 0; \r\n' +
                '}'
            );
        }
    }

    private setTask3() {
        if (this.editor != null) {
            const aceEditor = ace.edit(this.editor.nativeElement);
            aceEditor.session.setValue('int main() { \r\n' +
                '   float a, b, x; \r\n' +
                '   scanf("%f%f", &a, &b); \r\n' +
                ' \r\n' +
                '   if(a == 0) { \r\n' +
                '       printf("Нет решения"); \r\n' +
                '       return 0; \r\n' +
                '   } \r\n' +
                ' \r\n' +
                '   p1 = 5 * b * b; \r\n' +
                '   float p1, p2, p3, s1; \r\n' +
                '   p2 = a * b; \r\n' +
                '   p3 = 0; \r\n' +
                '   p3 = p3 / (15 * a); \r\n' +
                '   p3 = p3 + b + 5; \r\n' +
                '   p2 = p2 + p3; \r\n' +
                '   p1 = p1 * p2; \r\n' +
                '   x = p1; \r\n' +
                ' \r\n' +
                '   printf("%f", x); \r\n' +
                '   return 0; \r\n' +
                '}'
            );
        }
    }
}
