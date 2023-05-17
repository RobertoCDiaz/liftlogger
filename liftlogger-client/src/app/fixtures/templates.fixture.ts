import { Template, TemplateCreationParams } from '../models/TemplateModel';

export function getTemplatesFixture(): Template[] {
  return JSON.parse(JSON.stringify(templatesFixture));
}

export function getNewTemplateFixture(): TemplateCreationParams {
  return JSON.parse(JSON.stringify(newTemplateFixture));
}

const newTemplateFixture: TemplateCreationParams = {
  name: 'Supervisor',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
};

const templatesFixture: Template[] = [
  {
    id: 1,
    name: 'Supervisor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Agent',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Chest',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Chest',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Chest',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Representative',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Coordinator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Agent',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Planner',
    description: null,
    user_email: 'robertocdiazsanchez@gmail.com',
    movements: [
      {
        id: 4,
        name: 'Direct Markets Supervisor',
        description:
          'praesentium laboriosam minima consequatur vitae a possimus voluptates rem accusamus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 5,
        name: 'Dynamic Configuration Manager',
        description:
          'modi eligendi ratione veniam temporibus eligendi reprehenderit iure rem voluptate',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 9,
        name: 'Human Usability Executive',
        description: 'dolores commodi quis reiciendis architecto eaque sint voluptate quam ea',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 1,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 10,
        name: 'International Usability Assistant',
        description: 'illo nostrum maxime neque voluptas non repellat sapiente alias perspiciatis',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 12,
        name: 'Product Applications Strategist',
        description:
          'facilis aperiam quibusdam dolores tempore rem molestiae error eveniet accusantium',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 13,
        name: 'District Solutions Liaison',
        description: 'voluptatibus aut hic deleniti praesentium placeat modi quasi totam iusto',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 3,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 15,
        name: 'Chief Security Associate',
        description: 'est distinctio repellat tempora temporibus non quae ipsam quaerat possimus',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 3,
            name: 'Legs',
            description:
              'voluptatum dignissimos ab beatae magni est laboriosam nostrum a nobis quia impedit',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Senior Integration Analyst',
        description: 'repudiandae quibusdam modi quae tempora porro occaecati eos eos velit',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 4,
        groups: [
          {
            id: 1,
            name: 'Chest',
            description:
              'repellendus quidem sequi id natus commodi cumque reprehenderit quod natus corrupti ut',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Investor Accountability Executive',
        description:
          'esse dolor totam explicabo veritatis a aperiam necessitatibus numquam similique',
        user_email: 'robertocdiazsanchez@gmail.com',
        primary_group_id: 2,
        groups: [
          {
            id: 2,
            name: 'Back',
            description:
              'sit occaecati totam expedita fugiat explicabo sunt voluptate rem recusandae ex ducimus',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
          {
            id: 4,
            name: 'Arms',
            description:
              'laudantium hic occaecati amet perspiciatis voluptas accusamus distinctio repellat in porro magnam',
            user_email: 'robertocdiazsanchez@gmail.com',
          },
        ],
      },
    ],
  },
];
