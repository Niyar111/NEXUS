import React, { useState } from 'react';
import Modal from '../common/Modal';
import { UserPlus, AlertCircle } from 'lucide-react';

const AddCaregiverModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', relationship: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Valid email is required';
    }
    if (!form.relationship.trim()) errs.relationship = 'Relationship is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setForm({ name: '', email: '', relationship: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Caregiver">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="label" htmlFor="cg-name">Name</label>
          <input
            id="cg-name"
            name="name"
            placeholder="E.g. Jane Doe"
            value={form.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-status-missed focus:ring-status-missed' : ''}`}
          />
          {errors.name && <p className="text-status-missed text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.name}</p>}
        </div>

        <div>
          <label className="label" htmlFor="cg-email">Email Address</label>
          <input
            id="cg-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-status-missed focus:ring-status-missed' : ''}`}
          />
          {errors.email && <p className="text-status-missed text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.email}</p>}
        </div>

        <div>
          <label className="label" htmlFor="cg-rel">Relationship</label>
          <input
            id="cg-rel"
            name="relationship"
            placeholder="E.g. Daughter, Spouse, Nurse"
            value={form.relationship}
            onChange={handleChange}
            className={`input-field ${errors.relationship ? 'border-status-missed focus:ring-status-missed' : ''}`}
          />
          {errors.relationship && <p className="text-status-missed text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/>{errors.relationship}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-6"
        >
          {loading ? (
             <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              <UserPlus size={16} />
              Add Caregiver
            </>
          )}
        </button>
      </form>
    </Modal>
  );
};

export default AddCaregiverModal;
