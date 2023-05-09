import { MovementJournalEntry } from '../models/MovementJournalEntry';

export function getEntriesFixture(): MovementJournalEntry[] {
  return JSON.parse(JSON.stringify(entriesFixture));
}

const entriesFixture: MovementJournalEntry[] = [
  {
    // most recent
    date: new Date('2022-03-22'),
    movement_id: 1,
    value: 100,
    session: {
      id: 1,
      start_time: new Date('2022-03-22T08:00:00.000Z'),
      end_time: new Date('2022-03-22T09:00:00.000Z'),
      notes: 'Great workout today!',
      user_email: 'test@example.com',
      sets: [
        { id: 1, movement_id: 1, reps: 5, weight: 100, session_id: 1 },
        { id: 2, movement_id: 1, reps: 5, weight: 100, session_id: 1 },
        { id: 3, movement_id: 1, reps: 5, weight: 110, session_id: 1 },
        { id: 4, movement_id: 1, reps: 4, weight: 120, session_id: 1 },
        { id: 5, movement_id: 1, reps: 4, weight: 120, session_id: 1 },
      ],
    },
  },
  {
    // best
    date: new Date('2022-03-15'),
    movement_id: 1,
    value: 125,
    session: {
      id: 2,
      start_time: new Date('2022-03-15T08:00:00.000Z'),
      end_time: new Date('2022-03-15T09:00:00.000Z'),
      notes: 'Great workout today!',
      user_email: 'test@example.com',
      sets: [
        { id: 11, movement_id: 1, reps: 4, weight: 110, session_id: 2 },
        { id: 12, movement_id: 1, reps: 4, weight: 110, session_id: 2 },
        { id: 13, movement_id: 1, reps: 4, weight: 110, session_id: 2 },
        { id: 14, movement_id: 1, reps: 4, weight: 120, session_id: 2 },
        { id: 15, movement_id: 1, reps: 4, weight: 120, session_id: 2 },
      ],
    },
  },
  {
    // best pr
    date: new Date('2022-03-10'),
    movement_id: 1,
    value: 75,
    session: {
      id: 3,
      start_time: new Date('2022-03-10T08:00:00.000Z'),
      end_time: new Date('2022-03-10T09:00:00.000Z'),
      notes: 'Great workout today!',
      user_email: 'test@example.com',
      sets: [
        { id: 21, movement_id: 1, reps: 7, weight: 180, session_id: 3 },
        { id: 22, movement_id: 1, reps: 8, weight: 120, session_id: 3 },
        { id: 23, movement_id: 1, reps: 5, weight: 110, session_id: 3 },
      ],
    },
  },
];
