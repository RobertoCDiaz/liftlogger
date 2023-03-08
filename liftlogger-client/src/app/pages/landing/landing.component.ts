import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth0Service().isAuthenticated$.subscribe(isAuth => {
      if (!isAuth) {
        return;
      }

      this.router.navigate(['/dashboard']);
    })
  }

}
