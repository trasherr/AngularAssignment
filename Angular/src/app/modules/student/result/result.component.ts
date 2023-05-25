import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  TOKEN = localStorage.getItem("TOKEN");
  HEADERS = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", this.TOKEN ? this.TOKEN : ""  );
  student: IStudent | undefined;

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.load(true);

    this.http.get<IStudent>(environment.BASE_URL+`/student/getStudent`, {
      headers: this.HEADERS
    }).subscribe(result => {
      this.student = result;
      this.loaderService.load(false);

    },
    (error: HttpErrorResponse) => {
      this.loaderService.load(false);
      if(error.status == 419){
        console.log("authentication failed");
      }
    });
  }

}
