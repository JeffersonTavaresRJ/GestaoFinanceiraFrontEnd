import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovMensalRealDashboardComponent } from './mov-mensal-real-dashboard.component';

describe('MovMensalRealDashboardComponent', () => {
  let component: MovMensalRealDashboardComponent;
  let fixture: ComponentFixture<MovMensalRealDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovMensalRealDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovMensalRealDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
