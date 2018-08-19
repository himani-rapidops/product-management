import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  EMAIL_REGEX = '^[a-zA-Z0-9_]([a-zA-Z0-9._+-]|)*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  Email: any;
  Password: any;
  successMessage: any;
  isSuccessMessage = false;
  isErrorMessage = false;
  errorMessage: any;
  rememberMe: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
  }


  login(form) {
    if (form.valid) {
      const userObj = {
        Email: this.Email,
        Password: this.Password
      };
      this.authService.login(userObj).subscribe(data => {
        if (data.success) {
          this.router.navigate(['/product']);
          this.authService.storeUserData(data.token, data.user);
          if (this.rememberMe) {
            localStorage.setItem('remember', this.rememberMe);
            localStorage.setItem('email', this.Email);
            localStorage.setItem('password', this.Password);
          } else {
            localStorage.removeItem('remember');
            localStorage.removeItem('email');
            localStorage.removeItem('password');

          }

        } else {
          this.isErrorMessage = true;
          this.errorMessage = data.message;
        }
      });
    }
    setTimeout(() => {
      this.successMessage = false;
      this.isErrorMessage = false;
    }, 1000);
  }
}
