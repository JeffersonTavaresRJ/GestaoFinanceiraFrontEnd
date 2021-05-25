import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMovimentacaoListComponent } from './item-movimentacao-list.component';

describe('ItemMovimentacaoListComponent', () => {
  let component: ItemMovimentacaoListComponent;
  let fixture: ComponentFixture<ItemMovimentacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMovimentacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMovimentacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
