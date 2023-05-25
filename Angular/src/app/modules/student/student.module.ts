import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ResultComponent } from './result/result.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
