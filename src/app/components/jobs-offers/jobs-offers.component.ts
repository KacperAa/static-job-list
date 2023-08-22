import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-jobs-offers',
  templateUrl: './jobs-offers.component.html',
  styleUrls: ['./jobs-offers.component.scss'],
})
export class JobsOffersComponent implements OnInit, OnDestroy {
  public jobsList!: Observable<Job[]>;
  public selectedCategories!: string[];
  private _subs = new Subscription();

  constructor(
    private _store: StoreService,
    private _categoriesService: CategoriesService
  ) {}

  public ngOnInit(): void {
    this._subs.add(
      this._categoriesService.selectedCategories$.subscribe(
        (selectedCategories: string[]) => {
          this.selectedCategories = selectedCategories;
        }
      )
    );

    this.jobsList = this._store.jobsOffers$;
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
