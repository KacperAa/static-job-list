import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.interface';

import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-jobs-list-and-filter',
  templateUrl: './jobs-list-and-filter.component.html',
  styleUrls: ['./jobs-list-and-filter.component.scss'],
})
export class JobsListAndFilterComponent implements OnInit {
  public jobsList!: Observable<Job[]>;

  constructor(private _storeService: StoreService) {}

  public ngOnInit(): void {
    this.jobsList = this._storeService.jobsOffers$;
  }
}
