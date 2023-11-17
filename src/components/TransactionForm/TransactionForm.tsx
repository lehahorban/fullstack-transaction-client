import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../../types/types';
import CategoryModal from '../CategoryModal/CategoryModal';

const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  console.log(categories);
  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            className="input border-slate-700"
            type="text"
            name="title"
            placeholder="Title..."
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            className="input border-slate-700"
            type="number"
            name="amount"
            placeholder="Amount..."
            required
          />
        </label>

        <label htmlFor="category" className="grid">
          <span>Category</span>
          {categories.length ? (
            <select
              name="category"
              className="input border-slate-700 "
              required
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  className="input bg-slate-700 "
                  value={category.id}
                >
                  {category.title}
                </option>
              ))}
            </select>
          ) : (
            <h1 className="mt-1 text-red-300">
              To continue create a category first
            </h1>
          )}
        </label>

        <button
          type="button"
          onClick={() => setVisibleModal(true)}
          className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Category</span>
        </button>

        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'income'}
              className="form-radio text-blue-600"
              required
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'expense'}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        <button
          disabled={categories.length === 0 ? true : false}
          className="btn btn-green mt-2 max-w-fit"
        >
          Submit
        </button>
      </Form>
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}
    </div>
  );
};

export default TransactionForm;
