import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { Job } from '../models/job.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public jobsSubject$ = new BehaviorSubject<Job[]>([]);
  public jobsOffers$ = this.jobsSubject$.asObservable();
  private _url = 'https://jobs-filter-default-rtdb.firebaseio.com/jobs.json';

  constructor(private _http: HttpClient) {}

  public getJobs(): Subscription {
    return this._http
      .get<{ [key: string]: Job }>(this._url)
      .pipe(
        map((resData: { [key: string]: Job }) => {
          const jobOffers: Job[] = [];
          for (let key in resData) {
            jobOffers.push({ ...resData[key], id: key });
          }
          return jobOffers;
        })
      )
      .subscribe((jobOffers: Job[]) => {
        this.jobsSubject$.next(jobOffers);
      });
  }
}
