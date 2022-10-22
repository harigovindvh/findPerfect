import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IanswerType, IQuestionType, IratingType } from 'src/app/core/models/model';
import { DataTransferServiceService } from 'src/app/core/services/data-transfer-service.service';
import { QuestionaireService } from './questionaire.service';



@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {
  //initial question id 0
  questionId: number = 0;
  currentQuestion: IQuestionType | undefined;
  loadingData: boolean = true;
  currentRating: IratingType = {
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
    private _dataTransferServiceService: DataTransferServiceService,
    private router: Router
  ) {
    this.getNextQuestion(0);
   }

  ngOnInit(): void {
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
   * @param answer 
   */
  processSelection(answer : IanswerType) {
    this.loadingData = true;
    this.updateRating(answer.ratingIncrease);
    if(typeof(answer.nextQuestion) !== 'number') {
      this._dataTransferServiceService.setData(this.currentRating);
      this.router.navigate(['perfectshoe/result']);
      return;
    }
    this.getNextQuestion(answer.nextQuestion);
  }

  /**
   * Evaluate overall rating based on user selection
   * @param rating latest rating
   */
  updateRating(rating: IratingType) {
    const keys = Object.keys(rating);
    keys.forEach(key => {
        this.currentRating[key] = rating[key] + this.currentRating[key]
    });
  }

}
