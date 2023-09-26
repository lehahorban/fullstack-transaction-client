import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  text-white">
      <h1 className="mb-4 text-center text-5xl md:text-6xl">
        Welcome to Transactions!
      </h1>
      <p className="max-w-md text-center text-xl">
        Track your income and expenses with ease and style. Get started by
        adding a new transaction.
      </p>
    </div>
  );
};

export default Home;
