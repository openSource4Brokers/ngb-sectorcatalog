import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { createHttpObservable } from './_common/util';
import { map } from 'rxjs/operators';

import { Company } from './_models/Company';

@Component({
  selector: 'app-sector-catalog',
  templateUrl: './sector-catalog.component.html',
  styleUrls: ['./sector-catalog.component.scss'],
})
export class SectorCatalogComponent implements OnInit {
  apiError = false;

  federations$: Company[];
  insurers$: Company[];
  allCatalogs$: Company[];

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    const sectorCatalogUrl =
      'http://app.sectorcatalog.be/SectorCatalogBE/feed/v2/digestedcatalogItems?format=json&SecureGuid=D4114B06-2492-433B-A4E1-9F89017F6D89';

    const http$ = createHttpObservable(sectorCatalogUrl);
    const whatever$ = http$
      .pipe(
        map(res => Object.values(res["Companies"]))
      );

    whatever$.subscribe(
      (res: Company[]) => {
        console.log(res.length);
        this.allCatalogs$ = res;
        this.federations$ = res
          .filter(res => res.Origin == 'FEDERATION');
        this.insurers$ = res
          .filter(res => res.Origin == 'COMPANY');
      },
      noop,
      () => {
        console.log('completed');
        console.log('number of all: ', this.allCatalogs$.length);
        console.log('number of federations: ', this.federations$.length);
        console.log('number of insurers: ', this.insurers$.length);
      }
    );
  }
}
