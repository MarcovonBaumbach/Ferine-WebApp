import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page';
import { NavbarComponent } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    LandingPageComponent,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('band-website');
}
