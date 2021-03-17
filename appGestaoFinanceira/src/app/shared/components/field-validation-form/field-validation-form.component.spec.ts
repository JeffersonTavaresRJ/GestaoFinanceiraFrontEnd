import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldValidationFormComponent } from './field-validation-form.component';

describe('FieldValidationFormComponent', () => {
  let component: FieldValidationFormComponent;
  let fixture: ComponentFixture<FieldValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldValidationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
