import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerPageComponent } from './drawer-page.component';
import { AppModule } from 'src/app/app.module';
import { getComponent } from 'src/app/helpers/testing.helper';
import { AppBarComponent } from '../app-bar/app-bar.component';

describe('DrawerPageComponent', () => {
  let component: DrawerPageComponent;
  let fixture: ComponentFixture<DrawerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawerPageComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an app-bar', () => {
    const appBarElement = getComponent(fixture, 'app-bar');

    expect(appBarElement).toBeTruthy();
  });

  it('should set pageName as the title for the page', () => {
    const testTitles: string[] = ['Test title', 'Another title', 'Last title   '];

    const appBar: AppBarComponent = getComponent(fixture, 'app-bar').componentInstance;

    testTitles.forEach(title => {
      component.pageName = title;
      fixture.detectChanges();

      expect(appBar.title).toBe(title);
    });
  });

  it("should set the appbar's action icon and url", () => {
    const appBar: AppBarComponent = getComponent(fixture, 'app-bar').componentInstance;

    const expectedIcon: string = 'home';
    const expectedUrl: string = '/dashboard';

    component.actionIcon = expectedIcon;
    component.actionUrl = expectedUrl;
    fixture.detectChanges();

    expect(appBar.actionIcon).toBe(expectedIcon);
    expect(appBar.actionUrl).toBe(expectedUrl);
  });
});
