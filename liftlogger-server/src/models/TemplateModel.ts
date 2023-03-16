import { Template } from "@prisma/client";
import { ModelRequestParams } from "../utils/ModelRequestParams";

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
  movements_ids: number[]
}
