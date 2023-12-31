import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface AddUserFormProps {
  open: boolean;
  handleClose?: (item?: any) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Errors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ open, handleClose = () => {} }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: !/^\d{10}$/.test(formData.phone),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = (): void => {
    if (validateForm()) {
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      setErrors({ firstName: false, lastName: false, email: false, phone: false });
      handleClose(formData);
    }
  };

  const handleCancel = (): void => {
    setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    setErrors({ firstName: false, lastName: false, email: false, phone: false });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          helperText={errors.firstName && 'Name is required'}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          helperText={errors.lastName && 'Name is required'}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          helperText={errors.email && 'Invalid email address'}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          helperText={errors.phone && 'Invalid phone number'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} style={{ textTransform: 'none' }}>Cancel</Button>
        <Button onClick={handleAddUser} color="primary" style={{ textTransform: 'none' }}>
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserForm;
