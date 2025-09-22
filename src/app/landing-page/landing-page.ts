import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Skeleton {
  x: number;           // current horizontal position
  direction: 'left' | 'right';
  speed: number;       // pixels per frame
  size: number;        // width in px
  glow: boolean;       // glowing eyes
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPageComponent{
  
}
