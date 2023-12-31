import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/users';
import { Table } from '../components/Table';
import { Alert } from '@mui/material';

const Users: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<User[]>([]);

  const showError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleAddItem = (user: User): void => {
    console.log(user)
    axios.post<User[]>('https://dummyjson.com/users/add')
      .then(response => {
        setData([user, ...data]);
      })
      .catch(error => {
        showError(`Error while adding user ${error}`)
      });
  };

  const handleDeleteItem = (user: User): void => {
    axios.get<User[]>('https://dummyjson.com/users') //api request not working
      .then(response => {
        const updatedData = data.filter(item => item.id !== user.id);
        setData(updatedData);
      })
      .catch(error => {
        showError(`Error while deleting user ${error}`)
      });
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        setData(response.data.users);
      })
      .catch(error => {
        showError(`Error while fetching users ${error}`)
      });
  }, []);

  return (
    <div>
      {errorMessage ? (<Alert severity="error">{errorMessage}</Alert>) : null}
      <Table data={data} onDeleteItem={handleDeleteItem} onAddItem={handleAddItem}></Table>
    </div>
  );
};

export default Users;