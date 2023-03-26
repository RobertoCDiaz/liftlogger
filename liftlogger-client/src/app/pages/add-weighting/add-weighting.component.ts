import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Weighting } from 'src/app/models/Weighting';
import { WeightingsService } from 'src/app/services/weightings.service';

@Component({
  selector: 'app-add-weighting',
  templateUrl: './add-weighting.component.html',
  styleUrls: ['./add-weighting.component.sass'],
})
export class AddWeightingComponent {
  data: Record<string, any> = {};

  constructor(private weightingsService: WeightingsService, private location: Location) {}

  onDataChanged(value: number, fieldName: string): void {
    this.data[fieldName] = Number(value);
  }

  onSubmit(): void {
    const weighting = this.data as Weighting;

    this.weightingsService.createEntry(weighting).subscribe(result => {
      alert('New entry added successfully!');
      this.location.back();
    });
  }
}
