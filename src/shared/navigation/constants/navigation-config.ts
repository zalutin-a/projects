export const NAVIGATION_ITEMS = [
  {
    name: 'Home',
    config: null,
    path: '/',
    children: null,
  },
  {
    name: 'About',
    config: null,
    path: '/about',
    children: null,
  },
  {
    name: 'Tech Stack',
    config: null,
    path: '/tech-stack',
    children: null,
  },
  {
    name: 'Projects',
    config: null,
    path: '',
    children: [
      {
        name: 'Project 2',
        config: null,
        path: '/projects/project2',
        children: null,
      },
      {
        name: 'Dashboard',
        config: null,
        path: '/projects/dashboard',
        children: null,
      },
      {
        name: 'Calendar',
        config: null,
        path: '/projects/calendar/statements',
        children: null,
      }
    ],
  },
  {
    name: 'Contacts',
    config: null,
    path: '/contacts',
    children: null,
  },
];
