import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/users';
import { Table } from '../components/Table';

const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([]);

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
      <Table data={data}></Table>
    </div>
  );
};

export default Users;