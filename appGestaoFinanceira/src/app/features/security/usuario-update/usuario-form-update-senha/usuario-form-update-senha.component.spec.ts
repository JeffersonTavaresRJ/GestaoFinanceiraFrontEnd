import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormUpdateSenhaComponent } from './usuario-form-update-senha.component';

describe('UsuarioFormUpdateSenhaComponent', () => {
  let component: UsuarioFormUpdateSenhaComponent;
  let fixture: ComponentFixture<UsuarioFormUpdateSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFormUpdateSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormUpdateSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
