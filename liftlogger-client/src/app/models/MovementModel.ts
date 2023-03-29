import { Group, MuscleGroupForMovement } from './Group';

/**
 * Represent a Movement entity from DB.
 */
export type Movement = {
  /**
   * Identifier for the Movement in DB.
   */
  id: number;

  /**
   * Name assigned to this Movement by its owner.
   */
  name: string;

  /**
   * Description given to this Movement.
   */
  description: string;

  /**
   * Email of the owner of this Movement.
   */
  user_email: string;

  /**
   * Identifier of the primary Muscle Group of this Movement.
   */
  primary_group_id?: number;

  /**
   * List of Muscle Groups this Movement belongs to.
   */
  groups: Group[];
};

/**
 * Data required to create a new Movement.
 */
export type MovementCreationParams = Omit<Movement, 'id' | 'user_email' | 'groups'>;

/**
 * What's required from the server to make a Movement creation request (`POST /movements`).
 */
export type MovementCreationRequestParams = {
  movement: MovementCreationParams;
  muscleGroups: MuscleGroupForMovement[];
};
