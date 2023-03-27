import { Weighting } from '@prisma/client';
import { ModelRequestParams } from '../utils/ModelRequestParams';
import { Prettify } from '../utils/Prettify';

/**
 * Data required to create a new Weighting entry. It omits the `id` property as it is still not assigned.
 *
 * Also, makes the nullable fields an optional property.
 */
export type WeightingCreationParams = Omit<
  Weighting,
  'id' | 'water_percentage' | 'protein_percentage' | 'metabolism' | 'visceral_fat' | 'ignored'
> & {
  id?: number;
  water_percentage?: number;
  protein_percentage?: number;
  metabolism?: number;
  visceral_fat?: number;
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
