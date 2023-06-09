import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { ApiService } from 'src/app/services/api-service/api.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
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
  
  constructor(private fb: FormBuilder,private api: ApiService,private loaderService: LoaderService){
     
    this.addRecordForm = this.fb.group({
      rollNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      dob: ['', [Validators.required]],
      name: ['', [Validators.required]],
      score: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  addRecord(){
    this.loaderService.load(true);
    this.isSubmitted = true;
    const token = localStorage.getItem("TOKEN");
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", token ? token : ""  );

    const student: IStudent = {
      rollNo: this.addRecordForm.get("rollNo").value,
      dob: new Date(this.addRecordForm.get("dob").value),
      name: this.addRecordForm.get("name").value,
      score: this.addRecordForm.get("score").value,
      Teacher: undefined,
      teacherId: undefined,
      id: undefined
    };

    const req = this.api.post<IStudent>(environment.BASE_URL+'/teacher/CreateStudentRecord', { headers: headers }, JSON.stringify(student));

    try{
      req.subscribe((res) => {
        Swal.fire('Student Added', 'You submitted succesfully!', 'success')  
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
