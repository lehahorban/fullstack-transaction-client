import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helpers/localstorage.helper';
import { AuthService } from '../services/auth.service';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });
      if (data) {
        setTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('You logged in');
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });

      if (data) {
        toast.success('Account has been created');
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <div className="mx-auto mt-40 flex max-w-sm flex-col bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? 'Login' : 'Registration'}
      </h1>
      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className="flex flex-col gap-5"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Password"
          value={password}
        />
        <button className="btn btn-green mx-auto">Submit</button>
      </form>
      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don`t have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
