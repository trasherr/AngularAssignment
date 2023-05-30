import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITeacher } from 'src/app/Interfaces/ITeacher.interface';
import { ApiService } from 'src/app/services/api-service/api.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {
  
  addRecordForm: any = FormGroup;
  isSubmitted: boolean = false;
  @ViewChild('form') form : any;
  
  constructor(private fb: FormBuilder,private api: ApiService,private loaderService: LoaderService){
     
    this.addRecordForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  addRecord(){
    this.loaderService.load(true);
    this.isSubmitted = true;
    const token = localStorage.getItem("TOKEN");
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", token ? token : ""  );

    const teacher: ITeacher = {
      email: this.addRecordForm.get("email").value,
      firstName: this.addRecordForm.get("first_name").value,
      lastName: this.addRecordForm.get("last_name").value,
      password: this.addRecordForm.get("password").value,
      id: undefined
    };

    const req = this.api.post<ITeacher>(environment.BASE_URL+'/teacher/CreateTeacherAccount', {headers: headers} , JSON.stringify(teacher));

    try{
      req.subscribe((res) => {
        Swal.fire('Teacher Account Created', 'Account created succesfully!', 'success')  
        this.addRecordForm.reset();
        this.form.resetForm();
      });
    }
    finally{
      this.isSubmitted = false;
      this.loaderService.load(false);
    }
  }
}
