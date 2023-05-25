import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit  {

  students: IStudent[] = []
  displayedColumns = [  'rollNo','name', 'dob', 'score', "action"]
  pageSize = 10;
  pageIndex = 0;

  TOKEN = localStorage.getItem("TOKEN");
  HEADERS = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", this.TOKEN ? this.TOKEN : ""  );

  @ViewChild('studentsTable') studentsTable: ElementRef | undefined;

  editStudent : any[] = []

  constructor(private http: HttpClient, private loaderService: LoaderService){ }


  ngOnInit(): void {
    this.getAllStudents();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllStudents();
  }

  getAllStudents(){

    this.loaderService.load(true);

    this.http.get<IStudent[]>(environment.BASE_URL+`/teacher/getAllStudents?page=${this.pageIndex}&size=${this.pageSize}`, {
      headers: this.HEADERS
    }).subscribe(result => {
      this.students = result;
      this.loaderService.load(false);

    },
    (error: HttpErrorResponse) => {
      this.loaderService.load(false);
      if(error.status == 419){
        console.log("authentication failed");
      }
    });
  }




  addEdit(id: number,isAdd: boolean, item: IStudent){
    
    if(isAdd){
      this.editStudent[id] = { 
        name: new FormControl(item.name,[Validators.required]),
        dob: new FormControl(item.dob,[Validators.required]),
        score: new FormControl(item.score,[Validators.required, Validators.pattern("^[0-9]+$")]),
      };
      return;
    }
    if (this.editStudent[id]) { 
      this.editStudent.splice(id, 1); 
    }

  }

  saveStudent(id: number){
    
    if(!this.editStudent[id].name.valid || !this.editStudent[id].dob.valid || !this.editStudent[id].score.valid){
      this.startAnimation();
      return;
    }

    let student = this.students.filter(item => item.id == id);
    this.updateStudent(student[0]);
    student[0].name = this.editStudent[id].name.value;
    student[0].dob = this.editStudent[id].dob.value;
    student[0].score = this.editStudent[id].score.value;
    this.editStudent.splice(id,1);
  }



  updateStudent(student: IStudent){

    this.loaderService.load(true);

    this.http.put(environment.BASE_URL+`/teacher/updateStudentRecord/${student.id}`, JSON.stringify(student), {
      headers: this.HEADERS
    }).subscribe(result => {
      this.loaderService.load(false);
      Swal.fire('Success', 'Student Record Updated', 'success');
    },
    (error: HttpErrorResponse) => {
      this.loaderService.load(false);
      if(error.status == 419){
        console.log("authentication failed");
      }
    });

  }

  deleteStudent(id: number){

    this.loaderService.load(true);

    this.http.delete(environment.BASE_URL+`/teacher/destroyStudentRecord/${id}`, {
      headers: this.HEADERS
    }).subscribe(result => {
      this.loaderService.load(false);
      Swal.fire('Success', 'Student Record Deleted', 'success');
      this.students = this.students.filter(item => item.id != id);

    },
    (error: HttpErrorResponse) => {
      this.loaderService.load(false);
      if(error.status == 419){
        console.log("authentication failed");
      }
    });

  }


  // Animations

  startAnimation(): void {
    this.studentsTable?.nativeElement.animate(this.getShakeAnimation(), this.getShakeAnimationTiming());
  }
  getShakeAnimation() {
    return [
      { transform: 'rotate(0)' },
      { transform: 'rotate(2deg)' },
      { transform: 'rotate(-2deg)' },
      { transform: 'rotate(0)' },
    ];
  }

  getShakeAnimationTiming() {
    return {
      duration: 100,
      iterations: 3,
    };
  }

 

}
