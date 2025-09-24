import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss'
})
export class AboutPageComponent {
  scrollToBandMembers(): void {
    const element = document.getElementById('band-members');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
