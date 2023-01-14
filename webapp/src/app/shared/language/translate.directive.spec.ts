import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TranslateDirective } from './translate.directive';

@Component({
  template: ` <div translate="test"></div> `,
})
class TestTranslateDirectiveComponent {}

describe('TranslateDirective Tests', () => {

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        declarations: [TranslateDirective, TestTranslateDirectiveComponent],
      });
    })
  );
  
});
