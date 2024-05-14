import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from './App';
import Login from './Login';

  const router = createBrowserRouter([
   
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/products",
      element: <App/>
    }
    
  ]);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
         <RouterProvider router={router} />
    </React.StrictMode>
);