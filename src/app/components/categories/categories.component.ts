import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Subscription, map, subscribeOn } from 'rxjs';

import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) public jobData!: Job;
  public selectedCategories: string[] = [];
  private _subs = new Subscription();

  constructor(private _categoriesService: CategoriesService) {}

  public ngAfterViewInit(): void {
    this._subs.add(
      this._categoriesService.selectedCategories$.subscribe((res) =>
        console.log(res)
      )
    );
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public captureCategory(inputEl: HTMLInputElement) {
    if (inputEl.checked) {
      const selectedCategories$ = this._categoriesService.selectedCategories$;
      selectedCategories$.next([
        ...selectedCategories$.getValue(),
        inputEl.value,
      ]);
    }
  }
}
