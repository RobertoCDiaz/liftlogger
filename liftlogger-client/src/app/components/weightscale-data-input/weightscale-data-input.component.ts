import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weightscale-data-input',
  templateUrl: './weightscale-data-input.component.html',
  styleUrls: ['./weightscale-data-input.component.sass'],
})
export class WeightscaleDataInputComponent {
  data: string = '';
  @Output() dataChanged = new EventEmitter<number>();

  onDataChanged(): void {
    this.dataChanged.emit(Number(this.data));
  }
}
