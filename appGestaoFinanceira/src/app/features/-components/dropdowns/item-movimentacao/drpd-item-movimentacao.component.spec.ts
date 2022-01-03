import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownItemMovimentacaoComponent } from './drpd-item-movimentacao.component';

describe('DropDownItemMovimentacaoComponent', () => {
  let component: DropDownItemMovimentacaoComponent;
  let fixture: ComponentFixture<DropDownItemMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownItemMovimentacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownItemMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
