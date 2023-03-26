import { Component } from '@angular/core';

@Component({
  selector: 'app-template-movements-list',
  templateUrl: './template-movements-list.component.html',
  styleUrls: ['./template-movements-list.component.sass'],
})
export class TemplateMovementsListComponent {
  // TODO: Dynamic `movements` list
  movements: string[] = ['Pec fly', 'Pushups', 'Bench press'];

  addMovement(): void {
    this.movements.push('nuevo mov');
    // TODO: Implement `addMovement()`
  }

  deleteMovement(id: number): void {
    // TODO: Implement `deleteMovement()`
    this.movements.splice(id, 1);
  }
}
