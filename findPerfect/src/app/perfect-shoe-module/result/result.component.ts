import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRatingType, IShoeType } from 'src/app/core/models/model';
import { SavedDataService } from 'src/app/core/services/data-transfer-service.service';
import { ResultService } from './result.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  finalRatings: IRatingType | null;
  shoesList: IShoeType[] = [];
  perfectMatchList: IShoeType[] = [];
  similarList: IShoeType[] = [];
  perfectMatch: string = '';
  loadingData: boolean = true;
  constructor(
    private _resultService: ResultService,
    private _savedDataService: SavedDataService,
    private router: Router
  ) {
    this.finalRatings = this._savedDataService.fetchRating();
    this.finalRatings ? this.getShoesList() : this.router.navigate(['home']);
  }

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    //loader screen simulation since no api's being called
    setTimeout(() => this.loadingData = false, 1000);
  }

  /**
   * Fetch whole list of shoes
   */
  getShoesList() {
    this.shoesList = this._resultService.getShoesList();
    this.valuateResult();
  }

  /**
   * Evaluate result based on user preference
   */
  valuateResult() {
    this.shoesList.forEach(x => {
      x.rating = this.finalRatings ? this.finalRatings[x.id] : null;
    });
    this.shoesList.sort((a, b) => {
      return a.rating + b.rating;
    });
    let topRating = this.shoesList[0].rating;
    this.shoesList.forEach(shoe => {
      if (shoe.rating === topRating) {
        this.perfectMatchList.push(shoe);
      } else {
        this.similarList.push(shoe);
      }
    });
    this.perfectMatch = this.addCommasAndAnd(this.perfectMatchList);
  }

  /**
   * Seperating list items with commas
   * @param list list of items with names of the shoes
   * @returns comma/and seperated string
   */
  addCommasAndAnd(list: IShoeType[]) {
    if (list.length < 3) { return list.map((x: { name: any; }) => x.name).join(' & '); }
    return `${list.slice(0, - 1).map((x: { name: any; }) => x.name).join(', ')}, & ${list[list.length - 1].name}`;
  };

  /**
   * Track changes of foreach loop in html //part of Angular performance optimization
   * @param index 
   * @param shoe 
   * @returns 
   */
  trackByShoeId(index: number, shoe: IShoeType) {
    return shoe.id;
  }
}
