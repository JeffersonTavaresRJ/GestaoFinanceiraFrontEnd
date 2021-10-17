import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaFormControlesComponent } from './mov-prevista-form-controles.component';

describe('MovPrevistaFormControlesComponent', () => {
  let component: MovPrevistaFormControlesComponent;
  let fixture: ComponentFixture<MovPrevistaFormControlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaFormControlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaFormControlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
