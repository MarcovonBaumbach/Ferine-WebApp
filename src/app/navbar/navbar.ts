import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, NgStyle],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input() isDark = true;
  @ViewChild('logo', { static: false }) logoRef!: ElementRef<HTMLImageElement>;

  faBars = faBars;
  faTimes = faTimes;
  currentRoute: string = '';
  menuOpen = false;
  private routerSub?: Subscription;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    if (this.logoRef?.nativeElement) {
      const logo = this.logoRef.nativeElement;

      this.playShakeAndRotate(logo);

      logo.addEventListener('mouseenter', () => {
        logo.classList.add('rotate');
        setTimeout(() => logo.classList.remove('rotate'), 1200);
      });
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });

    this.detectTheme(this.router.url);

    this.routerSub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.menuOpen = false;
        this.detectTheme(ev.urlAfterRedirects);

        if (this.logoRef?.nativeElement) {
          this.playShakeAndRotate(this.logoRef.nativeElement);
        }
      }
    });
  }

  private playShakeAndRotate(logo: HTMLImageElement) {

    logo.classList.remove('shake-rotate');
    void logo.offsetWidth;

    logo.classList.add('shake-rotate');

    logo.addEventListener(
      'animationend',
      () => logo.classList.remove('shake-rotate'),
      { once: true }
    );
  }

  private detectTheme(url: string) {
    if (this.isDark === undefined) {
      this.isDark = !url.startsWith('/news');
    }
  }

  getBackgroundColor(): string {
    switch (this.currentRoute) {
      case '/privacy-policy':
        return 'rgba(0,0,0,0.9)';
      case '/imprint':
        return 'rgba(0,0,0,0.9)';
      case '/about':
        return 'rgba(0,0,0,0.9)';
      default:
        return 'rgba(0,0,0,0.05)';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}