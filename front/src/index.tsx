import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTER_OBJECT } from './shared/navigation/constants/router-object';  
import { Loader } from './shared/index';
import { getUserService } from './shared/services/user-service/get-user-service';


getUserService()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const unsubscribe = getUserService().onUserChanged(() => {
  root.render(
    <RouterProvider router={createBrowserRouter(ROUTER_OBJECT)}/>
  );
  unsubscribe()
})

root.render(
  <div className="min-h-[100svh]">
    <Loader active={true}> </Loader>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
