import { Injectable } from '@angular/core';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private dataBase: DatasetService
  ) { }

  getShoesList() {
    const shoesList = this.dataBase.dataset.shoes;
    return shoesList;
  }
}
