import { useContext, useState } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import UserForm from './UserForm';
import DeleteConfirmation from './DeleteConfirmation';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const UserList = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useContext(UsersContext);
  const [isFormOpen, setFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreate = () => {
    setCurrentUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteOpen(true);
  };

  // Search functionality
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="top-bar">
        <button onClick={handleCreate} className="create-button">
          <FaPlus /> Create User
        </button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>
                    <button onClick={() => handleEdit(user)} className="edit-button" title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(user)} className="delete-button" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isFormOpen && (
        <UserForm
          onClose={() => setFormOpen(false)}
          onAdd={addUser}
          onUpdate={updateUser}
          user={currentUser}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmation
          onClose={() => setDeleteOpen(false)}
          onDelete={() => {
            deleteUser(userToDelete.id);
            setDeleteOpen(false);
          }}
          user={userToDelete}
        />
      )}
    </div>
  );
};

export default UserList;
