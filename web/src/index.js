import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Home from './Pages/Home';
import JsonTool from './Pages/JsonTool';
import GenerateTool from './Pages/GenerateTool';
import XuanXue from './Pages/XuanXue';
import Links from './Pages/Links';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/JsonTool",
        element: <JsonTool />,
      },
      {
        path: "/GenerateTool",
        element: <GenerateTool />,
      },
      {
        path: "/XuanXue",
        element: <XuanXue />,
      },
      {
        path: "/Links",
        element: <Links />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
