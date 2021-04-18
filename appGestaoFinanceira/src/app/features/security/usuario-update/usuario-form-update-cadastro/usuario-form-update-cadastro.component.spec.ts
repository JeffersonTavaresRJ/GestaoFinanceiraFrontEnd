import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormUpdateCadastroComponent } from './usuario-form-update-cadastro.component';

describe('UsuarioFormUpdateCadastroComponent', () => {
  let component: UsuarioFormUpdateCadastroComponent;
  let fixture: ComponentFixture<UsuarioFormUpdateCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFormUpdateCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormUpdateCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
