import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterConfig, ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 6000
    });

  public startTest: boolean = false;
  public baseAPI: string = "https://app-tat8-server.herokuapp.com"

  //public serverData: JSON = JSON;
  //public employeeData: JSON = JSON;;
  //public employee: JSON = JSON;;

  public participantAge: any = null;
  public participantGender: any = null;
  public experimentNumber: any = "1";
  public experimentId: any = -1;

  public loading: boolean = false;

  private toasterService: ToasterService;
  constructor(private httpClient: HttpClient, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }

  public onStartExperiment(event: any) {
    if (event == null) {
      return;
    }

    this.loading = true;

    this.participantAge = event.participantAge;
    this.participantGender = event.participantGender;
    this.experimentNumber = event.experimentNumber;

    this.httpClient.post(`${this.baseAPI}/genId`, event).subscribe(
      data => {
        this.experimentId = (<any>data).expId;
        this.startTest = true;
        this.loading = false;
      },
      error => {
        this.experimentId = -1;
        this.loading = false;
        this.toasterService.pop('error', 'Ошибка', 'Во время выполнения запроса произошла неожиданная ошибка.');
      }
    );
  }
  /*
  sayHi() {
    this.httpClient.get('${this.baseAPI}/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }

  getAllEmployees() {
    this.httpClient.get('${this.baseAPI}/employees').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    })
  }
  getEmployee() {
    this.httpClient.get('${this.baseAPI}/employees/1').subscribe(data => {
      this.employee = data as JSON;
      console.log(this.employee);
    })
  }*/
}
