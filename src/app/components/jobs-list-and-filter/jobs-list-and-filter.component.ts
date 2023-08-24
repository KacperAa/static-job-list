import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-jobs-list-and-filter',
  templateUrl: './jobs-list-and-filter.component.html',
  styleUrls: ['./jobs-list-and-filter.component.scss'],
})
export class JobsListAndFilterComponent implements OnInit, OnDestroy {
  public jobsList!: Observable<Job[]>;
  private _subs = new Subscription();

  constructor(
    private _storeService: StoreService,
    private _categoriesService: CategoriesService
  ) {}

  public ngOnInit(): void {
    this._subs.add(this._jobSubjectSub());

    this.jobsList = this._categoriesService.filteredData$;
  }
  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  private _jobSubjectSub(): Subscription {
    return this._storeService.jobsSubject$.subscribe((initialList: Job[]) =>
      this._categoriesService.filteredData$.next(initialList)
    );
  }
}
