import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './store/store.js';
import { Provider } from 'react-redux';
import Signup from './components/Signup.jsx';
import Login from './components/login.jsx';
import React from 'react';
import ReportSubmission from './components/ReportSubmission.jsx';
import Home from './components/Home.jsx';
import My_reports from './components/My_reports.jsx';
import Protected from './components/Protected.jsx';
import ReportMap from './components/ReportMap.jsx';
import Chatbot from './components/Chatbot.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // default route for "/"
        element: <Home />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <ReportSubmission />
      },
      {
        path:'myReports',
        element:(
          <Protected>
            <My_reports/>
          </Protected>
        )
      },
      {
        path:'reportMap',
        element:<ReportMap/>
      },
      {
        path:'chatBot',
        element:<Chatbot/>
      }
      
    ]
  },
  {
    path:'/admin'
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
