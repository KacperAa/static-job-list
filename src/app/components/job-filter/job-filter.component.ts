import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { FilterCategoriesService } from 'src/app/services/filter-categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {
  public selectedCategories$!: Observable<string[]>;
  constructor(
    private _categoriesService: CategoriesService,
    private _storeService: StoreService
  ) {}

  public ngOnInit(): void {
    this._getSelectedCategories();
  }

  public deleteCategory(category: string): void {
    const selectedCategories$ = this._categoriesService.selectedCategories$;
    selectedCategories$.next(
      selectedCategories$
        .getValue()
        .filter((element: string) => element !== category)
    );

    this._storeService.jobsSubject$.next(
      this._categoriesService.filterJobList()
    );

    if (selectedCategories$.getValue().length === 0) {
      this._storeService.getJobs();
    }
  }

  public clearAll(): void {
    const selectedCategories$ = this._categoriesService.selectedCategories$;
    selectedCategories$.next([]);
  }

  private _getSelectedCategories() {
    this.selectedCategories$ =
      this._categoriesService.selectedCategories$.asObservable();
  }
}
