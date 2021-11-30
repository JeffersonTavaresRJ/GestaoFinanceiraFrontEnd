import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovPrevistaFormCadastroComponent } from './mov-prevista-form-cadastro.component';

describe('MovPrevistaFormComponent', () => {
  let component: MovPrevistaFormCadastroComponent;
  let fixture: ComponentFixture<MovPrevistaFormCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovPrevistaFormCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovPrevistaFormCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
