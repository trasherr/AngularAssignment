import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


interface ILoginResponse{
  access_token: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  studentLoginForm: any = FormGroup;
  teacherLoginForm: any = FormGroup;

  constructor(private http: HttpClient,private fb: FormBuilder ,private router:Router){
    
    this.studentLoginForm = this.fb.group({
      rollNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      dob: ['', [Validators.required]]
    });

    this.teacherLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
  }

  studentLogin() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const student = {
      rollNo: this.studentLoginForm.get("rollNo").value,
      dob: this.studentLoginForm.get("dob").value
    };

    this.http.post<ILoginResponse>(environment.BASE_URL+'/account/student', JSON.stringify(student), {
      headers: headers
    }).subscribe(result => {
      console.log(result);
      localStorage.setItem("TYPE","student");
      localStorage.setItem("TOKEN",result.access_token);
      this.router.navigate(['/student']);

    },
    (error: HttpErrorResponse) => {
      if(error.status == 419){
        console.log("authentication failed");
      }
    });
  }

  teacherLogin() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const teacher = {
      email: this.teacherLoginForm.get("email").value,
      password: this.teacherLoginForm.get("password").value
    };

    this.http.post<ILoginResponse>(environment.BASE_URL+'/account/teacher', JSON.stringify(teacher), {
      headers: headers
    }).subscribe(result => {
      console.log(result);
      localStorage.setItem("TYPE","teacher");
      localStorage.setItem("TOKEN",result.access_token);
      this.router.navigate(['/teacher']);
    },
    (error: HttpErrorResponse) => {
      if(error.status == 419){
        console.log("authentication failed");
      }
      console.log(error);
      
    });
  }

}
