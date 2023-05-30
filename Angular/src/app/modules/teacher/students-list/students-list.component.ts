import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IStudent } from 'src/app/Interfaces/IStudent.interface';
import { ApiService } from 'src/app/services/api-service/api.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

interface IStudentTable{
  students: IStudent[],
  count: number
}

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit  {

  students: IStudent[] = []
  displayedColumns = [  'rollNo','name', 'dob', 'score', "createdBy", "action"]
  pageSize = 10;
  pageIndex = 0;


  totalCount = 0;

  TOKEN = localStorage.getItem("TOKEN");
  HEADERS = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", this.TOKEN ? this.TOKEN : ""  );

  @ViewChild('studentsTable') studentsTable: ElementRef | undefined;

  editStudent : any[] = []

  constructor(private api: ApiService, private loaderService: LoaderService){ }


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

    const req = this.api.get<IStudentTable>(environment.BASE_URL+`/teacher/getAllStudents?page=${this.pageIndex}&size=${this.pageSize}`, { headers: this.HEADERS });

    try{
      req.subscribe((res) => {
        this.students = res.students;
        this.totalCount = res.count;
        this.loaderService.load(false);
      });
    }
    finally{
      this.loaderService.load(false);
    }
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

    const req = this.api.put<IStudent>(environment.BASE_URL+`/teacher/updateStudentRecord/${student.id}`, { headers: this.HEADERS }, JSON.stringify(student));

    try{
      req.subscribe((res) => {
        Swal.fire('Success', 'Student Record Updated', 'success');
      });
    }
    finally{
      this.loaderService.load(false);
    }

  }

  deleteStudent(id: number){

    this.loaderService.load(true);

    const req = this.api.delete(environment.BASE_URL+`/teacher/destroyStudentRecord/${id}`, { headers: this.HEADERS });

    try{
      req.subscribe((res) => {
        Swal.fire('Success', 'Student Record Deleted', 'success');
        this.students = this.students.filter(item => item.id != id);
      });
    }
    finally{
      this.loaderService.load(false);
    }

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
