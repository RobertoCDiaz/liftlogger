/**
 * Describes a Weighting entry. An entry holds data on the users body measurements, such as
 * how much they weight, their fat percentage, total muscle mass, etc.
 */
export type Weighting = {
  /**
   * Identifier for the entry.
   */
  id: number;

  /**
   * Moment in which the user had this specific measurements.
   */
  datetime: Date;

  /**
   * How much the user weight (kg).
   */
  weight: number;

  /**
   * Percentage of how much fat the user has in their body in relation to their weight.
   */
  fat_percentage: number;

  /**
   * Total muscle mass the user has (kg).
   */
  muscle_mass: number;

  /**
   * Percentage of water in the user's body.
   */
  water_percentage?: number;

  /**
   * Percentage of the total mass of the user's body that amount to protein components.
   */
  protein_percentage?: number;

  /**
   * Minimal rate of energy expenditure by humans when at rest.
   */
  metabolism?: number;

  /**
   * Fat stored within the abdominal cavity around several internal organs.
   */
  visceral_fat?: number;

  /**
   * Whether this entry is being ignored in stats/computations/visualizations.
   */
  ignored: boolean;

  /**
   * Identifier for the owner of this entry.
   */
  user_email: string;
};

/**
 * Data required to create a new Weighting entry.
 */
export type WeightingCreationParams = Omit<
  Weighting,
  'id' | 'user_email' | 'datetime' | 'ignored'
> & {
  /**
   * Moment in which the user had this specific measurements. When creating a new entry, it is optional.
   */
  datetime?: Date;
};
