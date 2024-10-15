import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Weather from './routes/Weather';
import NotFoundPage from './error/404';
import StyleGuide from './routes/StyleGuide';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Weather />,
  },
  {
    path: '/company/branding/style-guide',
    element: <StyleGuide />,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
