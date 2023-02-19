import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.sass']
})
export class PageHeaderComponent {

  constructor(private router: Router) { }

  goBack(): void {
    this.router.navigate([".."]);
  }

}
