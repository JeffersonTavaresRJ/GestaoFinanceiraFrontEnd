import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaQuitarFormComponent } from './mov-prevista-quitar-form.component';

describe('MovPrevistaQuitarFormComponent', () => {
  let component: MovPrevistaQuitarFormComponent;
  let fixture: ComponentFixture<MovPrevistaQuitarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaQuitarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaQuitarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
