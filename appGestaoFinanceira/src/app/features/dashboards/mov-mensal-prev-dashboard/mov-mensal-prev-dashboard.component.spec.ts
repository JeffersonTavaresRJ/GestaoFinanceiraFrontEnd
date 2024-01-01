import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovMensalPrevDashboardComponent } from './mov-mensal-prev-dashboard.component';

describe('MovMensalPrevDashboardComponent', () => {
  let component: MovMensalPrevDashboardComponent;
  let fixture: ComponentFixture<MovMensalPrevDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovMensalPrevDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovMensalPrevDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
