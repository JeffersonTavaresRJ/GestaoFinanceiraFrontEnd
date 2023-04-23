import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaAnualDashboardComponent } from './saldos-mensais-conta-dashboard.component';

describe('ContaAnualDashboardComponent', () => {
  let component: ContaAnualDashboardComponent;
  let fixture: ComponentFixture<ContaAnualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaAnualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaAnualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
