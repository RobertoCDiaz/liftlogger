// TODO: Document this component
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-creator-input',
  templateUrl: './creator-input.component.html',
  styleUrls: ['./creator-input.component.sass']
})
export class CreatorInputComponent {

  @Input() isTextArea: boolean = false;
  @Input() placeholder: String = '';
  @Input() fontSize: number = 1;
  @Input() isTitle: boolean = false;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  value: string;

  onValueChanged(): void {
    this.valueChanged.emit(this.value);
  }
}
