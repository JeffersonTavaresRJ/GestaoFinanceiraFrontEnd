import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaConsultaListComponent } from './mov-prevista-consulta-list.component';

describe('MovPrevistaConsultaListComponent', () => {
  let component: MovPrevistaConsultaListComponent;
  let fixture: ComponentFixture<MovPrevistaConsultaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaConsultaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaConsultaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
