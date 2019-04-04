import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string;

  constructor() { }

  login(): void {
    this.username = 'Peter';
  }

  logout(): void {
    this.username = null;
  }
}
