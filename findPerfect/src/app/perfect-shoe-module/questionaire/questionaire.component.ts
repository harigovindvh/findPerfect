import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAnswerType, IQuestionType, IRatingType } from 'src/app/core/models/model';
import { SavedDataService } from 'src/app/core/services/data-transfer-service.service';
import { QuestionaireService } from './questionaire.service';



@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent {
  //initial question id 0
  initialQuestionId: number = 0;

  currentQuestion: IQuestionType | undefined;
  loadingData: boolean = true;
  //initializing current rating to zero
  currentRating: IRatingType = {
    cloud: 0,
    cloudx: 0,
    cloudflow: 0,
    cloudventure: 0,
    cloudsurfer: 0,
    cloudventure_waterproof: 0,
    cloudventure_peak: 0,
    cloudflyer: 0
  };

  constructor(
    private _questionaireService: QuestionaireService,
    private _savedDataService: SavedDataService,
    private router: Router
  ) {
    this.getNextQuestion(this.initialQuestionId);
  }

  /**
   * Fetch new question
   * @param questionId next question Id
   */
  getNextQuestion(questionId: number) {
    this.currentQuestion = this._questionaireService.getNextQuestion(questionId);
    this.loadingData = false;
  }

  /**
   * Selection update process
   * @param answer Selected answer
   */
  processSelection(answer: IAnswerType) {
    this.loadingData = true;
    this.updateRating(answer.ratingIncrease);
    if (typeof (answer.nextQuestion) !== 'number') {
      this._savedDataService.saveRating(this.currentRating);
      this.router.navigate(['perfectshoe/result']);
      return;
    }
    this.getNextQuestion(answer.nextQuestion);
  }

  /**
   * Evaluate overall rating based on user selection
   * @param rating latest rating
   */
  updateRating(rating: IRatingType) {
    const keys = Object.keys(rating);
    keys.forEach(key => {
      this.currentRating[key] = rating[key] + this.currentRating[key]
    });
  }

}
