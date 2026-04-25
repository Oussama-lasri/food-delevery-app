import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly cuisines: string[] = ['Moroccan', 'Burgers', 'Pizza', 'Desserts'];
  isAuthOpen = false;
  authMode: 'login' | 'register' = 'login';
  isLoggedIn = false;
  userName = '';

  openAuth(mode: 'login' | 'register'): void {
    this.authMode = mode;
    this.isAuthOpen = true;
  }

  closeAuth(): void {
    this.isAuthOpen = false;
  }

  login(name: string): void {
    this.userName = name || 'Guest';
    this.isLoggedIn = true;
    this.closeAuth();
  }

  register(name: string): void {
    this.userName = name || 'New User';
    this.isLoggedIn = true;
    this.closeAuth();
  }
}
