import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
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

  @ViewChild('studentsTable') studentsTable: ElementRef | undefined;

  editStudent : any[] = []

  constructor(private http: HttpClient){ }


  ngOnInit(): void {
    this.getAllStudents();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllStudents();
  }

  getAllStudents(){
    const token = localStorage.getItem("TOKEN");
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", token ? token : ""  );
    this.http.get<IStudent[]>(environment.BASE_URL+`/teacher/getAllStudents?page=${this.pageIndex}&size=${this.pageSize}`, {
      headers: headers
    }).subscribe(result => {
      this.students = result;
    },
    (error: HttpErrorResponse) => {
      

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
    this.editStudent.splice(id,1);
  }






  updateStudent(student: IStudent){

    const token = localStorage.getItem("TOKEN");
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", token ? token : ""  );
    this.http.post(environment.BASE_URL+`/teacher/updateStudentRecord`, JSON.stringify(student), {
      headers: headers
    }).subscribe(result => {
      Swal.fire('Success', 'Student Record Updated', 'success');
    },
    (error: HttpErrorResponse) => {
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
