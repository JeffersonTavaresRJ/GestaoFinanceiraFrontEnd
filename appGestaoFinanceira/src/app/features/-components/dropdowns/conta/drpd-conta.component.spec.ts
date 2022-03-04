import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpdContaComponent } from './drpd-conta.component';

describe('DrpdContaComponent', () => {
  let component: DrpdContaComponent;
  let fixture: ComponentFixture<DrpdContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrpdContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrpdContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
