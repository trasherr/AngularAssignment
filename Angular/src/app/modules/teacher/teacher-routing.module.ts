import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  {path: "", component: StudentsListComponent},
  {path: "add-student", component: AddStudentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
