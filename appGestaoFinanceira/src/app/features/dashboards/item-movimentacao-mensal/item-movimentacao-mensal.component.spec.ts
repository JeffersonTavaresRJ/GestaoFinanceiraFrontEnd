import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMovimentacaoMensalComponent } from './item-movimentacao-mensal.component';

describe('ItemMovimentacaoMensalComponent', () => {
  let component: ItemMovimentacaoMensalComponent;
  let fixture: ComponentFixture<ItemMovimentacaoMensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMovimentacaoMensalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMovimentacaoMensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
