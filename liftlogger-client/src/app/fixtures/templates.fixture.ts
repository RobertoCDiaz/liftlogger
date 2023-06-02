import { Template, TemplateCreationParams } from '../models/TemplateModel';

export function getTemplatesFixture(): Template[] {
  return JSON.parse(JSON.stringify(templatesFixture));
}

export function getNewTemplateFixture(): TemplateCreationParams {
  return JSON.parse(JSON.stringify(newTemplateFixture));
}

const newTemplateFixture: TemplateCreationParams = {
  name: 'New Template',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
};

const templatesFixture: Template[] = [
  {
    id: 1,
    name: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 3,
        template_id: 1,
        position: 6,
        movement: {
          id: 3,
          name: 'National Functionality Liaison',
          description: 'possimus nemo maxime ipsum officia vel a aperiam quo ratione',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 3,
              name: 'Legs',
              description:
                'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 8,
        template_id: 1,
        position: 2,
        movement: {
          id: 8,
          name: 'Human Web Specialist',
          description: 'doloribus velit amet mollitia aut sed libero culpa vero explicabo',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 1,
        position: 1,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 12,
        template_id: 1,
        position: 5,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 15,
        template_id: 1,
        position: 3,
        movement: {
          id: 15,
          name: 'Global Intranet Director',
          description:
            'deleniti quae necessitatibus omnis laudantium molestiae distinctio illo quia commodi',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 1,
        position: 4,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Orchestrator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 12,
        template_id: 2,
        position: 1,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 15,
        template_id: 2,
        position: 2,
        movement: {
          id: 15,
          name: 'Global Intranet Director',
          description:
            'deleniti quae necessitatibus omnis laudantium molestiae distinctio illo quia commodi',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Specialist',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 9,
        template_id: 3,
        position: 4,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 3,
        position: 1,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 3,
        position: 2,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 15,
        template_id: 3,
        position: 5,
        movement: {
          id: 15,
          name: 'Global Intranet Director',
          description:
            'deleniti quae necessitatibus omnis laudantium molestiae distinctio illo quia commodi',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 3,
        position: 3,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Planner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 5,
        template_id: 4,
        position: 2,
        movement: {
          id: 5,
          name: 'Internal Integration Specialist',
          description:
            'consequatur aperiam facere suscipit quidem illo voluptatibus eum alias ullam',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 4,
        position: 3,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 15,
        template_id: 4,
        position: 1,
        movement: {
          id: 15,
          name: 'Global Intranet Director',
          description:
            'deleniti quae necessitatibus omnis laudantium molestiae distinctio illo quia commodi',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Orchestrator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 2,
        template_id: 5,
        position: 5,
        movement: {
          id: 2,
          name: 'Senior Markets Analyst',
          description:
            'eum dignissimos recusandae quam veniam praesentium consequatur modi voluptate esse',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 3,
        template_id: 5,
        position: 6,
        movement: {
          id: 3,
          name: 'National Functionality Liaison',
          description: 'possimus nemo maxime ipsum officia vel a aperiam quo ratione',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 3,
              name: 'Legs',
              description:
                'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 7,
        template_id: 5,
        position: 2,
        movement: {
          id: 7,
          name: 'Future Data Producer',
          description: 'quas temporibus libero unde facilis expedita magni sint ex occaecati',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 9,
        template_id: 5,
        position: 4,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 5,
        position: 7,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 5,
        position: 3,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 5,
        position: 1,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 6,
    name: 'Representative',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 3,
        template_id: 6,
        position: 1,
        movement: {
          id: 3,
          name: 'National Functionality Liaison',
          description: 'possimus nemo maxime ipsum officia vel a aperiam quo ratione',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 3,
              name: 'Legs',
              description:
                'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 12,
        template_id: 6,
        position: 2,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
    ],
  },
  {
    id: 7,
    name: 'Manager',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 5,
        template_id: 7,
        position: 2,
        movement: {
          id: 5,
          name: 'Internal Integration Specialist',
          description:
            'consequatur aperiam facere suscipit quidem illo voluptatibus eum alias ullam',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 8,
        template_id: 7,
        position: 1,
        movement: {
          id: 8,
          name: 'Human Web Specialist',
          description: 'doloribus velit amet mollitia aut sed libero culpa vero explicabo',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 9,
        template_id: 7,
        position: 3,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 10,
        template_id: 7,
        position: 5,
        movement: {
          id: 10,
          name: 'Direct Data Producer',
          description: 'ipsa labore molestias animi neque sint animi quos dolorum repudiandae',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 16,
        template_id: 7,
        position: 4,
        movement: {
          id: 16,
          name: 'District Markets Liaison',
          description:
            'quidem animi quam consequuntur aperiam consequuntur incidunt nostrum magni minus',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 8,
    name: 'Strategist',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 2,
        template_id: 8,
        position: 9,
        movement: {
          id: 2,
          name: 'Senior Markets Analyst',
          description:
            'eum dignissimos recusandae quam veniam praesentium consequatur modi voluptate esse',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 3,
        template_id: 8,
        position: 13,
        movement: {
          id: 3,
          name: 'National Functionality Liaison',
          description: 'possimus nemo maxime ipsum officia vel a aperiam quo ratione',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 3,
              name: 'Legs',
              description:
                'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 5,
        template_id: 8,
        position: 11,
        movement: {
          id: 5,
          name: 'Internal Integration Specialist',
          description:
            'consequatur aperiam facere suscipit quidem illo voluptatibus eum alias ullam',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 7,
        template_id: 8,
        position: 3,
        movement: {
          id: 7,
          name: 'Future Data Producer',
          description: 'quas temporibus libero unde facilis expedita magni sint ex occaecati',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 8,
        template_id: 8,
        position: 5,
        movement: {
          id: 8,
          name: 'Human Web Specialist',
          description: 'doloribus velit amet mollitia aut sed libero culpa vero explicabo',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 9,
        template_id: 8,
        position: 4,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 10,
        template_id: 8,
        position: 2,
        movement: {
          id: 10,
          name: 'Direct Data Producer',
          description: 'ipsa labore molestias animi neque sint animi quos dolorum repudiandae',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 8,
        position: 6,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 12,
        template_id: 8,
        position: 10,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 8,
        position: 8,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 15,
        template_id: 8,
        position: 1,
        movement: {
          id: 15,
          name: 'Global Intranet Director',
          description:
            'deleniti quae necessitatibus omnis laudantium molestiae distinctio illo quia commodi',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 16,
        template_id: 8,
        position: 12,
        movement: {
          id: 16,
          name: 'District Markets Liaison',
          description:
            'quidem animi quam consequuntur aperiam consequuntur incidunt nostrum magni minus',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 8,
        position: 7,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 9,
    name: 'Coordinator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 2,
        template_id: 9,
        position: 8,
        movement: {
          id: 2,
          name: 'Senior Markets Analyst',
          description:
            'eum dignissimos recusandae quam veniam praesentium consequatur modi voluptate esse',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 7,
        template_id: 9,
        position: 4,
        movement: {
          id: 7,
          name: 'Future Data Producer',
          description: 'quas temporibus libero unde facilis expedita magni sint ex occaecati',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 9,
        template_id: 9,
        position: 6,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 10,
        template_id: 9,
        position: 7,
        movement: {
          id: 10,
          name: 'Direct Data Producer',
          description: 'ipsa labore molestias animi neque sint animi quos dolorum repudiandae',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 9,
        position: 1,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 12,
        template_id: 9,
        position: 3,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 9,
        position: 5,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 9,
        position: 2,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
  {
    id: 10,
    name: 'Architect',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
    movements: [
      {
        movement_id: 2,
        template_id: 10,
        position: 9,
        movement: {
          id: 2,
          name: 'Senior Markets Analyst',
          description:
            'eum dignissimos recusandae quam veniam praesentium consequatur modi voluptate esse',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 3,
        template_id: 10,
        position: 3,
        movement: {
          id: 3,
          name: 'National Functionality Liaison',
          description: 'possimus nemo maxime ipsum officia vel a aperiam quo ratione',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 3,
              name: 'Legs',
              description:
                'The legs are a large muscle group located in the lower body, and they consist of several muscle groups, including the quadriceps, hamstrings, glutes, and calves. The legs are responsible for movements that involve hip extension, knee extension or flexion, and ankle plantarflexion or dorsiflexion, such as walking, running, jumping, and squatting. Strengthening the legs can improve athletic performance, overall lower body strength and stability, and can also contribute to improved body composition. Exercises like squats, lunges, deadlifts, and calf raises can help strengthen the leg muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 5,
        template_id: 10,
        position: 7,
        movement: {
          id: 5,
          name: 'Internal Integration Specialist',
          description:
            'consequatur aperiam facere suscipit quidem illo voluptatibus eum alias ullam',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 7,
        template_id: 10,
        position: 10,
        movement: {
          id: 7,
          name: 'Future Data Producer',
          description: 'quas temporibus libero unde facilis expedita magni sint ex occaecati',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 8,
        template_id: 10,
        position: 4,
        movement: {
          id: 8,
          name: 'Human Web Specialist',
          description: 'doloribus velit amet mollitia aut sed libero culpa vero explicabo',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 9,
        template_id: 10,
        position: 12,
        movement: {
          id: 9,
          name: 'Product Program Supervisor',
          description: 'blanditiis maiores facilis aspernatur non odio eaque magnam vel ipsam',
          user_email: 'testing@test.com',
          primary_group_id: 3,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 10,
        template_id: 10,
        position: 1,
        movement: {
          id: 10,
          name: 'Direct Data Producer',
          description: 'ipsa labore molestias animi neque sint animi quos dolorum repudiandae',
          user_email: 'testing@test.com',
          primary_group_id: 4,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
            {
              id: 2,
              name: 'Back',
              description:
                'The back is a large muscle group located on the posterior aspect of the torso, and it consists of several muscle groups, including the latissimus dorsi, trapezius, rhomboids, erector spinae, and others. The back is responsible for movements that involve shoulder extension, scapular retraction, and spinal extension, such as pulling and rowing movements. Strengthening the back can improve posture, stability, and overall upper body strength, and can also help with other movements like deadlifts and pull-ups. Exercises like rows, pull-ups, and lat pulldowns can help strengthen the back muscles.',
              user_email: 'testing@test.com',
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 11,
        template_id: 10,
        position: 2,
        movement: {
          id: 11,
          name: 'Future Group Agent',
          description: 'quas provident voluptate neque tenetur esse repudiandae magni quis quasi',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 12,
        template_id: 10,
        position: 8,
        movement: {
          id: 12,
          name: 'Forward Quality Officer',
          description:
            'occaecati quia magnam nostrum fugit pariatur hic natus temporibus reiciendis',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 13,
        template_id: 10,
        position: 5,
        movement: {
          id: 13,
          name: 'Global Integration Officer',
          description: 'voluptas totam saepe ea explicabo odio nihil laborum reiciendis nesciunt',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
          ],
        },
      },
      {
        movement_id: 16,
        template_id: 10,
        position: 11,
        movement: {
          id: 16,
          name: 'District Markets Liaison',
          description:
            'quidem animi quam consequuntur aperiam consequuntur incidunt nostrum magni minus',
          user_email: 'testing@test.com',
          primary_group_id: 1,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
      {
        movement_id: 17,
        template_id: 10,
        position: 6,
        movement: {
          id: 17,
          name: 'Corporate Division Representative',
          description: 'minus non distinctio quis explicabo repellendus officia velit velit a',
          user_email: 'testing@test.com',
          primary_group_id: 2,
          groups: [
            {
              id: 1,
              name: 'Chest',
              description:
                'The chest is a large muscle group located in the front of the upper body, and it consists of two main muscles: the pectoralis major and the pectoralis minor. The pectoralis major muscle has two heads: the clavicular head, which makes up the upper portion of the chest, and the sternal head, which makes up the lower portion of the chest. The chest is responsible for movements that involve shoulder flexion, adduction, and internal rotation, such as pushing and pressing movements. Exercises like bench press, push-ups, and dumbbell flyes can help strengthen the chest, which can improve upper body strength and aesthetics.',
              user_email: 'testing@test.com',
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
            },
            {
              id: 4,
              name: 'Arms',
              description:
                'The arms consist of two main muscle groups: the biceps and the triceps. The biceps are located on the front of the upper arm, and they are responsible for elbow flexion and supination of the forearm. The triceps are located on the back of the upper arm, and they are responsible for elbow extension. The arms are involved in many upper body movements, such as pushing, pulling, and lifting. Strengthening the arms can improve overall upper body strength and aesthetics, and can also help with many everyday tasks. Exercises like bicep curls, hammer curls, tricep extensions, and push-ups can help strengthen the arm muscles.',
              user_email: 'testing@test.com',
            },
          ],
        },
      },
    ],
  },
];
