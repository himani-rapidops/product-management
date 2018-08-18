import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: any;
  Password: any;
  successMessage: any;
  isSuccessMessage = false;
  isErrorMessage = false;
  errorMessage: any;
  rememberMe: any;

  constructor(private router: Router,  private route: ActivatedRoute) {
  }

  ngOnInit() {
  }


  login(form) {
    if (form.valid) {
      const userObj = {
        Email: this.Email,
        Password: this.Password,
        RememberMe : this.rememberMe
      };
      console.log(userObj);
    }
  }
}
