import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  constructor(
    private dataBase: DatasetService
  ) { }

  /**
   * Get next question
   * @param id next question Id
   * @returns next question details
   */
  getNextQuestion(id: number) {
    const questionList = this.dataBase.dataset.questions;
    const nextQuestion = questionList.find(question => question.id === id);
    return nextQuestion;
  }
}
