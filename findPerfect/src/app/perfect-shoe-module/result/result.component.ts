import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IshoeType } from 'src/app/core/models/model';
import { DataTransferServiceService } from 'src/app/core/services/data-transfer-service.service';
import { ResultService } from './result.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  finalRatings: any;
  shoesList: IshoeType[] = [];
  perfectMatchList: any = [];
  perfectMatch: string = '';
  loadingData: boolean = true;
  constructor(
    private _resultService: ResultService,
    private _dataTransferServiceService: DataTransferServiceService,
    private router: Router
  ) {
    this.finalRatings = this._dataTransferServiceService.getData();
    this.finalRatings? this.getShoesList() : this.router.navigate(['home']);
  }

  ngOnInit(): void {
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
    this.shoesList.forEach(shoe => {
      shoe.rating = this.finalRatings[shoe.id];
    });
    this.shoesList.sort((shoeA, shoeB) => {
      return shoeA.rating + shoeB.rating;
    });
    this.perfectMatchList.push(this.shoesList.shift());
    //Updating perfect match if multiple shoes gets identical rating
    while(this.shoesList && this.perfectMatchList[0].rating === this.shoesList[0].rating) {
      this.perfectMatchList.push(this.shoesList.shift());
    }
    this.perfectMatch = this.addCommasAndAnd(this.perfectMatchList);
    this.loadingData = false;
  }

  /**
   * Seperating list items with commas
   * @param list list of items with names of the shoes
   * @returns comma/and seperated string
   */
  addCommasAndAnd(list: IshoeType[]) {
    if (list.length < 3) { return list.map((x: { name: any; }) => x.name).join(' & '); }
    return `${list.slice(0, - 1).map((x: { name: any; }) => x.name).join(', ')}, & ${list[list.length - 1].name}`;
  };

  /**
   * 
   * @param name name of the shoe
   * @returns path for the image
   */
  getImagePath(name: string) {
    return `../../../assets/images/${name}.png`
  }

  trackByShoeId(index: number, shoe: any) {
    return shoe.id;
  }
}
