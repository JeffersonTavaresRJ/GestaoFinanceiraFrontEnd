import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInterrogativeFormComponent } from './modal-interrogative-form.component';

describe('ModalInterrogativeFormComponent', () => {
  let component: ModalInterrogativeFormComponent;
  let fixture: ComponentFixture<ModalInterrogativeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInterrogativeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInterrogativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
