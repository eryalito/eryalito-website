import { Component, OnDestroy } from '@angular/core';
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
  catSaying = '';
  toggleCount = 0;
  textBackoff = 1500;
  showQuestSign = true;
  showCatFrame = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {}

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
