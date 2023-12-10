"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Customer {
  id: number;
  name: string;
  email: string;
}

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('/api/users', {
        name: `New User ${customers.length + 1}`,
        email: `user${customers.length + 1}@example.com`,
      });
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setCustomers((prevCustomers) => prevCustomers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customers Page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
            <p className="text-gray-600">{customer.email}</p>
            <button
              onClick={() => handleDeleteUser(customer.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddUser}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </div>
  );
};

export default CustomersPage;
