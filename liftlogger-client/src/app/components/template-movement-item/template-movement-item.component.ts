import { Component, Input, inject } from '@angular/core';
import { Movement } from 'src/app/models/MovementModel';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';

/**
 * An item for the TemplateMovementList component. It showcases an individual template.
 */
@Component({
  selector: 'app-template-movement-item',
  templateUrl: './template-movement-item.component.html',
  styleUrls: ['./template-movement-item.component.sass'],
})
export class TemplateMovementItemComponent {
  /**
   * Page's state.
   */
  state: CreateTemplateComponentState = inject(CreateTemplateComponentState);

  /**
   * Movement to display in the component.
   */
  @Input() movement: Movement;

  /**
   * Removes the current Movement from the page's state.
   */
  removeMovement(): void {
    this.state.removeMovement(this.movement);
  }
}
