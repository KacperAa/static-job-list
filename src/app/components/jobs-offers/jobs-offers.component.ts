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

  constructor(private _store: StoreService) {}

  public ngOnInit(): void {
    this.jobsList = this._store.getJobs();
  }
}
