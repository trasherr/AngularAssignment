import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ApiService } from 'src/app/services/api-service/api.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';

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

  constructor(private fb: FormBuilder ,private router:Router, private api: ApiService, private loaderService: LoaderService){
    
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

    this.loaderService.load(true);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const student = {
      rollNo: this.studentLoginForm.get("rollNo").value,
      dob: new Date(this.studentLoginForm.get("dob").value)
    };

    const req = this.api.post<ILoginResponse>(environment.BASE_URL+'/account/student', { headers: headers }, JSON.stringify(student));

    try{

      req.subscribe((res) => {
        localStorage.setItem("TYPE","student");
        localStorage.setItem("TOKEN",res.access_token);
        this.router.navigate(['/student']);
      });
      
    }
    finally{
      this.loaderService.load(false);

    }
    // no need to un subscribe
  }

  teacherLogin() {
    this.loaderService.load(true);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const teacher = {
      email: this.teacherLoginForm.get("email").value,
      password: this.teacherLoginForm.get("password").value
    };

    const req = this.api.post<ILoginResponse>(environment.BASE_URL+'/account/teacher', { headers: headers }, JSON.stringify(teacher));
    

    try{
      // no need to un subscribe
      req.subscribe((res) => {
        localStorage.setItem("TYPE","teacher");
        localStorage.setItem("TOKEN",res.access_token);
        this.router.navigate(['/teacher']);
      });
    }
    finally{
      this.loaderService.load(false);

    }
    
  }

}
