import { Template } from '@prisma/client';
import { ModelRequestParams } from '../utils/ModelRequestParams';

/**
 * Required data to create a new Template.
 */
export type TemplateCreationParams = Omit<Template, 'id' | 'description'> & {
  description?: string;
};

/**
 * Shape of the `body` property for a POST request to create a new template.
 */
export type TemplateCreationRequestParams = {
  /**
   * Data for the new Template.
   */
  template: ModelRequestParams<TemplateCreationParams>;

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
