import { PermissionsEnum } from "src/shared/types/permissions";
import { NavigationItemType } from "../types";

export const NAVIGATION_ITEMS: NavigationItemType[] = [
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
    neededPermisions: [PermissionsEnum.projects],
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
        neededPermisions: [PermissionsEnum.calendar],
        path: '/projects/calendar/pages',
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
]
