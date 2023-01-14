import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { LANGUAGES } from '../shared/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  selectedLanguage = 'en';
  openAPIEnabled?: boolean;
  version = '';
  entitiesNavbarItems: any[] = [];
  viewing = 0;
  isHome = false;

  constructor(
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    // if (VERSION) {
    //   this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    // }
    this.router.events.subscribe(() => {
      const base = this.router.url.split("#")[0];
      this.isHome = base === '/';
    })
    this.selectedLanguage = this.sessionStorageService.retrieve("locale")
    this.translateService.use(this.selectedLanguage)
    this.repaint();
  }

  scrollToElement(element: string): void {
    if (!this.isHome) {
      this.router.navigate(['/'], {fragment: element}).then(() => this.moveTo(element))
    }else{
      this.moveTo(element)
    }
  }

  moveTo(element: string): void {
    const $element = document.getElementById(element);
    if ($element){
      $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

  @HostListener('window:scroll', ['$event'])
  repaint(): void {
    const nowViewing = Math.floor(window.scrollY/window.innerHeight);
    if (nowViewing !== this.viewing) {
      this.viewing = nowViewing;
    }
  }
  ngOnInit(): void {
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(timeoutTime = 0): void {
    setTimeout(() => {
      this.isNavbarCollapsed = true;
    }, timeoutTime)
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
