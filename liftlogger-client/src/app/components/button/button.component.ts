import { Component, EventEmitter, Input, Output } from '@angular/core';

// Different Buttons
enum ButtonType {
  'default' = 'default',
  'primary' = 'primary',
  'no-border' = 'no-border'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() type: keyof typeof ButtonType = ButtonType['default'];
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() href?: string;
  @Input() isSubmitButton: boolean = false;

  @Output() onClicked = new EventEmitter();

  onButtonClicked(): void {
    if (this.disabled) {
      return;
    }

    this.onClicked.emit();
  }
}
