import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormCreateComponent } from './usuario-form-create.component';

describe('UsuarioFormCreateComponent', () => {
  let component: UsuarioFormCreateComponent;
  let fixture: ComponentFixture<UsuarioFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
