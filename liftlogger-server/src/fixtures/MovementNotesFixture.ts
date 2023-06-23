import { MovementNote } from '@prisma/client';

export function getMovementNotesFixture(): MovementNote[] {
  return JSON.parse(JSON.stringify(notesFixture));
}

const notesFixture: MovementNote[] = [
  {
    id: 1,
    notes:
      'ab odio excepturi veniam assumenda hic reprehenderit quia reiciendis facilis dolorem eaque asperiores voluptate ratione pariatur laudantium veritatis nemo occaecati expedita eaque repellendus reprehenderit animi doloremque sunt atque atque beatae',
    date: new Date('2023-02-11T06:19:59.374Z'),
    movement_id: 1,
  },
  {
    id: 2,
    notes:
      'possimus distinctio non officia laudantium officia nobis excepturi recusandae facilis esse pariatur corporis voluptas fugit dolorem reprehenderit expedita minus vel fugiat ullam odio sapiente ducimus rem sapiente rerum atque quae',
    date: new Date('2023-03-26T19:49:43.323Z'),
    movement_id: 1,
  },
  {
    id: 3,
    notes:
      'occaecati nostrum iste hic id inventore culpa numquam optio sequi cupiditate quia necessitatibus tenetur autem dolor non tempora dolore consectetur assumenda saepe mollitia repudiandae amet eaque minus id suscipit reiciendis',
    date: new Date('2023-03-16T10:41:57.815Z'),
    movement_id: 1,
  },
  {
    id: 4,
    notes:
      'asperiores id modi consequatur voluptatum qui error velit omnis ut maiores corrupti enim aliquam iure id quo commodi praesentium accusantium doloremque ipsam dolor aliquid eligendi necessitatibus delectus ratione mollitia cum',
    date: new Date('2023-03-19T02:10:46.223Z'),
    movement_id: 1,
  },
  {
    id: 5,
    notes:
      'natus ex non repudiandae reiciendis dolor suscipit blanditiis fugiat rerum harum hic dignissimos perspiciatis error placeat sint inventore debitis non earum mollitia doloribus quisquam iusto provident vero omnis placeat in',
    date: new Date('2023-02-19T07:58:40.669Z'),
    movement_id: 1,
  },
  {
    id: 6,
    notes:
      'blanditiis incidunt autem quam dolore quis vel eveniet consequatur dolorem suscipit doloribus animi unde hic ad dolorum pariatur quisquam vero assumenda quae amet ipsam voluptas quam ratione odit ut veritatis',
    date: new Date('2023-02-18T13:40:30.470Z'),
    movement_id: 1,
  },
  {
    id: 7,
    notes:
      'quidem iure nulla quisquam numquam modi quo consequatur tempora doloribus laudantium totam natus blanditiis debitis a ipsam quas corporis distinctio beatae cum dolorem reiciendis dolorem libero mollitia commodi laborum dolor',
    date: new Date('2023-03-23T15:33:11.144Z'),
    movement_id: 2,
  },
  {
    id: 8,
    notes:
      'aut sed labore velit praesentium cupiditate maxime dolorum sed odio quasi aut iure porro sint sed at provident doloremque voluptatem similique dignissimos necessitatibus in suscipit soluta ipsam porro modi eveniet',
    date: new Date('2023-03-10T02:46:57.088Z'),
    movement_id: 2,
  },
  {
    id: 9,
    notes:
      'sequi ut reprehenderit quo praesentium quod occaecati expedita animi id ipsa nulla porro deleniti expedita ullam excepturi praesentium ut quae in nihil nam laudantium totam rerum voluptas rerum tenetur placeat',
    date: new Date('2023-02-05T00:45:18.597Z'),
    movement_id: 2,
  },
  {
    id: 10,
    notes:
      'accusantium corporis quia sunt sunt accusantium commodi omnis officiis sunt rerum sit laborum eos consequatur similique beatae doloribus reprehenderit vitae facilis blanditiis aliquid nam rerum ratione maxime assumenda dicta amet',
    date: new Date('2023-03-10T03:12:59.082Z'),
    movement_id: 2,
  },
];
