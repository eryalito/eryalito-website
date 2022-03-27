import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faNetworkWired, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faDocker, faJava, faLinux } from '@fortawesome/free-brands-svg-icons';
import { Utils } from 'app/shared/utils/utils';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  catSayingPrefix = 'home.cat.';
  randomTexts = ['meow1', 'meow2', 'meow3', 'prr1', 'prr2', 'hiss1', 'hiss2'];
  firstsTexts = ['greeting', 'name'];
  screenTextColors = ['#ffffff', '#dbebdb', '#ffffff'];
  hexIcons: HexInfo[] = [new HexInfo(faNetworkWired, 'Networking'), new HexInfo(faDocker, 'Docker'),
   new HexInfo(faJava, 'Java'),new HexInfo(faAngular, 'Angular'),new HexInfo(faShieldHalved, 'Cyber Security'),
   new HexInfo(faLinux, 'Linux')];
  catBlobBGColor = this.screenTextColors[0];
  catSaying = '';
  toggleCount = 0;
  textBackoff = 1500;
  viewing = 0;
  paintedIndex = 0;
  showQuestSign = true;
  showCatFrame = false;
  hexInfoArr: HexElement[] = [];
  lastAngle = 0;
  lastResize = 0;
  hexStopped = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.hexIcons = Utils.shuffleArray(this.hexIcons)
    this.repaint();
    this.reloadHexs();
    this.cycle();
  }

  cycle(): void {
    setTimeout(() => {
      if (!this.hexStopped) {
        this.reloadHexs(this.lastAngle);
        this.lastAngle += 0.1;
      }
      this.cycle();
    }, 10);
  }

  setHexStopped(value: boolean): void {
    if(value){
      this.hexStopped = value;
    } else {
      setTimeout(() => this.hexStopped = false, 500)
    }
  }

  @HostListener('window:resize', ['$event'])
  resize(): void {
    const time = new Date().getTime();
    if (time >= this.lastResize + 1) {
      this.lastResize = time;
      this.reloadHexs(this.lastAngle);
    }
  }

  reloadHexs(angleOffset = 0): void {
    this.hexInfoArr = [];
    const size = this.hexSize();
    const midX = (document.getElementById('skills-panel')?.offsetWidth ?? window.innerWidth) / 2 - size / 2;
    const midY = (document.getElementById('skills-panel')?.offsetHeight ?? window.innerHeight) / 2 - (size * 25) / 86;
    const radius = this.hexRadius();
    let counter = 0;
    this.hexIcons.forEach(info => {
      const angle = ((angleOffset + (360 * counter) / this.hexIcons.length) * Math.PI) / 180;
      this.hexInfoArr.push(new HexElement(size, midX + radius * Math.sin(angle), midY - radius * Math.cos(angle), info));
      counter++;
    });
    // setTimeout(() => this.reloadHexs(), 4000)
  }

  @HostListener('window:scroll', ['$event'])
  repaint(): void {
    const nowViewing = Math.floor(window.scrollY / window.innerHeight);
    if (nowViewing !== this.viewing) {
      this.viewing = nowViewing;
    }
    if (this.viewing * window.innerHeight + window.scrollY >= 200) {
      this.paintCatBG(this.viewing + 1);
    } else if (this.viewing === 0 && window.scrollY < 200) {
      this.paintCatBG(this.viewing);
    }
    // alert(this.viewing * window.innerHeight + window.scrollY)
  }

  paintCatBG(toPaintIndex: number): void {
    if (this.paintedIndex !== toPaintIndex) {
      this.paintedIndex = toPaintIndex;
      this.catBlobBGColor = this.screenTextColors[Math.min(this.paintedIndex, this.screenTextColors.length - 1)];
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  catPress(): void {
    if (this.showQuestSign) {
      const toggle = this.updateCatText();
      this.toggleQuestLogo();
      this.toggleCatFrame();
      setTimeout(() => this.showTextBackoff(toggle), this.randomTime(this.textBackoff, 1500));
    }
  }

  updateCatText(): number {
    if (this.toggleCount < this.firstsTexts.length) {
      this.catSaying = this.catSayingPrefix + this.firstsTexts[this.toggleCount];
      this.toggleCount++;
    } else {
      this.catSaying = this.catSayingPrefix + this.randomTexts[Math.floor(this.randomTexts.length * Math.random())];
      this.toggleCount++;
    }
    return this.toggleCount - 1;
  }

  randomTime(base: number, random: number): number {
    return base + random * Math.random();
  }

  showTextBackoff(toggle: number): void {
    if (toggle < this.firstsTexts.length) {
      this.toggleAll();
    } else {
      this.toggleCatFrame();
      setTimeout(() => this.toggleQuestLogo(), this.randomTime(1000, 4000));
    }
  }

  toggleAll(): void {
    this.toggleQuestLogo();
    this.toggleCatFrame();
  }

  toggleQuestLogo(): void {
    this.showQuestSign = !this.showQuestSign;
  }

  toggleCatFrame(): void {
    this.showCatFrame = !this.showCatFrame;
  }

  private hexSize(): number {
    return 100;
  }

  private hexRadius(): number {
    return 250;
  }
}

class HexInfo {
  constructor(public icon: IconDefinition, public alt: string) {}
}

class HexElement {
  public h: number;
  constructor(public w: number, public x: number, public y: number, public info: HexInfo) {
    this.h = (50 * w) / 86;
  }
}
