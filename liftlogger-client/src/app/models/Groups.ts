export type Group = {
  name: String,
  checked?: boolean,
  isPrimary?: boolean,
  groups?: Group[]
}

export const MOCK_GROUPS: Group[] = [
  {
    name: 'Chest',
    groups: [
      { name: 'Upper chest' },
      { name: 'Middle chest' },
      { name: 'Bottom chest' },
    ]
  },
  {
    name: 'Back',
    groups: [
      { name: 'Traps' },
      { name: 'Lats' },
    ]
  },
  {
    name: 'Legs',
    groups: [
      { name: 'Gloutes' },
      { name: 'Quads' },
      { name: 'Hamstrings' },
      { name: 'Calves' },
    ]
  },
  {
    name: 'Arms',
    groups: [
      {
        name: 'Shoulders',
        groups: [
          { name: 'Posterior delts' },
          { name: 'Lateral delts' },
          { name: 'Rear delts' },
        ]
      },
      { name: 'Biceps' },
      { name: 'Triceps' },
      { name: 'Forearms' },
    ]
  }
];
