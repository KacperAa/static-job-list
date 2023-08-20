import { Component, Input } from '@angular/core';
import { Job } from 'src/app/models/job.interface';

@Component({
  selector: 'app-brand-data',
  templateUrl: './brand-data.component.html',
  styleUrls: ['./brand-data.component.scss'],
})
export class BrandDataComponent {
  @Input({ required: true }) public jobData!: Job;
}
