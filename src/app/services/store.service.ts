import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delayWhen,
  map,
  retryWhen,
  take,
  tap,
  timer,
} from 'rxjs';
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
        retryWhen((errors: Observable<Error>) => {
          return errors.pipe(
            delayWhen(() => timer(2000)),
            tap(() => console.log('retrying...')),
            take(4)
          );
        }),
        map((resData: { [key: string]: Job }) => {
          const jobOffers: Job[] = [];
          for (let key in resData) {
            jobOffers.push({ ...resData[key], id: key });
          }

          jobOffers.sort(
            (a: Job, b: Job) =>
              Number(b.new === true && b.featured === true) -
              Number(a.new === true)
          );

          return jobOffers;
        })
      )
      .subscribe((jobOffers: Job[]) => {
        this.jobsSubject$.next(jobOffers);
      });
  }
}
