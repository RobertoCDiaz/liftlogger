// TODO: Document this component
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.sass'],
})
export class CreatorPageComponent {

  @Input() title: String = '$title';
  @Input() inputTitle: String = '$inputTitle';
  @Input() createEnabled: boolean = false;

  @Output() onCreate = new EventEmitter();
  @Output() titleChanged = new EventEmitter<string>();
  @Output() descriptionChanged = new EventEmitter<string>();

  constructor(private router: Router) { }

  onCancelClicked(): void {
    this.router.navigate([".."]);
  }

  onCreateClicked(): void {
    this.onCreate.emit();
  }

  onTitleChanged(value: string): void {
    this.titleChanged.emit(value);
  }

  onDescriptionChanged(value: string): void {
    this.descriptionChanged.emit(value);
  }

}
