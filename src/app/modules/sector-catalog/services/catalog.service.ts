import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../_models/Company';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  sectorCatalogUrl =
    'http://app.sectorcatalog.be/SectorCatalogBE/feed/v2/digestedcatalogItems?format=json&SecureGuid=' +
    environment.brokerKey;

  private catalogSource = new BehaviorSubject<Company>(null);
  catalog$ = this.catalogSource.asObservable();

  constructor(private http: HttpClient) { }

  getLedgerEntry() {
    return this.http.get(this.sectorCatalogUrl)
      .pipe(
        map((catalog: Company) => {
          this.catalogSource.next(catalog);
          // console.log(this.getCurrentBasketValue());

        })
      );
  }

  getCurrentBasketValue() {
    return this.catalogSource.value;
  }
}
