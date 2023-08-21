import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @ViewChild('inputElRole') inputElRole!: ElementRef;
  @ViewChild('inputElLvl') inputElLvl!: ElementRef;
  @ViewChildren('inputElLang') inputElLang!: QueryList<ElementRef>;
  @Input({ required: true }) public jobData!: Job;
  @Input({ required: true }) public checkedCategories!: string[];
  @Output() public categoryEmitter = new EventEmitter<string>();

  public captureCategory(inputEl: HTMLInputElement) {
    if (inputEl.checked) {
      this.categoryEmitter.emit(inputEl.value);
    }

    this.inputElLang.forEach((inputEl: ElementRef) =>
      console.log(inputEl.nativeElement)
    );
  }

  public test(inputValue: string) {}
}
