import { Weighting } from '@prisma/client';
import { ModelRequestParams } from '../utils/ModelRequestParams';

/**
 * Data required to create a new Weighting entry. It omits the `id` property as it is still not assigned.
 *
 * Also, makes the nullable fields an optional property.
 */
export type WeightingCreationParams = Omit<
  Weighting,
  'id' | 'water_percentage' | 'protein_percentage' | 'metabolism' | 'visceral_fat' | 'ignored'
> & {
  water_percentage?: number | null;
  protein_percentage?: number | null;
  metabolism?: number | null;
  visceral_fat?: number | null;
  ignored?: boolean;
};

/**
 * Data to make a request to create a new Weighting entry. Omit the `user_email` property as it is defined in
 * the server-side. Also, makes `datetime` optional to automatically get current time if no present.
 */
export type WeightingCreationRequestParams = Omit<
  ModelRequestParams<WeightingCreationParams>,
  'datetime'
> & {
  datetime?: Date;
};
