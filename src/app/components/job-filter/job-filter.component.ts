import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent {
  @Input({ required: true }) public checkedCategories!: string[];
}
