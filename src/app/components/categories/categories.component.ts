import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputElRole') inputElRole!: ElementRef;
  @ViewChild('inputElLvl') inputElLvl!: ElementRef;
  @ViewChildren('inputElementsLang') inputElementsLang!: QueryList<ElementRef>;
  @Input({ required: true }) public jobData!: Job;

  private _subs = new Subscription();

  constructor(
    private _categoriesService: CategoriesService,
    private _store: StoreService
  ) {}

  public ngAfterViewInit(): void {
    this._subs.add(this._checkItemIfExsisting());
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  public patchCategories(inputEl: HTMLInputElement) {
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

    this._store.jobsSubject$.next(this._categoriesService.filterJobList());
  }

  private _checkItemIfExsisting() {
    this._categoriesService.selectedCategories$.subscribe(
      (selectedCategories: string[]) => {
        const roleIsExsisting = selectedCategories.includes(
          this.inputElRole.nativeElement.value
        );
        const lvlIsExsisting = selectedCategories.includes(
          this.inputElLvl.nativeElement.value
        );
        this._itemIsExsisting(roleIsExsisting, this.inputElRole);
        this._itemIsExsisting(lvlIsExsisting, this.inputElLvl);

        this.inputElementsLang.forEach((item: ElementRef) => {
          const test = selectedCategories.includes(item.nativeElement.value);
          this._itemIsExsisting(test, item);
        });
      }
    );
  }

  private _itemIsExsisting(isExsisting: boolean, item: ElementRef) {
    if (isExsisting) {
      item.nativeElement.checked = true;
    } else {
      item.nativeElement.checked = false;
    }
  }
}
