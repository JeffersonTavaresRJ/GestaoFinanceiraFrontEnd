import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmmitFormComponent } from './button-submmit-form.component';

describe('ButtonSubmmitFormComponent', () => {
  let component: ButtonSubmmitFormComponent;
  let fixture: ComponentFixture<ButtonSubmmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSubmmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSubmmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
