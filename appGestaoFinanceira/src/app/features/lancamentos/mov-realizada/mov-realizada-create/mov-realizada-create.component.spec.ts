import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovRealizadaCreateComponent } from './mov-realizada-create.component';

describe('MovRealizadaCreateComponent', () => {
  let component: MovRealizadaCreateComponent;
  let fixture: ComponentFixture<MovRealizadaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovRealizadaCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovRealizadaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
