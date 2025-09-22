import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  color: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('fireCanvas', { static: false }) fireCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('logoRef', { static: false }) logoRef!: ElementRef<HTMLDivElement>;
  @ViewChild('logoImage', { static: false }) logoImage!: ElementRef<HTMLImageElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private running = false;
  private animationFrameId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Wait for image to load
    this.logoImage.nativeElement.onload = () => {
      const img = this.logoImage.nativeElement;
      const container = this.logoRef.nativeElement;

      // Force container to match image size
      container.style.width = img.width + 'px';
      console.log(container.style.height = img.height + 'px');

      this.setupCanvas();

      // Hover events
      container.addEventListener('mouseenter', () => this.start());
      container.addEventListener('mouseleave', () => this.stop());

      window.addEventListener('resize', () => this.setupCanvas());
    };
  }

  private setupCanvas() {
    const canvas = this.fireCanvas.nativeElement;
    const rect = this.logoRef.nativeElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private start() {
    if (this.running) return;
    this.running = true;
    this.animate();
  }

  private stop() {
    this.running = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.particles = [];
    if (this.ctx && this.logoRef) {
      const { clientWidth, clientHeight } = this.logoRef.nativeElement;
      this.ctx.clearRect(0, 0, clientWidth, clientHeight);
    }
  }

  private animate = () => {
    if (!this.running || !this.ctx || !this.logoRef) return;

    const ctx = this.ctx;
    const logoWidth = this.logoRef.nativeElement.clientWidth;
    const logoHeight = this.logoRef.nativeElement.clientHeight;
    const centerX = logoWidth / 2;
    const centerY = logoHeight / 2;
    const radius = Math.min(centerX, centerY) * 1.3;

    // Clear canvas
    ctx.clearRect(0, 0, logoWidth, logoHeight);

    // Spawn particles around perimeter
    for (let i = 0; i < 4; i++) {
      const angle = Math.random() * Math.PI * 2;
      this.particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        age: 0,
        life: 40 + Math.random() * 20,
        color: `hsl(${30 + Math.random() * 60}, 100%, ${50 + Math.random() * 20}%)`
      });
    }

    // Draw particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.age++;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1 - p.age / p.life;
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Remove old particles
    this.particles = this.particles.filter(p => p.age < p.life);

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
