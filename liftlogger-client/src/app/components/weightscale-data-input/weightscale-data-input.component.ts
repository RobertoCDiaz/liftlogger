import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WeightingCreationParams } from 'src/app/models/WeightingModel';

/**
 * An input component where the user can input their weightscale data information.
 */
@Component({
  selector: 'app-weightscale-data-input',
  templateUrl: './weightscale-data-input.component.html',
  styleUrls: ['./weightscale-data-input.component.sass'],
})
export class WeightscaleDataInputComponent {
  /**
   * What text label to show in the input.
   */
  @Input() label: string;

  /**
   * FormGroup this input belongs to. Basically, is an object that holds multiple
   * values, one of which is the one to be modified by this input.
   */
  @Input() formGroup: FormGroup;

  /**
   * Name of the property to modify in `formGroup`.
   */
  @Input() formProperty: keyof WeightingCreationParams;
}
