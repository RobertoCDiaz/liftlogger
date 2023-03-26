export type Weighting = {
  id?: number;
  datetime?: Date;
  weight: number;
  fat_percentage: number;
  water_percentage?: number;
  muscle_mass?: number;
  protein_percentage?: number;
  metabolism?: number;
  visceral_fat?: number;
  user_email?: string;
  ignored?: boolean;
};
