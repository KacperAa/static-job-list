import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  ngAfterViewInit() {
    of(this.checkedCategories).subscribe((res) => console.log(res));
  }

  public captureCategory(inputValue: string): void {
    const isExsist = this.checkedCategories.includes(inputValue);
    if (!isExsist) {
      this.checkedCategories.push(inputValue);
    }
  }
}
