import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  EMAIL_REGEX = '^[a-zA-Z0-9_]([a-zA-Z0-9._+-]|)*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  Email: any;
  Password: any;
  ConfirmPassword: any;
  isPasswordMatch = true;
  isSuccessMessage = false;
  isErrorMessage = false;
  errorMessage: any;
  successMessage: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

  }

  checkPasswords() {
    if (this.Password === this.ConfirmPassword) {
      this.isPasswordMatch = true;
      return true;
    } else {
      this.isPasswordMatch = false;
      return false;
    }
  }
  passwordInputValues() {
    this.isPasswordMatch = true;
  }

  register(form) {
    if (form.valid && this.checkPasswords()) {
      const userObj = {
        Email: this.Email,
        Password: this.Password
      };
      this.authService.registerUser(userObj).subscribe(data => {
        if (data.success) {
          this.isSuccessMessage = true;
          this.successMessage = data.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        } else {
          this.isErrorMessage = true;
          this.errorMessage = data.message;
        }

      });

    }
    setTimeout(() => {
      this.successMessage = false;
      this.isErrorMessage = false;
    }, 5000);
  }



}
