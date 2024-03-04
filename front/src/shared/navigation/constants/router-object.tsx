import { RouteObject } from "react-router-dom";
import App from "src/App";
import { ClientErrorPage } from "src/pages/404/404";
import { About } from "src/pages/about/about";
import { Contacts } from "src/pages/contacts/Contacts";
import { Home } from "src/pages/home/Home";
import { Dashboard } from "src/pages/projects/dashboard/dashboard";
import {  CalendarProject, CategoriesTab, PagesTab, StatementsTab } from "src/pages/projects/index";
import { Project2 } from "src/pages/projects/project-2/project-2";
import { TechStack } from "src/pages/tech-stack/tech-stack";
import { getLoaderFunction } from "./get-loader-function";

export const ROUTER_OBJECT: RouteObject[] = 
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
        {
          // @ts-ignore
          async lazy() {
            // @ts-ignore
            let {LoginPage}  = await import("../../../pages/login/login.tsx");
            return { Component: LoginPage };
          },
          // element: <LoginPage></LoginPage>,
          path: '/login',
        },
        {
          // @ts-ignore
          async lazy() {
            // @ts-ignore
            let {LoginPage}  = await import("../../../pages/login/login.tsx");
            return { Component: LoginPage };
          },
          // element: <LoginPage></LoginPage>,
          path: '/signup'
        },
        {
          element: <ClientErrorPage></ClientErrorPage>,
          path: '/404',
        },
        {
          
          element: <CalendarProject></CalendarProject>,
          path: 'projects/calendar/',
          children: [
            {
              element: <StatementsTab></StatementsTab>,
              loader: getLoaderFunction('statements'),
              path: 'statements',
            },
            {
              element: <CategoriesTab></CategoriesTab>,
              loader: getLoaderFunction('categories'),
              path: 'categories',
            },
            {
              element: <PagesTab></PagesTab>,
              loader: getLoaderFunction('pages'),
              path: 'pages',
            },
          ], 
        },
        {
          element: <CalendarProject></CalendarProject>,
          path: '/projects/calendar/:params',
        },
      ]
    },
  ];  
