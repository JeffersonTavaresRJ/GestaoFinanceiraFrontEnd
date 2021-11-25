import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaFormComponent } from './mov-prevista-form-cadastro.component';

describe('MovPrevistaFormComponent', () => {
  let component: MovPrevistaFormComponent;
  let fixture: ComponentFixture<MovPrevistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
