import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRealAnualDashboardComponent } from './plan-real-anual-dashboard.component';

describe('PlanRealAnualDashboardComponent', () => {
  let component: PlanRealAnualDashboardComponent;
  let fixture: ComponentFixture<PlanRealAnualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRealAnualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRealAnualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
