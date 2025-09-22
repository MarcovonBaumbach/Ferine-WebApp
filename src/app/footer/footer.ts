import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  currentRoute: string = '';

  constructor(private library: FaIconLibrary, private router: Router) {
    library.addIcons(faFacebook, faInstagram, faYoutube, faEnvelope);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  getIconColor(icon: 'facebook' | 'instagram' | 'youtube'): string {
    switch (this.currentRoute) {
      case '/news':
        return 'black';
      case '/music':
        return 'white';
      case '/about':
        return 'white';
      default:
        return 'white';
    }
  }
}