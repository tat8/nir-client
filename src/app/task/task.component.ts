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
    this.currentQuestion = 0;
    this.buildQuestions();
  }

  public onAnswered(selectedAnswer: number) {
    this.participantAnswers.push(selectedAnswer);
    if (this.currentQuestion == this.questions.length - 2) {
      this.onTaskFinished.emit();
    }

    if (this.currentQuestion >= this.questions.length - 1) {
      var keys = this.questions.map(o => o.key);
      var data = {
        "answers": this.participantAnswers,
        "keys": keys,
        "expId": this.experimentId
      };

      this.setRightCount();

      this.httpClient.post(`${this.baseAPI}/saveAnswers`, data).subscribe(x => {
        this.showResults = true;
        this.cdRef.detectChanges();
      },
        error => {
          this.toasterService.pop('error', "Ошибка", "Не удалось сохранить результат");
        });
    }
    else {
      this.currentQuestion += 1;
      this.cdRef.detectChanges();
    }
  }

  private buildQuestions() {
    if (this.experimentNumber == "1") {
      this.questions = [
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Синхрофазотрон",
            "Синхрофазатрон",
            "Синхрофозотрон",
            "Синхрафазатрон"],
          key: 0
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Трансскрипция",
            "Тронскрипция",
            "Транскррипция",
            "Транскрипция"],
          key: 3
        },
        {
          question: "Какой вариант правильный?",
          answers: ["Одевать детей",
            "Надевать детей"],
          key: 0
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Презумция",
            "Призумция",
            "Презумпция",
            "Призумпция"],
          key: 2
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Абревиатура",
            "Аббревиатура",
            "Абривиатура",
            "Аббривиатура"],
          key: 1
        },
        {
          question: "Какой вариант правильный?",
          answers: ["На будущий год",
            "На будующий год"],
          key: 0
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Коннсенсус",
            "Консенсус",
            "Консентсус",
            "Контсенсус"],
          key: 1
        },
        {
          question: "В каком варианте ударение стоит правильно?",
          answers: ["прозорлИва",
            "прозОрлива"],
          key: 0
        },
        {
          question: "Какой вариант правильный?",
          answers: ["День рождение",
            "День рождения"],
          key: 1
        },
        {
          question: "В каком варианте ударение стоит правильно?",
          answers: ["прибЫв",
            "прИбыв"],
          key: 0
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Генеролисимус",
            "Гениралиссимус",
            "Генералисимус",
            "Генералиссимус"],
          key: 3
        },
        {
          question: "В каком варианте слово написано правильно?",
          answers: ["Аккомпанимент",
            "Акомпанемент",
            "Акампанемент",
            "Аккомпанемент"],
          key: 3
        },
        {
          question: "В каком варианте написано правильно?",
          answers: ["Мы позвали обоих одноклассниц",
            "Мы позвали обеих одноклассниц"],
          key: 1
        },
        {
          question: "В каком варианте ударение стоит правильно?",
          answers: ["ходАтайство",
            "ходатАйство"],
          key: 0
        },
        {
          question: "Оцените уверенность в правильности своих ответов",
          answers: ["Абсолютно уверен(а)",
            "Уверен(а) почти во всех ответах",
            "Уверен(а) примерно в половине ответов",
            "Не уверен(а) почти во всех ответах",
            "Не уверен(а) во всех ответах"],
          key: 0
        }
      ];
    }

    if (this.experimentNumber == "2") {
      this.questions = [
        {
          question: "В чём измеряется сила?",
          answers: ["В Ньютонах",
            "В Джоулях",
            "В Амперах"],
          key: 0
        },
        {
          question: "Выберите правильный вариант",
          answers: ["I = U * R",
            "I = R / U",
            "I = U / R"],
          key: 2
        },
        {
          question: "Чему приблизительно равна скорость света в вакууме?",
          answers: ["150 000 км/с",
            "300 000 км/с",
            "500 000 км/с"],
          key: 1
        },
        {
          question: "Как называется стабильная элементарная частица с отрицательным зарядом?",
          answers: ["Электрон",
            "Позитрон",
            "Электрод"],
          key: 0
        },
        {
          question: "Как выглядит формула 3-го закона Ньютона о сила действия и противодействия?",
          answers: ["F1 = -F2",
            "F = ma",
            "F = mc^2"],
          key: 0
        },
        {
          question: "Что в физике понимается под \"нормальными условиями\"?",
          answers: ["Давление 760 мм рт. ст., температура 8 °С",
            "Давление 550 мм рт. ст., температура 0 °С",
            "Давление 960 мм рт. ст., температура 17 °С",
            "Давление 760 мм рт. ст., температура 0 °С"],
          key: 3
        },
        {
          question: "Что такое электролиз?",
          answers: ["Процесс деформации твердого тела под воздействием ультразвука",
            "Возникновение электрического тока при возникновении магнитного поля",
            "Разложение вещества на составные части при прохождении через его раствор электрического тока",
            "Вытеснение более легких атомов более тяжелыми"],
          key: 2
        },
        {
          question: "Что измеряется в Кельвинах?",
          answers: ["Температура",
            "Давление",
            "Мощность",
            "Напряжение"],
          key: 0
        },
        {
          question: "Что такое свет?",
          answers: ["Это излучение, распространяющееся от любых нагретых тел",
            "Это излучение, воспринимаемое глазом, т.е. видимое излучение"],
          key: 1
        },
        {
          question: "С какой физической характеристикой связано различие в цвете?",
          answers: ["С длиной волны",
            "С интенсивностью света",
            "С показателем преломления среды",
            "C частотой"],
          key: 3
        },
        {
          question: "Оцените уверенность в правильности своих ответов",
          answers: ["Абсолютно уверен(а)",
            "Уверен(а) почти во всех ответах",
            "Уверен(а) примерно в половине ответов",
            "Не уверен(а) почти во всех ответах",
            "Не уверен(а) во всех ответах"],
          key: 0
        }
      ]
    }

  }

  private setRightCount() {
    this.rightAnswersCount = 0;
    this.participantAnswers.forEach((answer, index) => {
      if (answer == this.questions[index].key) {
        this.rightAnswersCount += 1;
      }
    });
  }
}
