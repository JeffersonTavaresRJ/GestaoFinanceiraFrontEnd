import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownPrioridadeComponent } from './drpd-prioridade.component';

describe('PrioridadeComponent', () => {
  let component: DropDownPrioridadeComponent;
  let fixture: ComponentFixture<DropDownPrioridadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownPrioridadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
