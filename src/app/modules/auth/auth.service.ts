import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    http: any;
    apiUrl: string;
    authToken: any;
    user: any;


    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000';
    }

    registerUser(userObj) {
        const searchUrl = `${this.apiUrl}/register`;
        return this.http.post(searchUrl, userObj).pipe(map((response: any) => response.json()));
    }

    login(user) {
        const searchUrl = `${this.apiUrl}/login`;
        return this.http.post(searchUrl, user).pipe(map((response: any) => response.json()));
    }

    // Function to store user's data in client local storage
    storeUserData(token, user) {
        localStorage.setItem('token', token); // Set token in local storage
        localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
        this.authToken = token; // Assign token to be used elsewhere
        this.user = user; // Set user to be used elsewhere
    }

    // Function to check if user is logged in
    loggedIn() {
        return tokenNotExpired();
    }

    logout() {
        this.authToken = null; // Set token to null
        this.user = null; // Set user to null
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Clear local storage
    }
}
