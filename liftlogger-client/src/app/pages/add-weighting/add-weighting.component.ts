import { Component } from '@angular/core';
import { Weighting, WeightingCreationParams } from 'src/app/models/WeightingModel';
import { WeightingsService } from 'src/app/services/weightings.service';
import { GraphInput } from 'src/app/components/graph/graph.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  weightingForm: FormGroup = new FormGroup<{ [K in keyof WeightingCreationParams]: FormControl }>({
    weight: new FormControl(undefined, { validators: Validators.required }),
    fat_percentage: new FormControl(undefined, { validators: Validators.required }),
    muscle_mass: new FormControl(undefined, { validators: Validators.required }),
    water_percentage: new FormControl(undefined),
    protein_percentage: new FormControl(undefined),
    metabolism: new FormControl(undefined),
    visceral_fat: new FormControl(undefined),
  });

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
          date: w.datetime!,
          data: w.weight,
        };
      });
    });
  }

  /**
   * When the form is submitted (i.e. the Submit button is clicked), fire up
   * the creation of the new entry. Returns the user back to the dashboard.
   */
  onSubmit(): void {
    if (this.weightingForm.invalid) {
      alert('Please, fill in all required fields (marked with an *)');
      return;
    }

    this.weightingsService
      .createEntry(this.weightingForm.value as WeightingCreationParams)
      .subscribe(result => {
        alert('New entry added successfully!');
        this.router.navigate(['dashboard']);
      });
  }
}
