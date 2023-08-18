import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListElComponent } from './jobs-list-el.component';

describe('JobsListElComponent', () => {
  let component: JobsListElComponent;
  let fixture: ComponentFixture<JobsListElComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsListElComponent]
    });
    fixture = TestBed.createComponent(JobsListElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
