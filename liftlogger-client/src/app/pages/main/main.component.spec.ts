import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { AppModule } from 'src/app/app.module';
import { getElement } from 'src/app/helpers/testing.helper';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('PageContent Div', () => {
    it('should have content', () => {
      const pageContent = getElement(fixture, 'div.page-content>*');

      expect(pageContent).toBeTruthy();
    });
  });

  it('should put content into the appbar', () => {
    const content = getElement(fixture, '[slot="appbar-content"]');

    expect(content).toBeTruthy();
  });
});
