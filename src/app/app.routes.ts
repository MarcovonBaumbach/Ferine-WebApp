import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page';
import { AboutPageComponent } from './about-page/about-page';
import { MusicPageComponent } from './music-page/music-page';
import { NewsPageComponent } from './news-page/news-page';
import { ImprintComponent } from './imprint/imprint';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'music', component: MusicPageComponent},
    {path: 'news', component: NewsPageComponent},
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
