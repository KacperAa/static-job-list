import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Job } from '../models/job.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _url = 'https://jobs-filter-default-rtdb.firebaseio.com/jobs.json';

  constructor(private _http: HttpClient) {}

  public getJobs(): Observable<Job[]> {
    return this._http.get(this._url).pipe(
      map((resData: any) => {
        const jobOffers: Job[] = [];
        for (let key in resData) {
          jobOffers.push({ ...resData[key], id: key });
        }
        return jobOffers;
      })
    );
  }
}
