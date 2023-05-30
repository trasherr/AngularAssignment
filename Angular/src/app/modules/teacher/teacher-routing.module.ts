import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ProfileComponent } from './profile/profile.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

const routes: Routes = [
  {path: "", component: StudentsListComponent},
  {path: "add-student", component: AddStudentComponent},
  {path: "profile", component: ProfileComponent},
  {path: "create", component: AddTeacherComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
