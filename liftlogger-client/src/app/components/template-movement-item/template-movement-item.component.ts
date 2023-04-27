import { Component } from '@angular/core';

/**
 * An item for the TemplateMovementList component. It showcases an individual template.
 */
@Component({
  selector: 'app-template-movement-item',
  templateUrl: './template-movement-item.component.html',
  styleUrls: ['./template-movement-item.component.sass'],
})
export class TemplateMovementItemComponent {
  onDelete(): void {
    // TODO: Add implementation for template deletion
  }
}
