import { MuscleGroup } from '@prisma/client';

/**
 * Actual Params definition.
 *
 * Excludes `id` as it's not necessary for creation. Also, makes `parent_group_id` optional.
 */
export type MuscleGroupCreationParams = Omit<MuscleGroup, 'id' | 'parent_group_id'> & {
  parent_group_id?: number;
};

/**
 * Relationship of belonging of a Movement to a MuscleGroup.
 */
export type MuscleGroupForMovementModel = {
  group_id: number;
  is_primary: boolean;
};

/**
 * Includes extra information for a Muscle Group that is usually
 * computed from other DB tables' information.
 */
export type MuscleGroupMetadata = {
  /**
   * When was the last time a Muscle Groups was trained.
   */
  last_trained?: Date;

  /**
   * Number of movements that belong to a Muscle Group.
   */
  movements_count: number;

  /**
   * A list of dates in which the Muscle Group was trained on (keys), along with
   * the number of sets made for movements of this muscle group (values).
   */
  trained_dates: Record<string, number>;
};

/**
 * Adds a `MuscleGroupMetadata` field to a type.
 */
export type WithMuscleGroupMetadata<TBaseType> = TBaseType & {
  metadata?: MuscleGroupMetadata;
};
