import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-music-page',
  standalone: true,
  imports: [],
  templateUrl: './music-page.html',
  styleUrl: './music-page.scss'
})
export class MusicPageComponent implements AfterViewInit {

  // current offsets for parallax
  wave1X = 0; wave1Y = 0;
  wave2X = 0; wave2Y = 0;
  wave3X = 0; wave3Y = 0;
  smoothFactor = 0.1;

  // target offsets
  targetWave1X = 0; targetWave1Y = 0;
  targetWave2X = 0; targetWave2Y = 0;
  targetWave3X = 0; targetWave3Y = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animate();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const xRatio = (event.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (event.clientY / window.innerHeight - 0.5) * 2;

    // strong parallax multipliers for punk rock feel
    this.targetWave1X = xRatio * 100;
    this.targetWave1Y = yRatio * 80;

    this.targetWave2X = xRatio * 70;
    this.targetWave2Y = yRatio * 50;

    this.targetWave3X = xRatio * 50;
    this.targetWave3Y = yRatio * 30;
  }

  animate() {
    const lerp = (c: number, t: number, f: number) => c + (t - c) * f;

    this.wave1X = lerp(this.wave1X, this.targetWave1X, this.smoothFactor);
    this.wave1Y = lerp(this.wave1Y, this.targetWave1Y, this.smoothFactor);
    this.wave2X = lerp(this.wave2X, this.targetWave2X, this.smoothFactor);
    this.wave2Y = lerp(this.wave2Y, this.targetWave2Y, this.smoothFactor);
    this.wave3X = lerp(this.wave3X, this.targetWave3X, this.smoothFactor);
    this.wave3Y = lerp(this.wave3Y, this.targetWave3Y, this.smoothFactor);

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--wave1X', `${this.wave1X}px`);
      document.documentElement.style.setProperty('--wave1Y', `${this.wave1Y}px`);
      document.documentElement.style.setProperty('--wave2X', `${this.wave2X}px`);
      document.documentElement.style.setProperty('--wave2Y', `${this.wave2Y}px`);
      document.documentElement.style.setProperty('--wave3X', `${this.wave3X}px`);
      document.documentElement.style.setProperty('--wave3Y', `${this.wave3Y}px`);
    }

    requestAnimationFrame(() => this.animate());
  }
}
