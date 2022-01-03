import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFormaPagamentoComponent } from './drpd-forma-pagamento.component';

describe('FormaPagamentoComponent', () => {
  let component: DropDownFormaPagamentoComponent;
  let fixture: ComponentFixture<DropDownFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownFormaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
