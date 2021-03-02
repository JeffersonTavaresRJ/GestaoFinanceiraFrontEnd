import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasDespesasDashboardComponent } from './receitas-despesas-dashboard.component';

describe('ReceitasDespesasDashboardComponent', () => {
  let component: ReceitasDespesasDashboardComponent;
  let fixture: ComponentFixture<ReceitasDespesasDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitasDespesasDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasDespesasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
