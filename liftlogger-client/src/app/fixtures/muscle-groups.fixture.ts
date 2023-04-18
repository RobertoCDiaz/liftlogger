import { MuscleGroup } from '../models/MuscleGroupModel';

export const muscleGroupsFixture: MuscleGroup[] = [
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
];
