import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLayoutComponent } from './components/layouts/teacher-layout/teacher-layout.component';
import { LoginComponent } from './components/login/login.component';
import { StudentLayoutComponent } from './components/layouts/student-layout/student-layout.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TeacherGuardGuard } from './guards/teacher-guard/teacher-guard.guard';

const routes: Routes = [

  { path: "", component:LoginComponent },

  { path: "logout", component:LogoutComponent },

  { path:'teacher', component: TeacherLayoutComponent, children:[
      { path: "",  loadChildren: () => import("./modules/teacher/teacher.module").then(m => m.TeacherModule) },
    
    ],
    canActivate:[ TeacherGuardGuard]
  },

  { path:'student', component: StudentLayoutComponent, children:[
    { path: "",  loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
