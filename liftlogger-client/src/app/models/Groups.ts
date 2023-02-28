/**
 * Represents a group of muscles and its properties.
 */
export type Group = {
  /**
   * Unique identifier of the muscle group.
   */
  id?: number;

  /**
   * The name of the muscle group.
   */
  name: string,

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
  user_email?: number;

  /**
   * Indicates if the muscle group is selected or not.
   */
  checked?: boolean,

  /**
   * Indicates if the muscle group is a primary muscle group or not.
   */
  isPrimary?: boolean,

  /**
   * An array of sub-groups for a muscle group.
   */
  groups?: Group[]
}

/**
 * An array of mock `Group` objects for testing or demonstration purposes.
 */
export const MOCK_GROUPS: Group[] = [
  {
    name: 'Chest',
    groups: [
      { name: 'Upper chest' },
      { name: 'Middle chest' },
      { name: 'Bottom chest' },
    ]
  },
  {
    name: 'Back',
    groups: [
      { name: 'Traps' },
      { name: 'Lats' },
    ]
  },
  {
    name: 'Legs',
    groups: [
      { name: 'Glutes' },
      { name: 'Quads' },
      { name: 'Hamstrings' },
      { name: 'Calves' },
    ]
  },
  {
    name: 'Arms',
    groups: [
      {
        name: 'Shoulders',
        groups: [
          { name: 'Posterior delts' },
          { name: 'Lateral delts' },
          { name: 'Rear delts' },
        ]
      },
      { name: 'Biceps' },
      { name: 'Triceps' },
      { name: 'Forearms' },
    ]
  }
];