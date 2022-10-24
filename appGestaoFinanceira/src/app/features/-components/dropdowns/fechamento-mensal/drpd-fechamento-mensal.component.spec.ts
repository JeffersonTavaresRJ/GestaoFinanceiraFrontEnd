import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFechamentoMensalComponent } from './drpd-fechamento-mensal.component';

describe('FechamentoMensalComponent', () => {
  let component: DropDownFechamentoMensalComponent;
  let fixture: ComponentFixture<DropDownFechamentoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownFechamentoMensalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFechamentoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
