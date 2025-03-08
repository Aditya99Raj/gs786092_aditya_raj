import React from 'react';
import { useAuth } from './AuthContext';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <h1>Please log in to access this page.</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
