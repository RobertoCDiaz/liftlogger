import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-sidenav',
  templateUrl: './main-sidenav.component.html',
  styleUrls: ['./main-sidenav.component.sass']
})
export class MainSidenavComponent {
  pictureUrl?: string;
  userEmail?: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      if (!user) {
        return;
      }

      this.pictureUrl = user.picture;
      this.userEmail = user.email

      console.log(this.pictureUrl, this.userEmail)
    })
  }

  handleLogout() {
    this.authService.logOut();
  }

}
