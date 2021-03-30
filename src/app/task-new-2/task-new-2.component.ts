import { Component, Output, EventEmitter, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as ace from "ace-builds";

@Component({
    selector: 'app-task-new-2',
    templateUrl: './task-new-2.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./task-new-2.component.scss']
})
export class TaskNew2Component {

    public task: string = "";
    public resultText: string = "";
    public resultText2: string = "";
    public equation: string = '\\sum_{i=1}^nx_i';

    @ViewChild("editor") private editor: ElementRef<HTMLElement> | undefined;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        if (this.editor != null) {
            ace.config.set("fontSize", "28px");
            ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
            const aceEditor = ace.edit(this.editor.nativeElement);
            aceEditor.session.setValue('int main() { \r\n' +
                '   float a,b, x; \r\n' +
                '   scanf("%f%f", &a,&b); \r\n' +
                ' \r\n' +
                '   if(b == 0){ \r\n' +
                '       printf("Нет решения"); \r\n' +
                '       return 0; \r\n' +
                '   } \r\n' +
                ' \r\n' +
                '   x = 0; \r\n' +
                ' \r\n' +
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
            
            aceEditor.session.setMode("ace/mode/python");
            aceEditor.commands.on("exec", function (e: any) {
                var rowCol = aceEditor.selection.getCursor();
                if ((rowCol.row == 0) || ((rowCol.row + 1) == aceEditor.session.getLength())) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }

        this.task = "Программе на вход подаются два числа a и b. \r\n"+ 
        "Зная эти значения, программа должна вычислить значение x по формуле: \r\n" +
        "\r\n" +
        "x= a^2*(5ab-(b+5)/b) \r\n" +
        "\r\n" +
        "Все числа считаются действительными. \r\n" +
        "В результате работы вируса несколько строк программы поменялись местами. \r\n" +
        "\r\n" +
        "Укажите две пары строк, которые необходимо поменять местами, чтобы программа работала правильно."
    }
}
