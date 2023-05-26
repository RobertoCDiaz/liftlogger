import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ToForm } from 'src/app/helpers/types.helper';

/**
 * Holds useful information for update forms.
 */
export type UpdateFormData<T = number> = {
  /**
   * Whether the current instance of the page is a update operation or not.
   */
  isUpdate: boolean;

  /**
   * Original data for the object that will be updated, if one.
   */
  originalData?: CreatorFormType;

  /**
   * Identifier for the object to be updated.
   */
  objectId?: T;
};

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

export class CreatorPageState {
  private form: CreatorForm = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  setFormValues(values: Partial<CreatorFormType>) {
    this.form.patchValue(values);
  }

  getFormValues(): Partial<CreatorFormType> {
    return {
      title: this.form.value.title !== '' ? this.form.value.title! : undefined,
      description: this.form.value.description !== '' ? this.form.value.description! : undefined,
    };
  }

  isFormValid(requireDescription: boolean = false): boolean {
    return (
      // title always has to be different than empty string
      this.getFormValues().title! !== '' &&
      // description only needs to not be empty when it is required
      (!requireDescription || this.getFormValues().description !== '')
    );
  }

  formValueChanges$(): Observable<Partial<CreatorFormType>> {
    return this.form.valueChanges.pipe(map(_ => this.getFormValues()));
  }
}

/**
 * Serves as a base component for any page that can create a DB entity. It was
 * originally designed to be the base of the template/movement/group creator,
 * but it could be used for many more things.
 */
@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.sass'],
  providers: [CreatorPageState],
})
export class CreatorPageComponent {
  state: CreatorPageState = inject(CreatorPageState);

  /**
   * Contains information for when an update operation is being made.
   * By default, it is set to NOT being an update operation.
   */
  @Input() updateFormData: UpdateFormData = { isUpdate: false };

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
   * Fires up when the `Update` button is clicked.
   *
   * `$event: number` Identifier for the object to be updated
   */
  @Output() onUpdate = new EventEmitter<number>();

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
   * Depending on whether the page operation is update or create,
   * triggers the right event for it.
   */
  triggerPageAction(): void {
    if (this.updateFormData.isUpdate) {
      this.onUpdate.emit(this.updateFormData.objectId);
      return;
    }
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
