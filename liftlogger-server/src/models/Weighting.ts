import { Weighting } from "@prisma/client"

export type WeightingModel = Omit<
  Weighting,
  'id' | 'datetime' | 'water_percentage' | 'protein_percentage' |
  'metabolism' | 'visceral_fal' | 'ignored'
> & {
  id?: number;
  datetime?: Date;
  water_percentage?: number;
  protein_percentage?: number;
  metabolism?: number;
  visceral_fat?: number;
  ignored?: boolean;
}