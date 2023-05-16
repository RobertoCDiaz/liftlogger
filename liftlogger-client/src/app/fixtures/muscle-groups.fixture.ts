import { MuscleGroup, MuscleGroupMetadata } from '../models/MuscleGroupModel';

export function getMuscleGroupsFixture(): MuscleGroup[] {
  return JSON.parse(JSON.stringify(muscleGroupsFixture));
}

export function getMetadataFixture(): MuscleGroupMetadata {
  return JSON.parse(JSON.stringify(metadataFixture));
}

const muscleGroupsFixture: MuscleGroup[] = [
  {
    id: 1,
    name: 'Chest',
    description:
      'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
    user_email: 'testing@test.com',
    movements: [
      {
        id: 1,
        name: 'District Metrics Manager',
        description: 'fugit odio in labore voluptas praesentium odit nemo aspernatur asperiores',
        user_email: 'testing@test.com',
        primary_group_id: 1,
      },
      {
        id: 2,
        name: 'Direct Accounts Manager',
        description: 'nobis omnis minima explicabo beatae sunt distinctio ullam occaecati maiores',
        user_email: 'testing@test.com',
        primary_group_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Back',
    description:
      'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
    user_email: 'testing@test.com',
  },
  {
    id: 3,
    name: 'Legs',
    description:
      'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
    user_email: 'testing@test.com',
    movements: [
      {
        id: 3,
        name: 'Internal Communications Representative',
        description:
          'consequatur ab quisquam minus inventore suscipit sapiente inventore asperiores sint',
        user_email: 'testing@test.com',
        primary_group_id: 3,
      },
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'testing@test.com',
        primary_group_id: 3,
      },
    ],
  },
  {
    id: 4,
    name: 'Arms',
    description:
      'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
    user_email: 'testing@test.com',
  },
  {
    id: 5,
    name: 'Biceps',
    description:
      'The biceps are a muscle group located on the front of the upper arm, and they consist of two heads: the long head and the short head. The biceps are responsible for elbow flexion and forearm supination, which means turning the hand from a palm-down to a palm-up position. The biceps are activated during many pulling movements, such as rows and pull-ups, as well as during isolation exercises like bicep curls. Strengthening the biceps can improve the strength and definition of the arms, and can also contribute to improved grip strength.',
    user_email: 'testing@test.com',
    parent_group_id: 4,
  },
  {
    id: 6,
    name: 'Triceps',
    description:
      'The triceps are a muscle group located on the back of the upper arm, and they consist of three heads: the long head, lateral head, and medial head. The triceps are responsible for elbow extension, which means straightening the arm from a bent position. The triceps are activated during many pushing movements, such as push-ups, bench press, and overhead press, as well as during isolation exercises like tricep extensions. Strengthening the triceps can improve the strength and definition of the arms, and can also help with other upper body movements that involve pushing or pressing.',
    user_email: 'testing@test.com',
    parent_group_id: 4,
  },
];

const metadataFixture: MuscleGroupMetadata = {
  movements_count: 8,
  last_trained: new Date(),
  trained_dates: {
    '2022-10-10': 8,
    '2022-11-25': 2,
    '2021-01-08': 9,
    '2021-02-13': 7,
    '2021-03-24': 5,
    '2021-05-06': 1,
    '2021-06-16': 3,
    '2021-07-31': 10,
    '2021-09-09': 4,
    '2021-10-22': 2,
    '2021-11-28': 6,
    '2021-12-30': 8,
    '2022-03-08': 3,
    '2021-07-21': 7,
    '2022-01-19': 2,
    '2021-10-12': 6,
    '2021-12-22': 5,
    '2021-09-29': 1,
    '2022-12-18': 10,
    '2022-10-28': 4,
    '2021-11-09': 9,
    '2021-02-20': 8,
    '2022-05-10': 6,
    '2021-03-13': 7,
    '2021-09-27': 4,
    '2022-11-08': 5,
    '2022-11-18': 10,
    '2021-01-05': 2,
    '2021-06-27': 3,
    '2022-02-02': 6,
    '2021-07-17': 1,
    '2021-08-11': 8,
    '2022-12-01': 7,
    '2021-04-09': 9,
  },
};
