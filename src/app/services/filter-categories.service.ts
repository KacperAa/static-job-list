import { Injectable, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { CategoriesService } from './categories.service';
import { Job } from '../models/job.interface';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterCategoriesService {
  public jobOffers: Job[];
  constructor(
    private _storeService: StoreService,
    private _categoriesService: CategoriesService
  ) {
    this.jobOffers = this._storeService.jobsSubject$.getValue();
  }

  public filterJobList(): Job[] {
    const jobsOffers = this._storeService.jobsSubject$.getValue();
    const selectedCategories =
      this._categoriesService.selectedCategories$.getValue();
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
