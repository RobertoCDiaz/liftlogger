import { Movement } from '@prisma/client';

export function getMovementsFixture(): Movement[] {
  return JSON.parse(JSON.stringify(movementsFixture));
}

const movementsFixture: Movement[] = [
  {
    id: 1,
    name: 'District Metrics Manager',
    description: 'fugit odio in labore voluptas praesentium odit nemo aspernatur asperiores',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 2,
    name: 'Direct Accounts Technician',
    description: 'nobis omnis minima explicabo beatae sunt distinctio ullam occaecati maiores',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 3,
    name: 'Internal Communications Representative',
    description:
      'consequatur ab quisquam minus inventore suscipit sapiente inventore asperiores sint',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 4,
    name: 'Direct Markets Supervisor',
    description:
      'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
    user_email: 'testing@test.com',
    primary_group_id: 3,
  },
  {
    id: 5,
    name: 'Dynamic Configuration Manager',
    description:
      'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 6,
    name: 'Future Research Representative',
    description:
      'minus reiciendis odit dolorum exercitationem quaerat deleniti expedita enim optio',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 7,
    name: 'Corporate Identity Officer',
    description: 'blanditiis corrupti aspernatur vero occaecati beatae natus blanditiis quaerat et',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 8,
    name: 'Lead Identity Producer',
    description: 'alias doloribus voluptas quisquam beatae ratione nihil possimus neque natus',
    user_email: 'testing@test.com',
    primary_group_id: 4,
  },
  {
    id: 9,
    name: 'Human Usability Executive',
    description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 10,
    name: 'International Usability Assistant',
    description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 11,
    name: 'Internal Creative Supervisor',
    description: 'porro deserunt nisi quos quidem libero fugiat eaque consequatur odio',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 12,
    name: 'Product Applications Strategist',
    description:
      'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 13,
    name: 'District Solutions Liaison',
    description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
    user_email: 'testing@test.com',
    primary_group_id: 3,
  },
  {
    id: 14,
    name: 'Dynamic Assurance Associate',
    description:
      'corporis adipisci voluptatem quaerat expedita dolorum vitae saepe excepturi corporis',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 15,
    name: 'Chief Security Associate',
    description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 16,
    name: 'Senior Integration Analyst',
    description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
    user_email: 'testing@test.com',
    primary_group_id: 4,
  },
  {
    id: 17,
    name: 'Investor Accountability Executive',
    description: 'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 18,
    name: 'Direct Metrics Agent',
    description: 'dolorum nulla placeat doloribus explicabo in sed enim quia cumque',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 19,
    name: 'Senior Directives Planner',
    description: 'facilis distinctio suscipit officia eligendi fuga incidunt adipisci iure dolores',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
  {
    id: 20,
    name: 'Global Configuration Engineer',
    description: 'quisquam qui autem possimus sit modi cupiditate reprehenderit ea blanditiis',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 21,
    name: 'Central Factors Specialist',
    description: 'quis expedita autem vitae laboriosam assumenda sunt aut ex tempore',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 22,
    name: 'Future Paradigm Associate',
    description: 'deleniti nihil beatae fugiat quo fugit nisi molestias quis nihil',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 23,
    name: 'Direct Group Facilitator',
    description: 'reiciendis facilis eveniet natus maiores nemo tempore illo illo adipisci',
    user_email: 'testing@test.com',
    primary_group_id: 3,
  },
  {
    id: 24,
    name: 'Senior Program Assistant',
    description: 'occaecati perferendis voluptates laboriosam qui voluptas magni cum qui eaque',
    user_email: 'testing@test.com',
    primary_group_id: 1,
  },
  {
    id: 25,
    name: 'National Branding Analyst',
    description: 'eligendi rem necessitatibus deleniti quaerat atque ea eaque mollitia ipsa',
    user_email: 'testing@test.com',
    primary_group_id: 2,
  },
];

/**
 * Stores to which MuscleGroups belong each Movement from their corresponding fixtures.
 */
export const groupsForMovementsFixture: Record<string, { id: number }[]> = {
  '1': [{ id: 2 }, { id: 3 }, { id: 4 }],
  '2': [{ id: 2 }, { id: 1 }],
  '3': [{ id: 2 }, { id: 4 }, { id: 1 }],
  '4': [{ id: 3 }, { id: 1 }],
  '5': [{ id: 2 }, { id: 3 }],
  '6': [{ id: 4 }, { id: 1 }],
  '7': [{ id: 2 }, { id: 3 }],
  '8': [{ id: 3 }, { id: 4 }],
  '9': [{ id: 3 }, { id: 1 }],
  '10': [{ id: 2 }, { id: 3 }, { id: 4 }],
  '11': [{ id: 3 }, { id: 1 }],
  '12': [{ id: 2 }, { id: 3 }, { id: 4 }],
  '13': [{ id: 3 }, { id: 4 }, { id: 1 }],
  '14': [{ id: 3 }, { id: 4 }, { id: 1 }],
  '15': [{ id: 2 }, { id: 3 }, { id: 4 }],
  '16': [{ id: 3 }, { id: 4 }],
  '17': [{ id: 2 }, { id: 1 }],
  '18': [{ id: 2 }, { id: 4 }, { id: 1 }],
  '19': [{ id: 2 }],
  '20': [{ id: 3 }, { id: 4 }, { id: 1 }],
  '21': [{ id: 3 }, { id: 1 }],
  '22': [{ id: 2 }, { id: 1 }],
  '23': [{ id: 3 }, { id: 4 }, { id: 1 }],
  '24': [{ id: 4 }, { id: 1 }],
  '25': [{ id: 2 }, { id: 1 }],
};
