import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.sass'],
})
export class PageHeaderComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
