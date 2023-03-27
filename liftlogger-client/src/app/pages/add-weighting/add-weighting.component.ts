import { Component } from '@angular/core';
import { Weighting } from 'src/app/models/Weighting';
import { WeightingsService } from 'src/app/services/weightings.service';
import { GraphInput } from 'src/app/components/graph/graph.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-weighting',
  templateUrl: './add-weighting.component.html',
  styleUrls: ['./add-weighting.component.sass'],
})
export class AddWeightingComponent {
  constructor(private weightingsService: WeightingsService, private router: Router) {}

  /**
   * Data for the new Weighting entry.
   */
  data: Record<string, any> = {};

  /**
   * All the Weightings of the current user.
   */
  historicalWeightings: Weighting[] = [];

  /**
   * Parsed weighting data to display in the graph component.
   */
  graphData: GraphInput[] = [];

  ngOnInit() {
    this.weightingsService.getUserEntries().subscribe(weightings => {
      this.historicalWeightings = weightings;

      this.graphData = this.historicalWeightings.map(w => {
        return {
          date: new Date(w.datetime!).getTime(),
          data: w.weight,
        };
      });
    });
  }

  /**
   * Updates a data value for the new Weighting entry.
   *
   * @param value New valuie to assign
   * @param fieldName Name of the property to change
   */
  onDataChanged(value: number, fieldName: string): void {
    this.data[fieldName] = Number(value);
  }

  /**
   * When the form is submitted (i.e. the Submit button is clicked), fire up
   * the creation of the new entry. Returns the user back to the dashboard.
   */
  onSubmit(): void {
    const weighting = this.data as Weighting;

    this.weightingsService.createEntry(weighting).subscribe(result => {
      alert('New entry added successfully!');
      this.router.navigate(['dashboard']);
    });
  }
}
