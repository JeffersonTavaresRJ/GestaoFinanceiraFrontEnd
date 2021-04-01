import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormDeleteComponent } from './usuario-form-delete.component';

describe('UsuarioFormDeleteComponent', () => {
  let component: UsuarioFormDeleteComponent;
  let fixture: ComponentFixture<UsuarioFormDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFormDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
