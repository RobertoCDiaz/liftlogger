import { MuscleGroup, MuscleGroupForMovement } from './MuscleGroupModel';
import { Template } from './TemplateModel';

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
  groups?: MuscleGroup[];
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

/**
 * Holds the M:M relationships between what Movements are part of which Templates.
 * It is made an explicit relationship to also hold the `position` property, which indicates the
 * order in which the Movements should appear in the Template.
 */
export type MovementToTemplateModel = {
  /**
   * Identifier for the Movement entity in the relationship.
   */
  movement_id: number;

  /**
   * Identifier for the Template entity in the relationship.
   */
  template_id: number;

  /**
   * Which position should the Movement have inside the Template
   */
  position: number;

  /**
   * Movement entity of the relationship.
   */
  movement?: Movement;

  /**
   * Template entity of the relationship.
   */
  template?: Template;
};
