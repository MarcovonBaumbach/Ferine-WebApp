import { AfterViewInit, Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './footer/footer';
import { filter } from 'rxjs';

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
export class App implements AfterViewInit {
  protected readonly title = signal('band-website');
  isDarkPage = true; // true = white (default), false = black

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // White for home, music, about; black for news
        if (event.url === '/news') {
          this.isDarkPage = false; // black links/logo
        } else {
          this.isDarkPage = true; // white links/logo
        }
      });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate cursor instantly via requestAnimationFrame
    const animate = () => {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    // Show skull only on links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursor.classList.add('hover-grow');
        link.style.cursor = 'none';
      });
      link.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.classList.remove('hover-grow');
        link.style.cursor = 'auto';
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
