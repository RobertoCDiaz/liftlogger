import { Template } from '@prisma/client';
import { TemplateCreationParams } from '../models/TemplateModel';

export function getTemplatesFixture(): Template[] {
  return JSON.parse(JSON.stringify(templatesFixture));
}

export function getNewTemplateFixture(): TemplateCreationParams {
  return JSON.parse(JSON.stringify(newTemplateFixture));
}

const newTemplateFixture: TemplateCreationParams = {
  name: 'New Template',
  user_email: 'testing@test.com',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
};

const templatesFixture: Template[] = [
  {
    id: 1,
    name: 'Supervisor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 2,
    name: 'Agent',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 3,
    name: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 4,
    name: 'Representative',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 5,
    name: 'Coordinator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 6,
    name: 'Agent',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac nunc lobortis, sollicitudin est nec, mattis tellus. In ullamcorper finibus urna, ac lobortis ex ultricies at. Etiam accumsan odio sit amet rhoncus tincidunt. Nulla vulputate, ex. ',
    user_email: 'testing@test.com',
  },
  {
    id: 7,
    name: 'Planner',
    description: null,
    user_email: 'testing@test.com',
  },
];
