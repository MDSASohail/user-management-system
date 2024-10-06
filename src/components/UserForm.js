import { useState, useEffect, useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';


const UserForm = ({ onClose, user }) => {
  const { addUser, updateUser } = useContext(UsersContext);
  const isEdit = Boolean(user);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
    },
    company: {
      name: '',
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        address: {
          street: user.address.street || '',
          city: user.address.city || '',
        },
        company: {
          name: user.company.name || '',
        },
      });
    }
  }, [isEdit, user]);

  const validate = () => {
    const newErrors = {};

    // Name: Required, minimum 3 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    // Email: Required, must be a valid email format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format.';
    }

    // Phone: Required, must be a valid phone number
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number.';
    }

    // Username: Required, minimum 3 characters, auto-filled, non-editable
    if (!isEdit) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required.';
      } else if (formData.username.trim().length < 3) {
        newErrors.username = 'Username must be at least 3 characters.';
      }
    }

    // Address: Street and City are required
    if (!formData.address.street.trim()) {
      newErrors.street = 'Street is required.';
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'City is required.';
    }

    // Company Name: Optional, but if provided, must be at least 3 characters
    if (formData.company.name && formData.company.name.trim().length < 3) {
      newErrors.companyName = 'Company name must be at least 3 characters.';
    }

    // Website: Optional, must be a valid URL if provided
    if (formData.website && formData.website.trim()) {
      // Simple URL validation
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '(([\\da-z.-]+)\\.([a-z.]{2,6})|' + // domain name and extension
          '(([0-9]{1,3}\\.){3}[0-9]{1,3}))' + // OR ip (v4) address
          '(\\:[0-9]{1,5})?' + // port
          '(\\/[^\\s]*)?$',
        'i'
      );
      if (!urlPattern.test(formData.website.trim())) {
        newErrors.website = 'Invalid URL format.';
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    const submitData = {
      name: formData.name,
      username: isEdit ? formData.username : `USER-${formData.username}`,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.address.street,
        city: formData.address.city,
      },
      company: {
        name: formData.company.name,
      },
    };

    if (isEdit) {
      await updateUser(user.id, submitData);
    } else {
      await addUser(submitData);
    }

    onClose();
  };

  // Auto-fill Username when creating a user
  useEffect(() => {
    if (!isEdit && formData.name.trim()) {
      const autoUsername = `USER-${formData.name.replace(/\s+/g, '').toUpperCase()}`;
      setFormData((prev) => ({
        ...prev,
        username: autoUsername,
      }));
    }
  }, [formData.name]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="close-button" title="Close">
          <FaTimes />
        </button>
        <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name<span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {!isEdit && (
            <div className="form-group">
              <label htmlFor="username">Username<span className="required">*</span></label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
          )}

          {isEdit && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                readOnly
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email<span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone<span className="required">*</span></label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
              placeholder="+1234567890"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={errors.website ? 'input-error' : ''}
              placeholder="https://example.com"
            />
            {errors.website && <span className="error">{errors.website}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="street">Street<span className="required">*</span></label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className={errors.street ? 'input-error' : ''}
            />
            {errors.street && <span className="error">{errors.street}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City<span className="required">*</span></label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className={errors.city ? 'input-error' : ''}
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              className={errors.companyName ? 'input-error' : ''}
            />
            {errors.companyName && <span className="error">{errors.companyName}</span>}
          </div>

          <button type="submit" className="submit-button">
            {isEdit ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
