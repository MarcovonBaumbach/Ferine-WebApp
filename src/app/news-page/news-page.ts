import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-news-page',
  standalone: true,
  imports: [],
  templateUrl: './news-page.html',
  styleUrl: './news-page.scss'
})
export class NewsPageComponent implements AfterViewInit {
  // current offsets
  wave1OffsetX = 0;
  wave1OffsetY = 0;
  wave2OffsetX = 0;
  wave2OffsetY = 0;
  wave3OffsetX = 0;
  wave3OffsetY = 0;
  textureOffsetX = 0;
  textureOffsetY = 0;

  // target offsets
  targetWave1X = 0;
  targetWave1Y = 0;
  targetWave2X = 0;
  targetWave2Y = 0;
  targetWave3X = 0;
  targetWave3Y = 0;
  targetTextureX = 0;
  targetTextureY = 0;

  smoothFactor = 0.08;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animate();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const xRatio = (event.clientX / innerWidth - 0.5) * 2; // -1 to 1
    const yRatio = (event.clientY / innerHeight - 0.5) * 2; // -1 to 1

    // strong horizontal + vertical offsets
    this.targetWave1X = xRatio * 80;
    this.targetWave1Y = yRatio * 80;   // increased vertical movement

    this.targetWave2X = xRatio * 50;
    this.targetWave2Y = yRatio * 50;   // increased vertical movement

    this.targetWave3X = xRatio * 30;
    this.targetWave3Y = yRatio * 30;   // increased vertical movement

    this.targetTextureX = xRatio * 10;
    this.targetTextureY = yRatio * 10;
  }

  animate() {
    const lerp = (current: number, target: number, factor: number) =>
      current + (target - current) * factor;

    this.wave1OffsetX = lerp(this.wave1OffsetX, this.targetWave1X, this.smoothFactor);
    this.wave1OffsetY = lerp(this.wave1OffsetY, this.targetWave1Y, this.smoothFactor);

    this.wave2OffsetX = lerp(this.wave2OffsetX, this.targetWave2X, this.smoothFactor);
    this.wave2OffsetY = lerp(this.wave2OffsetY, this.targetWave2Y, this.smoothFactor);

    this.wave3OffsetX = lerp(this.wave3OffsetX, this.targetWave3X, this.smoothFactor);
    this.wave3OffsetY = lerp(this.wave3OffsetY, this.targetWave3Y, this.smoothFactor);

    this.textureOffsetX = lerp(this.textureOffsetX, this.targetTextureX, this.smoothFactor);
    this.textureOffsetY = lerp(this.textureOffsetY, this.targetTextureY, this.smoothFactor);

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--wave1-offsetX', `${this.wave1OffsetX}px`);
      document.documentElement.style.setProperty('--wave1-offsetY', `${this.wave1OffsetY}px`);
      document.documentElement.style.setProperty('--wave2-offsetX', `${this.wave2OffsetX}px`);
      document.documentElement.style.setProperty('--wave2-offsetY', `${this.wave2OffsetY}px`);
      document.documentElement.style.setProperty('--wave3-offsetX', `${this.wave3OffsetX}px`);
      document.documentElement.style.setProperty('--wave3-offsetY', `${this.wave3OffsetY}px`);
      document.documentElement.style.setProperty('--texture-offsetX', `${this.textureOffsetX}px`);
      document.documentElement.style.setProperty('--texture-offsetY', `${this.textureOffsetY}px`);
    }

    requestAnimationFrame(() => this.animate());
  }
}