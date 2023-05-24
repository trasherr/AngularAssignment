import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {

  addRecordForm: any = FormGroup;
  isSubmitted: boolean = false;
  @ViewChild('form') form : any;
  
  constructor(private fb: FormBuilder,private http: HttpClient){
     
    this.addRecordForm = this.fb.group({
      rollNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      dob: ['', [Validators.required]],
      name: ['', [Validators.required]],
      score: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  addRecord(){
    this.isSubmitted = true;
    const token = localStorage.getItem("TOKEN");
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", token ? token : ""  );

    const student: IStudent = {
      rollNo: this.addRecordForm.get("rollNo").value,
      dob: new Date(this.addRecordForm.get("dob").value),
      name: this.addRecordForm.get("name").value,
      score: this.addRecordForm.get("score").value,
      teacher: undefined,
      teacherId: undefined,
      id: undefined
    };

    this.http.post<IStudent>(environment.BASE_URL+'/teacher/CreateStudentRecord', JSON.stringify(student), {
      headers: headers
    }).subscribe(result => {

      this.isSubmitted = false;
      Swal.fire('Student Added', 'You submitted succesfully!', 'success')  
      this.addRecordForm.reset();
      this.form.resetForm();
    },
    (error: HttpErrorResponse) => {
      this.isSubmitted = false;

      if(error.status == 419){
        console.log("authentication failed");
      }
    });
  }
  
}
