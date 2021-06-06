import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user$: any;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.user$;
    this.user$.subscribe((res: any) => console.log(res));
  }

}
