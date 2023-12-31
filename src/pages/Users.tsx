import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { User } from '../types/users';
import { Table } from '../components/Table';
import userService from '../services/userService';

const Users: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<User[]>([]);

  const showError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleAddItem = async (user: User): Promise<void> => {
    try {
      const addedUser = await userService.addUser(user);
      const updatedData = await userService.getUsers();
      setData([addedUser, ...updatedData]);
    } catch (error) {
      showError(`Error while adding user: ${error}`);
    }
  };

  const handleDeleteItem = async (user: User): Promise<void> => {
    try {
      const updatedData = await userService.deleteUser(user.id);
      setData(updatedData);
    } catch (error) {
      showError(`Error while deleting user: ${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const users = await userService.getUsers();
        setData(users);
      } catch (error) {
        showError(`Error while fetching users: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      <Table data={data} onDeleteItem={handleDeleteItem} onAddItem={handleAddItem}></Table>
    </div>
  );
};

export default Users;