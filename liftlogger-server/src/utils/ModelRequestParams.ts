/**
 * Transforms a Model type to ommit the `user_email` property.
 *
 * This was created mainly to give a shape to the body of model-instances creation requests.
 */
export type ModelRequestParams<ModelType> = Omit<ModelType, 'user_email'>;
