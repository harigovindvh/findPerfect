import { Injectable } from '@angular/core';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private _datasetService: DatasetService
  ) { }

  getShoesList() {
    const shoesList = this._datasetService.dataset.shoes;
    return shoesList;
  }
}
