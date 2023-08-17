import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _url = 'https://jobs-filter-default-rtdb.firebaseio.com/jobs.json';

  constructor(private _http: HttpClient) {}

  public getJobs() {}
}
