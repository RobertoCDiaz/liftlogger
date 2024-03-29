import { Weighting } from '@prisma/client';
import { WeightingCreationParams } from '../models/WeightingModel';

export const weightingFixtures: Weighting[] = [
  {
    id: 1,
    datetime: new Date('2023-02-27T01:32:01'),
    weight: 69.37,
    fat_percentage: 21.73,
    muscle_mass: 51.19,
    water_percentage: 51.78,
    protein_percentage: 19.09,
    metabolism: 1567.56,
    visceral_fat: 9.01,
    ignored: false,
    user_email: 'testing@test.com',
  },
  {
    id: 2,
    datetime: new Date('2023-03-15T14:47:50'),
    weight: 50.35,
    fat_percentage: 22.98,
    muscle_mass: 50.03,
    water_percentage: 54.29,
    protein_percentage: 19.11,
    metabolism: 1571,
    visceral_fat: 9.13,
    ignored: false,
    user_email: 'testing@test.com',
  },
  {
    id: 3,
    datetime: new Date('2023-01-19T13:18:44'),
    weight: 62.92,
    fat_percentage: 22.74,
    muscle_mass: 51.14,
    water_percentage: 51.81,
    protein_percentage: 19.46,
    metabolism: 1592.29,
    visceral_fat: 9.47,
    ignored: false,
    user_email: 'testing@test.com',
  },
  {
    id: 4,
    datetime: new Date('2023-01-22T15:56:23'),
    weight: 58.99,
    fat_percentage: 22,
    muscle_mass: 50.78,
    water_percentage: 50.38,
    protein_percentage: 18.62,
    metabolism: 1561.66,
    visceral_fat: 8.23,
    ignored: false,
    user_email: 'testing@test.com',
  },
  {
    id: 5,
    datetime: new Date('2023-02-16T22:52:45'),
    weight: 69.96,
    fat_percentage: 22.48,
    muscle_mass: 50.91,
    water_percentage: 52.86,
    protein_percentage: 18.14,
    metabolism: 1576.22,
    visceral_fat: 8.57,
    ignored: false,
    user_email: 'testing@test.com',
  },
  {
    id: 6,
    datetime: new Date('2023-02-05T08:30:39'),
    weight: 55.99,
    fat_percentage: 22.05,
    muscle_mass: 50.28,
    water_percentage: 51.78,
    protein_percentage: 19.29,
    metabolism: 1571.55,
    visceral_fat: 8.14,
    ignored: false,
    user_email: 'second@test.com',
  },
  {
    id: 7,
    datetime: new Date('2023-02-07T22:43:23'),
    weight: 61.42,
    fat_percentage: 22.68,
    muscle_mass: 51.38,
    water_percentage: 51.81,
    protein_percentage: 18.16,
    metabolism: 1552.28,
    visceral_fat: 8.4,
    ignored: false,
    user_email: 'second@test.com',
  },
];

export const newWeightingsFixture: WeightingCreationParams[] = [
  {
    datetime: new Date(),
    fat_percentage: 20.2,
    muscle_mass: 50.1,
    user_email: 'another@test.com',
    weight: 68.5,
  },
  {
    datetime: new Date(),
    fat_percentage: 20.2,
    muscle_mass: 50.1,
    user_email: 'second@test.com',
    weight: 68.5,
    metabolism: 1000.1,
    protein_percentage: 19.2,
    visceral_fat: 8.5,
    water_percentage: 54.4,
  },
  {
    datetime: new Date(),
    fat_percentage: 20.2,
    muscle_mass: 50.1,
    user_email: 'second@test.com',
    weight: 68.5,
    metabolism: 1000.1,
    protein_percentage: 19.2,
    visceral_fat: 8.5,
    water_percentage: 54.4,
    ignored: true,
  },
];
