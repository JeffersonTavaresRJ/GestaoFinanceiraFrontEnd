import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaConsultaParamComponent } from './mov-prevista-consulta-param.component';

describe('MovPrevistaConsultaParamComponent', () => {
  let component: MovPrevistaConsultaParamComponent;
  let fixture: ComponentFixture<MovPrevistaConsultaParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaConsultaParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaConsultaParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
