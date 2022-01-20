import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovRealizadaListComponent } from './mov-realizada-list.component';

describe('MovRealizadaListComponent', () => {
  let component: MovRealizadaListComponent;
  let fixture: ComponentFixture<MovRealizadaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovRealizadaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovRealizadaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
