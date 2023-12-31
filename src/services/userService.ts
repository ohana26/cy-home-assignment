import axios, { AxiosResponse } from 'axios';
import { User } from '../types/users';

const BASE_URL = 'https://dummyjson.com/users';

const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response: AxiosResponse<{ users: User[] }> = await axios.get(BASE_URL);
      return response.data.users;
    } catch (error) {
      throw handleError(error, 'fetching users');
    }
  },

  addUser: async (user: User): Promise<User> => {
    try {
      const response: AxiosResponse<{ user: User }> = await axios.post(`${BASE_URL}/add`, user);
      console.log(response)
      return response.data as unknown as User;
    } catch (error) {
      throw handleError(error, 'adding user');
    }
  },

  deleteUser: async (userId: string): Promise<User[]> => {
    try {
      const response: AxiosResponse<{ users: User[] }> = await axios.get(BASE_URL);
      const updatedData = response.data.users.filter((item) => item.id !== userId);
      return updatedData;
    } catch (error) {
      throw handleError(error, 'deleting user');
    }
  },
};

const handleError = (error: any, action: string): void => {
  console.error(`Error while ${action}:`, error);
  throw new Error(`Failed to perform ${action}. Please try again later.`);
};

export default userService;
