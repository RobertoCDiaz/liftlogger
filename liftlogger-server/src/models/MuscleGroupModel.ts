import { MuscleGroup } from '@prisma/client';
import { Prettify } from '../utils/Prettify'

/**
 * Actual Params definition.
 *
 * Excludes `id` as it's not necessary for creation. Also, makes `parent_group_id` optional.
 */
export type MuscleGroupCreationParams = Omit<MuscleGroup, 'id' | 'parent_group_id'> & {
  // type Params = Omit<MuscleGroup, 'id' | 'parent_group_id'> & {
  parent_group_id?: number;
}

/**
 * Export a prettified version of Params with a proper name.
 */
// export type MuscleGroupCreationParams = Prettify<Params>;
