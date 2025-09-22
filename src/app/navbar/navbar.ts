import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class NavbarComponent {
  @Input() isDark = true;
  @ViewChild('logo', { static: false }) logoRef!: ElementRef<HTMLImageElement>;

  ngAfterViewInit() {
    const logo = this.logoRef.nativeElement;

    // Shake animation on load
    logo.classList.add('shake');

    // Remove shake class after animation ends
    logo.addEventListener('animationend', () => {
      logo.classList.remove('shake');
    });
    
    // Rotate on hover, but last full 1.2s
    logo.addEventListener('mouseenter', () => {
      logo.classList.add('rotate');

      // Remove rotate class after 1.2s so it can be triggered again
      setTimeout(() => {
        logo.classList.remove('rotate');
      }, 1200);
    });
  }
}
