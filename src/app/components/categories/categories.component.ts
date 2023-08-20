import { Component, Input } from '@angular/core';
import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input() public jobData!: Job;
}
