import { Component } from '@angular/core';
import * as moment from 'moment';
import { GraphInput } from 'src/app/components/graph/graph.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass'],
})
export class LandingComponent {
  constructor(public authService: AuthService) {}

  /**
   * Fake data to display in the graph.
   */
  data: GraphInput[] = new Array(25).fill(0).map((value, index) => ({
    data: Math.pow(index, 2),
    date: moment()
      .subtract(1, 'month')
      .add(index + 1, 'days')
      .toDate(),
  }));
}
