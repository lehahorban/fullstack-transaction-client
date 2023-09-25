import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white">
      <p className="text-9xl text-gray-500">404</p>
      <p className="text-6xl text-gray-200">Page Note Found</p>
      <Link
        className="rounded-md bg-sky-500 px-8 py-3 text-xl hover:bg-sky-600"
        to={'/'}
      >
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
