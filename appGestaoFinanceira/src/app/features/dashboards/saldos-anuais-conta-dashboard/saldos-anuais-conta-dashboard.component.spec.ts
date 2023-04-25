import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosAnuaisPorContaDashBoardComponent } from './saldos-anuais-conta-dashboard.component';

describe('SaldosAnuaisPorContaDashBoardComponent', () => {
  let component: SaldosAnuaisPorContaDashBoardComponent;
  let fixture: ComponentFixture<SaldosAnuaisPorContaDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldosAnuaisPorContaDashBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldosAnuaisPorContaDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
