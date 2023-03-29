import { Movement } from './MovementModel';

/**
 * Represents a group of muscles and its properties.
 */
export type MuscleGroup = {
  /**
   * Unique identifier of the muscle group.
   */
  id: number;

  /**
   * The name of the muscle group.
   */
  name: string;

  /**
   * A brief description of the muscle group.
   */
  description?: string;

  /**
   * Identifier of the parent muscle group, if any.
   */
  parent_group_id?: number;

  /**
   * Email of the owner of this muscle group.
   */
  user_email: string;

  /**
   * Indicates if the muscle group is selected or not.
   */
  checked?: boolean;

  /**
   * Indicates if the muscle group is a primary muscle group or not.
   */
  isPrimary?: boolean;

  /**
   * An array of sub-groups for a muscle group.
   */
  groups?: MuscleGroup[];

  /**
   * List of Movements that workout this MuscleGroup.
   */
  movements?: Movement[];

  /**
   * Parent MuscleGroup for this MuscleGroup.
   */
  parent_group?: MuscleGroup;
};

/**
 * Data required to create a new MuscleGroup.
 */
export type MuscleGroupCreationParams = Omit<
  MuscleGroup,
  'id' | 'user_email' | 'groups' | 'movements' | 'parent_group'
>;

/**
 * Data required to associate a Movement with a MuscleGroup.
 */
export type MuscleGroupForMovement = {
  group_id: number;
  is_primary: boolean;
};
