import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/users';
import { Table } from '../components/Table';

const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([]);

  const handleAddItem = (user: User): void => {
    console.log(user)
    axios.post<User[]>('https://dummyjson.com/users/add')
      .then(response => {
        setData([user, ...data]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeleteItem = (user: User): void => {
    axios.get<User[]>('https://dummyjson.com/users') //api request not working
      .then(response => {
        const updatedData = data.filter(item => item.id !== user.id);
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        setData(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Table data={data} onDeleteItem={handleDeleteItem} onAddItem={handleAddItem}></Table>
    </div>
  );
};

export default Users;