import App from "src/App";
import { About } from "src/pages/about/about";
import { Contacts } from "src/pages/contacts/Contacts";
import { Home } from "src/pages/home/Home";
import { Dashboard } from "src/pages/projects/dashboard/dashboard";
import { Project2 } from "src/pages/projects/project-2/project-2";
import { TechStack } from "src/pages/tech-stack/tech-stack";

export const ROUTER_OBJECT = 
  [
    {
      element: <App></App>,
      children: [
        {
          element: <Home></Home>,
          path: '/',
        },
        {
          element: <About></About>,
          path: '/about',
        },
        {
          element: <TechStack></TechStack>,
          path: '/tech-stack',
        },
        {
          element: <Contacts></Contacts>,
          path: '/contacts',
        },
        {
          element: <Project2></Project2>,
          path: '/projects/project2',
        },
        {
          element: <Dashboard></Dashboard>,
          path: '/projects/dashboard',
        },
      ]
    },
  ];
