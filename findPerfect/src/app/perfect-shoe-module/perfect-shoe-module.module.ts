import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectShoeModuleRoutingModule } from './perfect-shoe-module-routing.module';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { ResultComponent } from './result/result.component';
import { LoaderModuleModule } from '../loader-module/loader-module.module';


@NgModule({
  declarations: [
    QuestionaireComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    PerfectShoeModuleRoutingModule,
    LoaderModuleModule
  ]
})
export class PerfectShoeModuleModule { }
