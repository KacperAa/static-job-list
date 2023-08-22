import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent {
  public selectedCategories$!: Observable<string[]>;
  constructor(private _categoriesService: CategoriesService) {
    this._getSelectedCategories();
  }

  private _getSelectedCategories() {
    const selectedCategories$ =
      this._categoriesService.selectedCategories$.asObservable();
    this.selectedCategories$ = selectedCategories$;
  }
}
