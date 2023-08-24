import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent {
  public selectedCategories$!: Observable<string[]>;
  public initial!: Job[];
  constructor(
    private _categoriesService: CategoriesService,
    private _storeService: StoreService
  ) {
    this._getSelectedCategories();
  }

  public deleteCategory(category: string): void {
    const selectedCategories$ = this._categoriesService.selectedCategories$;
    selectedCategories$.next(
      selectedCategories$
        .getValue()
        .filter((element: string) => element !== category)
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
    const selectedCategories$ =
      this._categoriesService.selectedCategories$.asObservable();
    this.selectedCategories$ = selectedCategories$;
  }
}
