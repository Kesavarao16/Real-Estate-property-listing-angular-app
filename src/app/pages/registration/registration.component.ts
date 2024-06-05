import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router'; // Correct import

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Correct property name
})
export class RegistrationComponent {
  registerObj: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "" // Correct property name
  };
  isAgent: boolean = false;
  masterService = inject(MasterService);
  router = inject(Router);

  onRegister() {
    if (this.isAgent) {
      this.masterService.addAgent(this.registerObj).subscribe((res: any) => {
        if (res.result) {
          alert('Registration success');
          this.router.navigateByUrl("/login"); // Correct spelling and path
        }
      });

    } else {
      this.masterService.addCustomer(this.registerObj).subscribe((res: any) => {
        if (res.result) {
          alert('Registration success');
          this.router.navigateByUrl("/login"); // Correct spelling and path
        }
      });
    }
  }
}
