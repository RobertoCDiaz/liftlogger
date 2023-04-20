import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuButtonComponent } from './menu-button.component';
import { getElement } from 'src/app/helpers/testing.helper';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // const testTexts: string[] = ['Main Feature', 'Dashboard', 'Start workout'];
  const testCases: { text: string; icon: string; href: string }[] = [
    {
      text: 'Main Feature',
      icon: 'home',
      href: '/',
    },
    {
      text: 'Dashboard',
      icon: 'insights',
      href: '/dashboard',
    },
    {
      text: 'Start workout',
      icon: 'back',
      href: '/workout',
    },
  ];

  it("should render the button's text", () => {
    testCases.forEach(testCase => {
      component.text = testCase.text;

      const textElement: HTMLParagraphElement = getElement(fixture, 'p.content');

      expect(textElement.textContent?.trim()).toBe(testCase.text);
    });
  });

  it('should change anchor hrefs', () => {
    testCases.forEach(testCase => {
      component.href = testCase.href;

      const anchorElement: HTMLAnchorElement = getElement(fixture, 'a.menu-button');

      // anchor's href is automatically appended to host url (e.g. 'http://localhost:9876/' + what we set)
      expect(anchorElement.href.endsWith(testCase.href)).toBeTrue();
    });
  });

  it('should change button icon', () => {
    testCases.forEach(testCase => {
      component.icon = testCase.icon;

      const iconElement: HTMLSpanElement = getElement(fixture, 'span');

      expect(iconElement.textContent?.trim()).toBe(testCase.icon);
    });
  });
});
