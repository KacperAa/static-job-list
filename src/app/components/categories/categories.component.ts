import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputElRole') inputElRole!: ElementRef;
  @Input({ required: true }) public jobData!: Job;

  private _subs = new Subscription();

  constructor(private _categoriesService: CategoriesService) {}

  public ngAfterViewInit(): void {
    this._subs.add(
      this._categoriesService.selectedCategories$.subscribe(
        (selectedCategories: string[]) => {
          const roleIsExsisting: boolean = selectedCategories.includes(
            this.inputElRole.nativeElement.value
          );
          if (roleIsExsisting) {
            this.inputElRole.nativeElement.checked = true;
          }
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public captureCategory(inputEl: HTMLInputElement) {
    const selectedCategories$ = this._categoriesService.selectedCategories$;
    if (inputEl.checked) {
      selectedCategories$.next([
        ...selectedCategories$.getValue(),
        inputEl.value,
      ]);
    } else {
      selectedCategories$.next(
        selectedCategories$
          .getValue()
          .filter((category: string) => category !== inputEl.value)
      );
    }
  }
}
