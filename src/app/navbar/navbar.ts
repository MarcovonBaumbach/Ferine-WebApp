import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input() isDark = true;
  @ViewChild('logo', { static: false }) logoRef!: ElementRef<HTMLImageElement>;

  faBars = faBars;
  faTimes = faTimes;

  menuOpen = false;
  private routerSub?: Subscription;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    // logo animations (optional)
    if (this.logoRef?.nativeElement) {
      const logo = this.logoRef.nativeElement;
      logo.classList.add('shake');
      logo.addEventListener('animationend', () => logo.classList.remove('shake'));
      logo.addEventListener('mouseenter', () => {
        logo.classList.add('rotate');
        setTimeout(() => logo.classList.remove('rotate'), 1200);
      });
    }

    this.detectTheme(this.router.url);

    // close menu + update theme on route change
    this.routerSub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.menuOpen = false;
        this.detectTheme(ev.urlAfterRedirects);
      }
    });
  }

  private detectTheme(url: string) {
    if (this.isDark === undefined) {
      // fallback: NEWS page is light, everything else dark
      this.isDark = !url.startsWith('/news');
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}