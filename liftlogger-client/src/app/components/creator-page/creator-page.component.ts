import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToForm } from 'src/app/helpers/types.helper';

/**
 * Defines the shape of the form for a creator page.
 */
export type CreatorFormType = {
  /**
   * Title of the object to be created.
   */
  title: string;

  /**
   * Description of the object to be created.
   */
  description: string;
};

/**
 * FormGroup that uses `CreatorFormType` as base to create a form.
 *
 * @see {@link CreatorFormType}
 */
export type CreatorForm = FormGroup<ToForm<CreatorFormType>>;

/**
 * Serves as a base component for any page that can create a DB entity. It was
 * originally designed to be the base of the template/movement/group creator,
 * but it could be used for many more things.
 */
@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.sass'],
})
export class CreatorPageComponent {
  /**
   * Internal form to store data from the page inputs.
   */
  pageForm: CreatorForm = new FormGroup({
    title: new FormControl<string | null>(null, { validators: [Validators.required] }),
    description: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  /**
   * Name of the page. This wil be placed as the title in the header bar.
   */
  @Input() title: string;

  /**
   * Placeholder for the main input, commonly used for the item's name.
   */
  @Input() inputTitle: string;

  /**
   * Whether the `Create` button should be enabled or not.
   *
   * Any page that uses this base can define their own criteria for when
   * the creation if finally enabled.
   */
  @Input() createEnabled: boolean = false;

  /**
   * Event that fires once the `Create` button is clicked.
   */
  @Output() onCreate = new EventEmitter<void>();

  /**
   * Informs that the page form has changed and emits it.
   *
   * @emits `pageForm` The page form with updated values
   */
  @Output() formChanged = new EventEmitter<CreatorForm>();

  ngOnInit() {
    this.pageForm.valueChanges.subscribe(_ => {
      this.formChanged.emit(this.pageForm);
    });
  }

  constructor(private location: Location) {}

  /**
   * Navigates one page back when `Cancel` is clicked.
   */
  onCancelClicked(): void {
    this.location.back();
  }

  /**
   * Emits the `onCreate` EventEmitter when the `Create` button is clicked.
   */
  onCreateClicked(): void {
    this.onCreate.emit();
  }

  /**
   * Changes the title in the page form.
   *
   * @param value New value for the title
   */
  onTitleChanged(value: string): void {
    this.pageForm.patchValue({
      title: value,
    });
  }

  /**
   * Changes the description in the page form.
   *
   * @param value New value for the description
   */
  onDescriptionChanged(value: string): void {
    this.pageForm.patchValue({
      description: value,
    });
  }
}
