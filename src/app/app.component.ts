import { Component, OnInit } from '@angular/core';
import { MasterService } from './service/master.service';

import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loggedUserData: any;

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.readUser();
    this.masterService.onLogin$.subscribe(res => {
      this.readUser();
    });
  }

  readUser(): void {
    const localData = localStorage.getItem('realuser');
    if (localData !== null) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  logOff(): void {
    localStorage.removeItem('realuser');
    this.loggedUserData = undefined;
  }
}
