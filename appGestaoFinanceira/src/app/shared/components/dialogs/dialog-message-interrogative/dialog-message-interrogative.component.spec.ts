import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageInterrogativeComponent } from './dialog-message-interrogative.component';

describe('DialogMessageInterrogativeComponent', () => {
  let component: DialogMessageInterrogativeComponent;
  let fixture: ComponentFixture<DialogMessageInterrogativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageInterrogativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageInterrogativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
