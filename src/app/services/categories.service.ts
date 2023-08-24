import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../models/job.interface';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public selectedCategories$ = new BehaviorSubject<string[]>([]);
  public jobOffers: Job[];

  constructor(private _storeService: StoreService) {
    this.jobOffers = this._storeService.jobsSubject$.getValue();
  }

  public filterJobList(): Job[] {
    const jobsOffers = this._storeService.jobsSubject$.getValue();
    const selectedCategories = this.selectedCategories$.getValue();
    const filteredJobOffers: Job[] = [];

    jobsOffers.forEach((jobOffer: Job) => {
      const categories = [jobOffer.level, jobOffer.role, ...jobOffer.languages];

      const isJobOfferAlreadyAdded = filteredJobOffers.includes(jobOffer);

      const doesCategoryMatch = categories.some((category) =>
        selectedCategories.includes(category)
      );

      if (!isJobOfferAlreadyAdded && doesCategoryMatch) {
        filteredJobOffers.push(jobOffer);
      }
    });

    return filteredJobOffers.length > 0 ? filteredJobOffers : this.jobOffers;
  }
}
