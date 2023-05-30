import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { ApiService } from 'src/app/services/api-service/api.service';
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

  constructor(private api: ApiService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.load(true);

    // no need to un subscribe
    const req = this.api.get<IStudent>(environment.BASE_URL+'/student/getStudent', { headers: this.HEADERS });

    try{
      req.subscribe((res) => {
        this.student = res;
      });
    }
    finally{
      this.loaderService.load(false);
    }
    
  }

}
