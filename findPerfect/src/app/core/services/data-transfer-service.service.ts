import { Injectable } from '@angular/core';
import { IRatingType } from 'src/app/core/models/model';

@Injectable({
  providedIn: 'root'
})
export class SavedDataService {
  private ratingData: IRatingType | null = null;
  // #region <Transfer shoe rating  data> 
  /**
   * save user rating
   * @param data shoes rating
   */
  saveRating(data: IRatingType) {
    this.ratingData = data;
  }

  /**
   * fetch user rating
   * @returns 
   */
  fetchRating() {
    const rating = this.ratingData;
    this.clearRatingData();
    return rating;
  }

  clearRatingData() {
    this.ratingData = null;
  }
  // #endregion
}
