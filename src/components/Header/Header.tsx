import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
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
    <header className="flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>
      {isAuth && (
        <nav className="ml-auto mr-10">
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
    </header>
  );
};

export default Header;
