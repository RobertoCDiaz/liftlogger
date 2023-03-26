import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-template-movement-item',
  templateUrl: './template-movement-item.component.html',
  styleUrls: ['./template-movement-item.component.sass'],
})
export class TemplateMovementItemComponent {
  @Input() id: number = 0;
  @Input() name: String = 'Movement Name';

  @Output() deleteClick = new EventEmitter();

  onDelete(): void {
    this.deleteClick.emit(this.id);
  }
}
