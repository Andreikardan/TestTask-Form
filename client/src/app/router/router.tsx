import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/enums';
import Layout from '../Layout/Layout';
import { PersonalInfoPage, JobInfoPage } from '@/pages';
import { LoanParams } from '@/widgets/LoanParams';
import { Guard } from './Guard';
import { RouterErrorFallback } from './RouterErrorFallback';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <PersonalInfoPage />
      },
      {
        path: ROUTES.JOB_INFO,
        element: (
          <Guard>
            <JobInfoPage />
          </Guard>
        ),
        errorElement: <RouterErrorFallback />
      },
      {
        path: ROUTES.LOAN_PARAMS,

        element: (
          <Guard>
            <LoanParams />
          </Guard>
        ),
        errorElement: <RouterErrorFallback />
      },
      {
        path: '*',
        element: <h1>404</h1>
      }
    ]
  }
]);
