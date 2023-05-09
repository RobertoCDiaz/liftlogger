import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { AppModule } from 'src/app/app.module';
import { getElement } from 'src/app/helpers/testing.helper';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render landing section', () => {
    const el = getElement(fixture, 'section.landing');

    expect(el).toBeTruthy();
  });

  it('should render features section', () => {
    const el = getElement(fixture, 'div.features');

    expect(el).toBeTruthy();
  });
});
