import { AfterViewInit, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  protected readonly title = signal('band-website');
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cursor = document.querySelector('.custom-cursor') as HTMLElement;

    // Follow mouse
    window.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Show skull only on links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursor.classList.add('hover-grow');
        link.style.cursor = 'none'; // hide system cursor on this link
      });
      link.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.classList.remove('hover-grow');
        link.style.cursor = 'auto'; // restore system cursor
      });
    });

    // Optional jitter
    setInterval(() => {
      if (cursor.style.opacity === '1') {
        const jitterX = (Math.random() - 0.5) * 2;
        const jitterY = (Math.random() - 0.5) * 2;
        cursor.style.transform = `translate(calc(-50% + ${jitterX}px), calc(-50% + ${jitterY}px)) ${cursor.classList.contains('hover-grow') ? 'scale(1.5)' : 'scale(1)'}`;
      }
    }, 50);
  }
}
