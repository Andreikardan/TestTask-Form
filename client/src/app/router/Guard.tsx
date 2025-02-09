import { Navigate, useLocation } from 'react-router-dom';
import { LocalStorageOperations } from '@/shared/utils';
import { ROUTES, LOCAL_STORAGE_KEY_NAME } from '@/shared/enums';

export function Guard({ children }: { children: React.ReactNode }): JSX.Element {
  const location = useLocation();

  if (!LocalStorageOperations.getData(LOCAL_STORAGE_KEY_NAME.PERSONAL_INFO)) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
