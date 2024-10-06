import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from API on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch users.');
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      // Assign a unique ID since JSONPlaceholder doesn't return a unique one for new users
      const newUser = { ...response.data, id: Date.now() };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user.');
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
      );
      toast.success('User updated successfully!');
    } catch (error) {
      toast.error('Failed to update user.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete user.');
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        addUser,
        updateUser,
        deleteUser,
        fetchUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
