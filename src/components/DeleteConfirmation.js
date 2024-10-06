import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { UsersContext } from '../contexts/UsersContext';

const DeleteConfirmation = ({ onClose, user }) => {
  const { deleteUser } = useContext(UsersContext);

  const handleDelete = () => {
    deleteUser(user.id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button" title="Close">
          <FaTimes />
        </button>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{user.name}</strong>?</p>
        <div className="confirmation-buttons">
          <button onClick={handleDelete} className="confirm-button">
            Yes, Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
