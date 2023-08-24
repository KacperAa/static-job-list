import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isFetching = false;
  private _subs = new Subscription();
  constructor(private _store: StoreService) {}

  public ngOnInit(): void {
    this._subs.add(
      this._store.isFetching$.subscribe((isFetching: boolean) => {
        this.isFetching = isFetching;
      })
    );

    this._init();
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
  private _init() {
    this._store.getJobs();
  }
}
