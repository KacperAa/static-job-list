import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { CategoriesService } from './categories.service';
import { Job } from '../models/job.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterCategoriesService {
  constructor(
    private _storeService: StoreService,
    private _categoriesService: CategoriesService
  ) {}

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
    return filteredJobOffers; /* .length > 0 ? filteredJobOffers : jobsOffers; */
    /* to filtrowanie nie dziala jak cza! */
  }
}
