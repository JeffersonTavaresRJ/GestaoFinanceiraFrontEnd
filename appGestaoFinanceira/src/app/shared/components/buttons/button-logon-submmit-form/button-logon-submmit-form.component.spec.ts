import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLogonSubmmitFormComponent } from './button-logon-submmit-form.component';

describe('ButtonLogonSubmmitFormComponent', () => {
  let component: ButtonLogonSubmmitFormComponent;
  let fixture: ComponentFixture<ButtonLogonSubmmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLogonSubmmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLogonSubmmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
