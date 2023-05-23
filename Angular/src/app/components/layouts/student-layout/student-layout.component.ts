import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent {
  
  constructor(private router: Router){ }

    logout(){
      this.router.navigate(["/logout"]);
    }
}
