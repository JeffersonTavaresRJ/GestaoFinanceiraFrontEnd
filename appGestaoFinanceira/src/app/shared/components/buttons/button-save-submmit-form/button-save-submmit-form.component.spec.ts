import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSaveSubmmitComponent } from './button-save-submmit-form.component';

describe('ButtonSaveSubmmitComponent', () => {
  let component: ButtonSaveSubmmitComponent;
  let fixture: ComponentFixture<ButtonSaveSubmmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSaveSubmmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSaveSubmmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
