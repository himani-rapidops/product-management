import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'product-management';

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(['/']); // Navigate back to home page
  }

  ngOnInit() {
  }
}
