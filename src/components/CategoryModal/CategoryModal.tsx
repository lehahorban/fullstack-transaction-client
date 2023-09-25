import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModal {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50">
      <Form
        action="/categories"
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid w-80 gap-2 rounded-b-md bg-slate-900 p-5"
      >
        <label htmlFor="title">
          <small>Category title</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title..."
          />
          <input type="hidden" name="id" value={id} />
        </label>
        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button
            onClick={() => setVisibleModal(false)}
            className="btn btn-red"
          >
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
