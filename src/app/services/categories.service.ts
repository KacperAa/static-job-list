import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { Job } from '../models/job.interface';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public selectedCategories$ = new BehaviorSubject<string[]>([]);
  public filteredData$ = new BehaviorSubject<Job[]>([]);

  constructor(private _storeService: StoreService) {}

  public filterJobList(): Subscription {
    const selectedCategories = this.selectedCategories$.getValue();

    return this._storeService.jobsOffers$
      .pipe(
        map((jobOffers: Job[]) => {
          return jobOffers.filter((offer: Job) => {
            const allOfferCategories = [
              offer.role,
              offer.level,
              ...offer.languages,
            ];

            return selectedCategories.every((category: string) =>
              allOfferCategories.includes(category)
            );
          });
        })
      )
      .subscribe((filteredJobs: Job[]) => {
        this.filteredData$.next(filteredJobs);
      });
  }
}
