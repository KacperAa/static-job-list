import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicThemeComponent } from './graphic-theme.component';

describe('GraphicThemeComponent', () => {
  let component: GraphicThemeComponent;
  let fixture: ComponentFixture<GraphicThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicThemeComponent]
    });
    fixture = TestBed.createComponent(GraphicThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
