import { GeneralService } from './general.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { User, Language } from '../interfaces';
import { LocalstorageService } from './localstorage.service';
import { BASE_URL } from './api/api-languages.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  isLoggedIn = new BehaviorSubject(false);
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private router: Router,
  ) {

    if (localStorage.getItem('words-token')) {
      this.setIsAuthenticated(true);
      this.router.navigate(['/vocabulary']);
    } else {
      this.setIsAuthenticated(false);
      this.router.navigate(['/login']);
    }
  }

  registration(newUser: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/api/auth/registration`, newUser);
  }

  login(user: User): Observable<{ token: string, message: string, currentLanguage: Language }> {
    return this.http.post<{ token: string, message: string, currentLanguage: Language }>(`${BASE_URL}/api/auth/login`, user);
  }

  logOut() {
    this.setIsAuthenticated(false);
    this.localStorage.removeItem('words-token');
    this.router.navigate(['/login']);
  }

  setIsAuthenticated(value: boolean) {
    this.isLoggedIn.next(value);
  }

  isAuthenticated() {
    return this.isLoggedIn.getValue();
  }

  isAuthenticated$() {
    return this.isLoggedIn;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isPasswordsMatch(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }
}


