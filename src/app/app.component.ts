import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isFetching = false;
  constructor(private _store: StoreService) {}

  public ngOnInit(): void {
    this._init();
  }
  private _init() {
    this._store.getJobs();
  }
}
