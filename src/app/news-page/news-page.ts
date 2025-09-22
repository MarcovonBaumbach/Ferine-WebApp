import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [],
  templateUrl: './news-page.html',
  styleUrl: './news-page.scss'
})
export class NewsPageComponent {

  // Listen to mouse movement
   @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const xRatio = (event.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const yRatio = (event.clientY / innerHeight - 0.5) * 2; // -1 to 1

    // Update CSS variables for additive parallax
    document.documentElement.style.setProperty('--wave1-offsetX', `${xRatio*10}px`);
    document.documentElement.style.setProperty('--wave1-offsetY', `${yRatio*10}px`);

    document.documentElement.style.setProperty('--wave2-offsetX', `${xRatio*7}px`);
    document.documentElement.style.setProperty('--wave2-offsetY', `${yRatio*7}px`);

    document.documentElement.style.setProperty('--wave3-offsetX', `${xRatio*4}px`);
    document.documentElement.style.setProperty('--wave3-offsetY', `${yRatio*4}px`);

    document.documentElement.style.setProperty('--texture-offsetX', `${xRatio*2}px`);
    document.documentElement.style.setProperty('--texture-offsetY', `${yRatio*2}px`);
  }
}
