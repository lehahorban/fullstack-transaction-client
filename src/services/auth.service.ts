import { instanse } from './../api/axios.api';
import { IUserData, IResponseUserData, IUser } from '../types/types';
export const AuthService = {
  async registration(
    userData: IUserData
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instanse.post<IResponseUserData>('/user', userData);
    return data;
  },
  async login(userData: IUserData): Promise<IUser | undefined> {
    const { data } = await instanse.post<IUser>('/auth/login', userData);
    return data;
  },
  async getPofile(): Promise<IUser | undefined> {
    const { data } = await instanse.get<IUser>('/auth/profile');
    if (data) {
      return data;
    }
  },
};
