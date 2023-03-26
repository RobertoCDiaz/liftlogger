import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoginButtonComponent } from './main-login-button.component';

describe('MainLoginButtonComponent', () => {
  let component: MainLoginButtonComponent;
  let fixture: ComponentFixture<MainLoginButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLoginButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
