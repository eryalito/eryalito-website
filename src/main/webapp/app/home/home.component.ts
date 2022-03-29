import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCat, faNetworkWired, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faDocker, faJava, faLinux, faPhp, faPython } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  catSayingPrefix = 'home.cat.';
  randomTexts = ['meow1', 'meow2', 'meow3', 'prr1', 'prr2', 'hiss1', 'hiss2'];
  firstsTexts = ['greeting', 'name'];
  screenTextColors = ['#ffffff', '#dbebdb', '#ffffff', '#fff5ff'];
  hexIcons: HexInfo[] = [
    new HexInfo(faNetworkWired, 'Networking'),
    new HexInfo(faDocker, 'Docker'),
    new HexInfo(faJava, 'Java'),
    new HexInfo(faAngular, 'Angular'),
    new HexInfo(faShieldHalved, 'Cyber Security'),
    new HexInfo(faLinux, 'Linux'),
    new HexInfo(faPython, 'Python'),
    new HexInfo(faPhp, 'php'),
    new HexInfo(faCat, 'Meow'),
  ];
  catBlobBGColor = this.screenTextColors[0];
  catSaying = '';
  toggleCount = 0;
  textBackoff = 1500;
  viewing = 0;
  paintedIndex = 0;
  showQuestSign = true;
  showCatFrame = false;
  hexInfoArr: HexElement[] = [];
  maxStepSize = 5;
  lastResize = 0;
  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.repaint();
    // this.reloadHexs();
    this.setupHexs();
    this.cycle();
  }

  setupHexs(): void {
    const maxX = document.getElementById('skills-panel')?.offsetWidth ?? window.innerWidth;
    const maxY = document.getElementById('skills-panel')?.offsetHeight ?? window.innerHeight;
    const size = this.hexSize();
    let counter = 0;
    this.hexIcons.forEach(info => {
      const x = Math.random() * (maxX - size);
      const y = Math.random() * (maxY - size);
      this.hexInfoArr.push(new HexElement(counter++, size, x, y, Math.random() * this.maxStepSize - this.maxStepSize / 2, Math.random() * this.maxStepSize - this.maxStepSize / 2, info));
    });
  }

  moveHexs(): void {
    const maxX = document.getElementById('skills-panel')?.offsetWidth ?? window.innerWidth;
    const maxY = document.getElementById('skills-panel')?.offsetHeight ?? window.innerHeight;
    const size = this.hexSize();
    this.hexInfoArr.forEach(info => {
      if(!info.stopped){
        let newX = 0, newY = 0;
        newX = info.x+info.incrementX;
        newY = info.y+info.incrementY;
        if((newX < (1) && info.incrementX < 0 )|| (newX > maxX - (size+1) && info.incrementX > 0) ){
          info.incrementX = 0 - info.incrementX;
        }
        if( (newY < size/3 && info.incrementY < 0)|| (newY > maxY - size && info.incrementY > 0) ){
          info.incrementY = 0 - info.incrementY;
        }
        newX = info.x+info.incrementX;
        newY = info.y+info.incrementY;
        info.x=newX
        info.y=newY
      }
    });
  }

  cycle(): void {
    setTimeout(() => {
      this.moveHexs();
      this.cycle();
    }, 100);
  }

  setHexStopped(id: number, enter: boolean): void {
    this.hexInfoArr.forEach(element => {
      if(element.id === id){
        if(enter){
          element.stopped = true
        }else{
          setTimeout(() => (element.stopped = false), 500);
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  resize(): void {
    const time = new Date().getTime();
    if (time >= this.lastResize + 1) {
      this.lastResize = time;
    }
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
  public stopped = false;
  constructor(public id: number, public w: number, public x: number, public y: number, public incrementX: number, public incrementY: number, public info: HexInfo) {
    this.h = (50 * w) / 86;
  }
}
