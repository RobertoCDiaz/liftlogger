import { FormControl } from '@angular/forms';

/**
 * Takes in a base type and uses it to create a type to give shape to an Angular FormGroup.
 */
export type ToForm<TBaseType> = { [K in keyof TBaseType]: FormControl<TBaseType[K] | null> };
