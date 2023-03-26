import { Movement } from '@prisma/client';
import { ModelRequestParams } from '../utils/ModelRequestParams';
import { MuscleGroupForMovementModel } from './MuscleGroupModel';

/**
 * Omits `id` from the Movement type. It also adds a `muscleGroups` obligatory property, which will
 * be the Muscle Groups this specific Movement belongs to.
 */
export type MovementCreationParams = Omit<Movement, 'id' | 'description' | 'primary_group_id'> & {
  description?: string;
  primary_group_id?: number;
};

/**
 * Shape of the body for a POST request to create a new movement. It should have the movement data as `movement`,
 * and the list of groups it belongs, and whether they are a primary group or not.
 */
export type MovementCreationRequestParams = {
  movement: ModelRequestParams<MovementCreationParams>;
  muscleGroups: MuscleGroupForMovementModel[];
};
