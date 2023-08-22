import { Component, Input } from '@angular/core';
import { map, subscribeOn } from 'rxjs';

import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input({ required: true }) public jobData!: Job;
  public selectedCategories: string[] = [];

  constructor(private _categoriesService: CategoriesService) {}

  public captureCategory(inputEl: HTMLInputElement) {
    if (inputEl.checked) {
      const selectedCategories$ = this._categoriesService.selectedCategories$;
      selectedCategories$.next([
        ...selectedCategories$.getValue(),
        inputEl.value,
      ]);
      selectedCategories$.subscribe((res) => console.log(res));
    }
  }
}
