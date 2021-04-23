import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPageTitleComponent } from './header-page-title.component';

describe('HeaderPageTitleComponent', () => {
  let component: HeaderPageTitleComponent;
  let fixture: ComponentFixture<HeaderPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPageTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
