import { LiftingSet } from '@prisma/client';

export function getLiftingSetsFixture(): LiftingSet[] {
  return JSON.parse(JSON.stringify(liftingSetsFixture));
}

const liftingSetsFixture: LiftingSet[] = [
  {
    id: 1,
    movement_id: 10,
    reps: 14,
    weight: 20,
    session_id: 1,
  },
  {
    id: 2,
    movement_id: 9,
    reps: 15,
    weight: 46,
    session_id: 1,
  },
  {
    id: 3,
    movement_id: 1,
    reps: 15,
    weight: 13,
    session_id: 1,
  },
  {
    id: 4,
    movement_id: 3,
    reps: 14,
    weight: 40,
    session_id: 1,
  },
  {
    id: 5,
    movement_id: 3,
    reps: 14,
    weight: 30,
    session_id: 1,
  },
  {
    id: 6,
    movement_id: 10,
    reps: 9,
    weight: 32,
    session_id: 1,
  },
  {
    id: 7,
    movement_id: 9,
    reps: 14,
    weight: 42,
    session_id: 3,
  },
  {
    id: 8,
    movement_id: 9,
    reps: 10,
    weight: 31,
    session_id: 3,
  },
  {
    id: 9,
    movement_id: 6,
    reps: 17,
    weight: 45,
    session_id: 3,
  },
  {
    id: 10,
    movement_id: 2,
    reps: 7,
    weight: 45,
    session_id: 3,
  },
  {
    id: 11,
    movement_id: 17,
    reps: 10,
    weight: 11,
    session_id: 3,
  },
  {
    id: 12,
    movement_id: 8,
    reps: 7,
    weight: 42,
    session_id: 3,
  },
  {
    id: 13,
    movement_id: 16,
    reps: 10,
    weight: 30,
    session_id: 3,
  },
  {
    id: 14,
    movement_id: 2,
    reps: 19,
    weight: 49,
    session_id: 3,
  },
  {
    id: 15,
    movement_id: 17,
    reps: 17,
    weight: 30,
    session_id: 2,
  },
  {
    id: 16,
    movement_id: 6,
    reps: 16,
    weight: 24,
    session_id: 2,
  },
  {
    id: 17,
    movement_id: 2,
    reps: 17,
    weight: 45,
    session_id: 2,
  },
  {
    id: 18,
    movement_id: 1,
    reps: 20,
    weight: 14,
    session_id: 2,
  },
  {
    id: 19,
    movement_id: 2,
    reps: 9,
    weight: 37,
    session_id: 2,
  },
  {
    id: 20,
    movement_id: 2,
    reps: 17,
    weight: 35,
    session_id: 2,
  },
  {
    id: 21,
    movement_id: 14,
    reps: 8,
    weight: 15,
    session_id: 2,
  },
  {
    id: 22,
    movement_id: 8,
    reps: 19,
    weight: 50,
    session_id: 2,
  },
  {
    id: 23,
    movement_id: 7,
    reps: 10,
    weight: 25,
    session_id: 2,
  },
  {
    id: 24,
    movement_id: 10,
    reps: 9,
    weight: 37,
    session_id: 4,
  },
  {
    id: 25,
    movement_id: 5,
    reps: 15,
    weight: 18,
    session_id: 4,
  },
  {
    id: 26,
    movement_id: 8,
    reps: 17,
    weight: 17,
    session_id: 4,
  },
  {
    id: 27,
    movement_id: 15,
    reps: 7,
    weight: 21,
    session_id: 4,
  },
  {
    id: 28,
    movement_id: 10,
    reps: 14,
    weight: 12,
    session_id: 4,
  },
  {
    id: 29,
    movement_id: 6,
    reps: 20,
    weight: 35,
    session_id: 4,
  },
  {
    id: 30,
    movement_id: 1,
    reps: 7,
    weight: 21,
    session_id: 4,
  },
  {
    id: 31,
    movement_id: 11,
    reps: 19,
    weight: 18,
    session_id: 4,
  },
  {
    id: 32,
    movement_id: 11,
    reps: 10,
    weight: 42,
    session_id: 5,
  },
  {
    id: 33,
    movement_id: 3,
    reps: 18,
    weight: 30,
    session_id: 5,
  },
  {
    id: 34,
    movement_id: 8,
    reps: 19,
    weight: 13,
    session_id: 5,
  },
  {
    id: 35,
    movement_id: 13,
    reps: 13,
    weight: 37,
    session_id: 5,
  },
  {
    id: 36,
    movement_id: 1,
    reps: 8,
    weight: 25,
    session_id: 5,
  },
  {
    id: 37,
    movement_id: 4,
    reps: 7,
    weight: 14,
    session_id: 5,
  },
  {
    id: 38,
    movement_id: 5,
    reps: 14,
    weight: 12,
    session_id: 5,
  },
  {
    id: 39,
    movement_id: 9,
    reps: 17,
    weight: 35,
    session_id: 5,
  },
  {
    id: 40,
    movement_id: 2,
    reps: 14,
    weight: 40,
    session_id: 5,
  },
  {
    id: 41,
    movement_id: 4,
    reps: 12,
    weight: 14,
    session_id: 5,
  },
  {
    id: 42,
    movement_id: 7,
    reps: 16,
    weight: 36,
    session_id: 5,
  },
  {
    id: 43,
    movement_id: 3,
    reps: 18,
    weight: 46,
    session_id: 5,
  },
  {
    id: 44,
    movement_id: 14,
    reps: 16,
    weight: 37,
    session_id: 6,
  },
  {
    id: 45,
    movement_id: 2,
    reps: 13,
    weight: 45,
    session_id: 6,
  },
  {
    id: 46,
    movement_id: 14,
    reps: 16,
    weight: 25,
    session_id: 6,
  },
  {
    id: 47,
    movement_id: 3,
    reps: 7,
    weight: 12,
    session_id: 6,
  },
  {
    id: 48,
    movement_id: 1,
    reps: 18,
    weight: 12,
    session_id: 6,
  },
  {
    id: 49,
    movement_id: 8,
    reps: 16,
    weight: 15,
    session_id: 7,
  },
  {
    id: 50,
    movement_id: 11,
    reps: 8,
    weight: 18,
    session_id: 7,
  },
];
