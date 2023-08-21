import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-jobs-offers',
  templateUrl: './jobs-offers.component.html',
  styleUrls: ['./jobs-offers.component.scss'],
})
export class JobsOffersComponent implements OnInit {
  public jobsList!: Observable<Job[]>;
  public checkedCategories: string[] = [];

  constructor(private _store: StoreService) {}

  public ngOnInit(): void {
    this.jobsList = this._store.getJobs();
  }

  public captureCategory(inputValue: string): void {
    const isExsist = this.checkedCategories.includes(inputValue);
    if (!isExsist) {
      this.checkedCategories.push(inputValue);
    }

    /*   console.log(this.checkedCategories); */
  }
}
