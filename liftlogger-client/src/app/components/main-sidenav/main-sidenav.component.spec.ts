import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidenavComponent } from './main-sidenav.component';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { getComponent, getComponents } from 'src/app/helpers/testing.helper';

describe('MainSidenavComponent', () => {
  let component: MainSidenavComponent;
  let fixture: ComponentFixture<MainSidenavComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSidenavComponent],
      imports: [AppModule],
      providers: [{ provide: Router, useValue: { url: '/' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainSidenavComponent);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleLogout()', () => {
    it("should execute auth service's logout process", () => {
      const logoutSpy = spyOn(authService, 'logOut');

      component.handleLogout();

      expect(logoutSpy).toHaveBeenCalled();
    });
  });

  describe('Logout Item', () => {
    it('should trigger handleLogout()', () => {
      const logoutElement: HTMLAnchorElement = getComponent(fixture, '#logoutItem').nativeElement;

      const functionSpy = spyOn(component, 'handleLogout');

      logoutElement.click();

      expect(functionSpy).toHaveBeenCalled();
    });
  });

  describe('urlMatches()', () => {
    it('should correctly match an url if the current url contains it', () => {
      const testCase: {
        currentUrl: string;
        matchers: { url: string; expectedResult: boolean }[];
      } = {
        currentUrl: '/movements/create',
        matchers: [
          {
            url: '/movements',
            expectedResult: true,
          },
          {
            url: '/movs',
            expectedResult: false,
          },
          {
            url: '/dashboard',
            expectedResult: false,
          },
          {
            url: '/movements/create',
            expectedResult: true,
          },
        ],
      };

      // @ts-ignore: force property value for testing purposes
      router.url = testCase.currentUrl;

      testCase.matchers.forEach(matcher => {
        const result = component.urlMatches(matcher.url);

        expect(result).toBe(matcher.expectedResult);
      });
    });
  });

  describe('SideNav', () => {
    it('should render dynamic items', () => {
      const dynamicItems = getComponents(fixture, '.dynamic');

      expect(dynamicItems).toHaveSize(component.items.length);
    });

    it('should highlight dynamic items that match the current url', () => {
      // @ts-ignore: force property value for testing purposes
      router.url = '/not-a-real-url';
      fixture.detectChanges();
      let highlightedElements = getComponents(fixture, '.item.selected');
      expect(highlightedElements).toHaveSize(0);

      component.items.forEach(item => {
        // @ts-ignore: force property value for testing purposes
        router.url = item.url;
        fixture.detectChanges();
        highlightedElements = getComponents(fixture, '.item.selected');
        expect(highlightedElements).toHaveSize(1);

        const itemLabel: HTMLSpanElement =
          highlightedElements[0].nativeElement.querySelector('.item-label');

        expect(itemLabel.textContent?.trim()).toBe(item.name);
      });
    });
  });
});
