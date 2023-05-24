import { Movement } from './MovementModel';

/**
 * A Template stores information about lifting templates, which are pre-defined sets of movements and rep/weight schemes.
 */
export type Template = {
  /**
   * Unique identifier for a Template in DB.
   */
  id: number;

  /**
   * Name of the Template. This is what will usually be displayed to identify a Template.
   */
  name: string;

  /**
   * A description about the Template. Users can write here what kind of movements are meant to
   * be included in this template, which muscle groups they mainly focus on, or whatever they
   * seem necessary and/or appropriate.
   */
  description: string | null;

  /**
   * Email of the owner of this template.
   */
  user_email: string;

  /**
   * List of Movements that belong to this template.
   */
  movements?: Movement[];
};

/**
 * Required data to create a new Template.
 */
export type TemplateCreationParams = Omit<
  Template,
  'id' | 'description' | 'user_email' | 'movements'
> & {
  description?: string;
};

/**
 * Shape of the `body` property for a POST request to create a new template.
 */
export type TemplateCreationRequestParams = {
  /**
   * Data for the new Template.
   */
  template: TemplateCreationParams;

  /**
   * Ids of the movements to be included in the new template.
   */
  movements_ids?: number[];
};

/**
 * Shape of the `body` property for a PUT request to update an existing template.
 */
export type TemplateUpdateRequestParams = {
  /**
   * Data to update the Template with.
   */
  template: TemplateUpdateParams;

  /**
   * Ids of the movements to be included in the new template.
   */
  movements_ids?: number[];
};

/**
 * Editable fields for a Template.
 */
export type TemplateUpdateParams = Partial<Omit<Template, 'id' | 'user_email'>>;
