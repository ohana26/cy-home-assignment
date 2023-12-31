import React, { useState } from 'react';
import { User } from '../types/users';
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import './Table.css';
import AddUserForm from './AddUserForm';

interface TableProps {
  data: User[];
  onDeleteItem?: (user: User) => void;
  onAddItem?: (user: User) => void;
}

const itemsPerPage = 10;
const pagesToShow = 5;

export const Table: React.FC<TableProps> = ({ data = [], onDeleteItem = () => {}, onAddItem = () => {} }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData = data.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItemPerPage: number = currentPage * itemsPerPage;
  const indexOfFirstItemPerPage: number = indexOfLastItemPerPage - itemsPerPage;
  const currentItemsPerPage: User[] = filteredData.slice(indexOfFirstItemPerPage, indexOfLastItemPerPage);

  const totalPages: number = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = (): void => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (user: User) => {
    setIsModalOpen(false);
    if (user) {
      onAddItem(user);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="table-container">
      <div className='add-user-container'>
        <Button onClick={handleOpenModal} variant="contained" color="primary" style={{ textTransform: 'none' }}
        >
          Add user
        </Button>
      </div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
        sx={{ marginBottom: '16px' }}
      />
      <AddUserForm open={isModalOpen} handleClose={handleCloseModal} />
      <TableContainer component={Paper}>
        <MUITable>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItemsPerPage.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => { onDeleteItem(item) }} >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      <div className="pagination-container">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        {Array.from({ length: endPage - startPage + 1 }).map((_, index: number) => {
          const pageNumber = startPage + index;
          return (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};
