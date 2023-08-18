import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-jobs-offers',
  templateUrl: './jobs-offers.component.html',
  styleUrls: ['./jobs-offers.component.scss'],
})
export class JobsOffersComponent implements OnInit {
  constructor(private store: StoreService) {}

  public ngOnInit(): void {
    /*    this.store.getJobs().subscribe((res) => console.log(res)); */
  }
}
