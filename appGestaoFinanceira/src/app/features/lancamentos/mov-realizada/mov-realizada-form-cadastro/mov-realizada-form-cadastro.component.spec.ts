import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovRealizadaFormCadastroComponent } from './mov-realizada-form-cadastro.component';

describe('MovRealizadaCreateComponent', () => {
  let component: MovRealizadaFormCadastroComponent;
  let fixture: ComponentFixture<MovRealizadaFormCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovRealizadaFormCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovRealizadaFormCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
