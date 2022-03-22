import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  catSayingPrefix = 'home.cat.';
  randomTexts = ['meow1', 'meow2', 'meow3', 'prr1', 'prr2', 'hiss1', 'hiss2'];
  firstsTexts = ['greeting', 'name'];
  screenTextColors = ["#ffffff", '#dbebdb'];
  catBlobBGColor = this.screenTextColors[0]
  catSaying = '';
  toggleCount = 0;
  textBackoff = 1500;
  viewing = 0;
  paintedIndex = 0;
  showQuestSign = true;
  showCatFrame = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}
  @HostListener('window:scroll', ['$event'])
  repaint(): void {
    const nowViewing = Math.floor(window.scrollY/window.innerHeight);
    if (nowViewing !== this.viewing) {
      this.viewing = nowViewing;
    }
    if(this.viewing * window.innerHeight + window.scrollY >= 200){
      this.paintCatBG(this.viewing +1 );
    }else if (this.viewing === 0 && window.scrollY < 200){
      this.paintCatBG(this.viewing);
    }
    // alert(this.viewing * window.innerHeight + window.scrollY)
  }

  paintCatBG(toPaintIndex: number): void{
    if(this.paintedIndex !== toPaintIndex){
      this.paintedIndex = toPaintIndex;
      this.catBlobBGColor = this.screenTextColors[Math.min(this.paintedIndex, this.screenTextColors.length-1)];
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
}
