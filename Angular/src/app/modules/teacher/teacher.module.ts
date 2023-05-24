import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { MaterialModule } from 'src/material.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
    StudentsListComponent,
       AddStudentComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
