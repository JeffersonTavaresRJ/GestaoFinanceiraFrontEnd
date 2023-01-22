import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasDespesasAnualDashboardComponent } from './receitas-despesas-anual-dashboard.component';

describe('ReceitasDespesasAnualDashboardComponent', () => {
  let component: ReceitasDespesasAnualDashboardComponent;
  let fixture: ComponentFixture<ReceitasDespesasAnualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitasDespesasAnualDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasDespesasAnualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
