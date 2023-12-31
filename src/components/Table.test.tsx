import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './Table';
import { User } from '../types/users';

jest.mock('../types/users', () => ({
  User: jest.fn(),
}));

const testData = [
  {
    id: "1",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  },
];

describe('Table component', () => {
  it('renders table with data and pagination', () => {
    render(<Table data={testData as User[]} />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));

  });

});
