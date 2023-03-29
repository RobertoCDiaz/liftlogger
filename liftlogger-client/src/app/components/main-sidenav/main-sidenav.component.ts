import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

/**
 * Defines the information required to display an item inside
 * the Sidenav options.
 */
export type SidenavItem = {
  /**
   * Material icon to use in the sidenav item.
   */
  icon: string;

  /**
   * Text to display in the item.
   */
  name: string;

  /**
   * Where the item will redirect the user to.
   */
  url: string;
};

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.sass'],
})
export class MainSidenavComponent {
  // TODO: Delete httpservice dependency
  constructor(
    private authService: AuthService,
    private http: HttpService,
    private router: Router,
  ) {}

  /**
   * URL to the user's profile picture.
   */
  pictureUrl?: string;

  /**
   * Email of the current user.
   */
  userEmail?: string;

  /**
   * Default Sidenav items.
   * TODO: Should it be moved elsewhere?
   */
  items: SidenavItem[] = [
    {
      icon: 'insights',
      name: 'Dashboard',
      url: '/dashboard',
    },
    {
      icon: 'sports_gymnastics',
      name: 'Movements',
      url: '/movements',
    },
    {
      icon: 'event_busy',
      name: 'Templates',
      url: '/templates',
    },
    {
      icon: 'accessibility_new',
      name: 'Muscle Groups',
      url: '/muscle-groups',
    },
    {
      icon: 'fitness_center',
      name: 'Training Journal',
      url: '/journal',
    },
  ];

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      if (!user) {
        return;
      }

      this.pictureUrl = user.picture;
      this.userEmail = user.email;
    });
  }

  /**
   * Logs out from the app.
   */
  handleLogout() {
    this.authService.logOut();
  }

  /**
   * Checks if the current URL has a specific string in it.
   * Used to check if where are currently in a view.
   *
   * @example
   * // checks if where are currently in the dashboard
   * urlMatches('/dashboard');
   *
   *
   * @param url Url to match
   * @returns Whether there's a match or not
   */
  urlMatches(url: string): boolean {
    return this.router.url.includes(url);
  }

  // TODO: Delete
  showTokenKey() {
    this.authService
      .getAuth0Service()
      .getAccessTokenSilently()
      .subscribe(token => {
        alert(token);
      });
  }

  // TODO: Delete
  seedData() {
    this.http.post('seeding/default', {}).subscribe(result => {
      this.http.post('seeding/test', {}).subscribe(res2 => {});
    });
  }
}
