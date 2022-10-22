import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: 'questionaire',
    component: QuestionaireComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: '**',
    redirectTo: 'questionaire'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfectShoeModuleRoutingModule { }
