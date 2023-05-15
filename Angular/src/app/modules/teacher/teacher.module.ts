import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { MaterialModule } from 'src/material.module';
import { StudentsListComponent } from './students-list/students-list.component';


@NgModule({
  declarations: [
  
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule
  ]
})
export class TeacherModule { }
