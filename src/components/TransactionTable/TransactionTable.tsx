import { FC, useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { Form, useLoaderData } from 'react-router-dom';
import { instanse } from '../../api/axios.api';
import { formatToUSD } from '../../helpers/currency.helper';
import { convertToDate } from '../../helpers/date.helper';
import { IResponseTransactionLoader, ITransaction } from '../../types/types';

interface ITranactionTable {
  limit: number;
}

const TransactionTable: FC<ITranactionTable> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as IResponseTransactionLoader;

  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchTransaction = async (page: number) => {
    const response = await instanse.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setData(response.data);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handlePagaChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransaction(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        className="mt-4 flex items-center justify-end gap-3"
        activeClassName="bg-blue-600 rounded-sm"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white text-xs py-1 px-2 rounded-sm bg-slate-800"
        nextClassName="text-white text-xs py-1 px-2 rounded-sm bg-slate-800"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePagaChange}
      />
      <div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold">№</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction, ind) => (
              <tr key={transaction.id}>
                <td>{ind + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-600'
                  }
                >
                  {transaction.type === 'income'
                    ? `+ ${formatToUSD.format(transaction.amount)}`
                    : `- ${formatToUSD.format(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || 'Other'}</td>
                <td>{convertToDate(transaction.createdAt)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
