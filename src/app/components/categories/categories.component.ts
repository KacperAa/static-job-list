import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input({ required: true }) public jobData!: Job;
  @Output() public categoryEmitter = new EventEmitter<string>();

  public captureCategory(inputEl: HTMLInputElement) {
    if (inputEl.checked) {
      this.categoryEmitter.emit(inputEl.value);
    }
  }
}
