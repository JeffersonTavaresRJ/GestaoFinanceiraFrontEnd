import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaPeriodoAnualDashboardComponent } from './conta-periodo-anual-dashboard.component';

describe('ContaPeriodoAnualDashboardComponent', () => {
  let component: ContaPeriodoAnualDashboardComponent;
  let fixture: ComponentFixture<ContaPeriodoAnualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaPeriodoAnualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaPeriodoAnualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
