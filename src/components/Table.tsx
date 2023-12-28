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
} from '@mui/material';
import './Table.css';

interface TableProps {
  data: User[];
}

const itemsPerPage = 10;
const pagesToShow = 5;

export const Table: React.FC<TableProps> = ({ data = [] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: User[] = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages: number = Math.ceil(data.length / itemsPerPage);

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

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <MUITable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
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
