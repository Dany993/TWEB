import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layouts/App';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import LoginComponent from './login/Login';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,   
    },
    {
      path: "/telefoane",
      element: <App/>
    },
    {
      path: "/login", // Adaugă ruta pentru login
      element: <LoginComponent/> // Asociază componenta de login
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