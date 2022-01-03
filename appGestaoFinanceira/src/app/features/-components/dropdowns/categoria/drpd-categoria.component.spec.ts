import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCategoriaComponent } from './drpd-categoria.component';

describe('CategoriaComponent', () => {
  let component: DropDownCategoriaComponent;
  let fixture: ComponentFixture<DropDownCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
