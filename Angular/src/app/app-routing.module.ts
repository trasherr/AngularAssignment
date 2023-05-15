import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLayoutComponent } from './components/layouts/teacher-layout/teacher-layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: "", component:LoginComponent },

  { path:'teacher', component: TeacherLayoutComponent, children:[
    { path: "",  loadChildren: () => import("./modules/teacher/teacher.module").then(m => m.TeacherModule) }
  ]},
  { path:'student',  loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
