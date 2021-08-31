import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaListComponent } from './mov-prevista-list.component';

describe('MovPrevistaListComponent', () => {
  let component: MovPrevistaListComponent;
  let fixture: ComponentFixture<MovPrevistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
