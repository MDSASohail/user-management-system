import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UsersContext } from '../contexts/UsersContext';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import { FaArrowLeft } from 'react-icons/fa';

const UserDetail = () => {
  const { id } = useParams();
  const { users, loading } = useContext(UsersContext);

  // Convert id to number for comparison
  const userId = parseInt(id, 10);
  const user = users.find((u) => u.id === userId);

  if (loading) return <LoadingSpinner />;

  if (!user) {
    toast.error('User not found.');
    return (
      <div className="user-detail">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to User List
        </Link>
        <p>User not found.</p>
      </div>
    );
  }

  // Helper function to check if a value is valid (not null, undefined, or 'N/A')
  const isValid = (value) => {
    return value && value !== 'N/A';
  };

  return (
    <div className="user-detail">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to User List
      </Link>
      <h2>{user.name}'s Details</h2>
      <table className="detail-table">
        <tbody>
          {/* Personal Information */}
          <tr>
            <th colSpan="2">Personal Information</th>
          </tr>
          {isValid(user.name) && (
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
          )}
          {isValid(user.username) && (
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
          )}
          {isValid(user.email) && (
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
          )}
          {isValid(user.phone) && (
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
          )}
          {isValid(user.website) && (
            <tr>
              <td>Website</td>
              <td>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </td>
            </tr>
          )}

          {/* Address */}
          {isValid(user.address?.street) || isValid(user.address?.city) ? (
            <>
              <tr>
                <th colSpan="2">Address</th>
              </tr>
              {isValid(user.address.street) && (
                <tr>
                  <td>Street</td>
                  <td>{user.address.street}</td>
                </tr>
              )}
              {isValid(user.address.city) && (
                <tr>
                  <td>City</td>
                  <td>{user.address.city}</td>
                </tr>
              )}
            </>
          ) : null}

          {/* Company */}
          {isValid(user.company?.name) ? (
            <>
              <tr>
                <th colSpan="2">Company</th>
              </tr>
              {isValid(user.company.name) && (
                <tr>
                  <td>Name</td>
                  <td>{user.company.name}</td>
                </tr>
              )}
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
