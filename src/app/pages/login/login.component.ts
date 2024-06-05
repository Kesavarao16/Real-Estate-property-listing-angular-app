import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule], // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct property name to styleUrls
})
export class LoginComponent {

  loginObj: any = {
    "userName": "",
    "password": ""
  };

  masterService = inject(MasterService);
  router = inject(Router);

  onLogin() {
    this.masterService.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("login success");
        localStorage.setItem('realuser', JSON.stringify(res.data));
        this.masterService.onLogin$.next(true);
        this.router.navigateByUrl('/home');
      } else {
        alert(res.message);
      }
    });
  }
}
