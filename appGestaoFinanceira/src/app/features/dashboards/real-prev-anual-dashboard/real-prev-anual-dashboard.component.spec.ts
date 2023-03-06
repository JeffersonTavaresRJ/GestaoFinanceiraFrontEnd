import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPrevAnualDashboardComponent } from './real-prev-anual-dashboard.component';

describe('RealPrevAnualDashboardComponent', () => {
  let component: RealPrevAnualDashboardComponent;
  let fixture: ComponentFixture<RealPrevAnualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealPrevAnualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealPrevAnualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
