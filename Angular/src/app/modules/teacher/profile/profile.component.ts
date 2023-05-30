import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ITeacher } from 'src/app/Interfaces/ITeacher.interface';
import { ApiService } from 'src/app/services/api-service/api.service';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  TOKEN = localStorage.getItem("TOKEN");
  HEADERS = new HttpHeaders().set('Content-Type', 'application/json').append("authentication", this.TOKEN ? this.TOKEN : ""  );
  teacher: ITeacher | undefined;

  password = new FormControl("",[ Validators.required, Validators.minLength(8), Validators.maxLength(16) ]);
  newPassword = new FormControl("",[ Validators.required, Validators.minLength(8), Validators.maxLength(16) ]);
  cPassword = new FormControl("",[ Validators.required ]);

  constructor(private loaderService: LoaderService, private api: ApiService) { }

  ngOnInit(){
    this.loaderService.load(true);

    // no need to un subscribe
    const req = this.api.get<ITeacher>(environment.BASE_URL+'/teacher/get', { headers: this.HEADERS });
    
    try{
      req.subscribe((res) => {
        this.teacher = res;
      });
    }

    finally{
      this.loaderService.load(false);
    }

    
  }

  changePass(){

    const chPass = { 
      password: this.password.value,
      newPassword: this.newPassword.value,
      cPassword: this.newPassword.value,
    }
    const req = this.api.put(environment.BASE_URL+'/teacher/changePassword', { headers: this.HEADERS }, JSON.stringify(chPass));

    try{
      req.subscribe((res) => {
        Swal.fire('Password Changed',"","success");
      });
    }
    finally{
      this.loaderService.load(false);
      this.password.reset();
      this.newPassword.reset();
      this.cPassword.reset();
    }

  }

}
