import { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';
import protectedImage from '../../assets/protected.png';

interface ProtectedProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedProps> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl">To view this page you must be logged in</h1>
          <img src={protectedImage} className="w-1/3" alt="protected" />
        </div>
      )}
    </>
  );
};
