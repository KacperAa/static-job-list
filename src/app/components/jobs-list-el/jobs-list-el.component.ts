import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-jobs-list-el',
  templateUrl: './jobs-list-el.component.html',
  styleUrls: ['./jobs-list-el.component.scss'],
})
export class JobsListElComponent {
  @Input({ required: true }) public jobData!: Job;
  @Output() public categoryEmitter = new EventEmitter<string>();

  public captureCategory(categoryValue: string): void {
    this.categoryEmitter.emit(categoryValue);
  }
}
