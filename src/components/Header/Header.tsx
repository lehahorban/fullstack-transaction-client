import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaGoogleWallet, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../../helpers/localstorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('You logged auth');
    navigate('/');
  };

  return (
    <header className=" bg-slate-800  shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-3 p-4">
        <Link to="/">
          <FaGoogleWallet size={20} />
        </Link>
        {isAuth && (
          <nav className="ml-auto md:mr-10">
            <ul className="flex items-center gap-5">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                  to={'/'}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                  to={'/transactions'}
                >
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/50'
                  }
                  to={'/categories'}
                >
                  Categories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
        {isAuth ? (
          <button onClick={logoutHandler} className="btn btn-red">
            <span>Log out</span>
            <FaSignOutAlt />
          </button>
        ) : (
          <Link
            className="ml-auto py-2 text-white/50 hover:text-white"
            to={'/auth'}
          >
            Log in / Sign in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
