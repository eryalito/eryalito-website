import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [FormsModule, CommonModule, FontAwesomeModule, ReactiveFormsModule, TranslateModule],
})
export class SharedLibsModule {}
