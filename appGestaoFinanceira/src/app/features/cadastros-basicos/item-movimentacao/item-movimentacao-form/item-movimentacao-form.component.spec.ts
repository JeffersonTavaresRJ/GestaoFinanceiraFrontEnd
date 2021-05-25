import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMovimentacaoFormComponent } from './item-movimentacao-form.component';

describe('ItemMovimentacaoFormComponent', () => {
  let component: ItemMovimentacaoFormComponent;
  let fixture: ComponentFixture<ItemMovimentacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMovimentacaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMovimentacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
