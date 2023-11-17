import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { instanse } from '../api/axios.api';
import Chart from '../components/Chart/Chart';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionTable from '../components/TransactionTable/TransactionTable';
import { formatToUSD } from '../helpers/currency.helper';
import {
  ICategory,
  IResponseTransactionLoader,
  ITransaction,
} from '../types/types';

export const transactionLoader = async () => {
  try {
    const categories = await instanse.get<ICategory[]>('/categories');
    const transactions = await instanse.get<ITransaction[]>('/transactions');
    const totalIncome = await instanse.get<number>('/transactions/income/find');
    const totalExpense = await instanse.get<number>(
      '/transactions/expense/find'
    );

    const data = {
      categories: categories.data,
      transactions: transactions.data,
      totalIncome: totalIncome.data,
      totalExpense: totalExpense.data,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      try {
        const formData = await request.formData();
        const newTransaction = {
          title: formData.get('title'),
          amount: +formData.get('amount'),
          category: formData.get('category'),
          type: formData.get('type'),
        };
        await instanse.post('/transactions', newTransaction);
        toast.success('Transaction added');
        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    case 'DELETE': {
      try {
        const formData = await request.formData();
        const transactionId = formData.get('id');
        await instanse.delete(`/transactions/transaction/${transactionId}`);
        toast.success('Transaction deleted');
        return null;
      } catch (error) {
        console.error('Error deleting transaction');
        return null;
      }
    }
  }
};

const Transactions: FC = () => {
  const { totalIncome, totalExpense } =
    useLoaderData() as IResponseTransactionLoader;

  return (
    <>
      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:grid-cols-3">
        <div className="grid h-full md:col-span-2">
          <TransactionForm />
        </div>
        <div className="flex h-full flex-col items-center justify-center rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-center text-xs font-bold uppercase md:text-sm">
                Total Income:
              </p>
              <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="text-center text-xs font-bold uppercase md:text-sm">
                Total Exspense:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>
          <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>

      <div className="my-5">
        <TransactionTable limit={5} />
      </div>
    </>
  );
};

export default Transactions;
