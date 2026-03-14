import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FREQUENCY_OPTIONS } from '../../utils/mockData';
import { getTodayString } from '../../utils/helpers';
import { Save, AlertCircle } from 'lucide-react';

const initialForm = {
  name: '',
  dosage: '',
  time: '',
  frequency: 'daily',
  startDate: getTodayString(),
  endDate: '',
  instructions: '',
};

const AddMedicineForm = ({ initial = null, onSuccess }) => {
  const { addMedicine, updateMedicine, addToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial || initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initial?.id;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Medicine name is required';
    if (!form.dosage.trim()) newErrors.dosage = 'Dosage is required';
    if (!form.time) newErrors.time = 'Time is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // simulate API
      if (isEdit) {
        updateMedicine(initial.id, form);
        addToast('Medicine updated successfully!', 'success');
      } else {
        addMedicine(form);
        addToast('Medicine added successfully!', 'success');
      }
      onSuccess ? onSuccess() : navigate('/medicines');
    } catch (err) {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, name, type = 'text', ...rest }) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className={`input-field ${errors[name] ? 'border-status-missed focus:ring-status-missed' : ''}`}
        {...rest}
      />
      {errors[name] && (
        <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
          <AlertCircle size={12} />{errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Medicine Name *" name="name" placeholder="e.g. Metformin" />
        <Field label="Dosage *" name="dosage" placeholder="e.g. 500mg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Time *" name="time" type="time" />
        <div>
          <label htmlFor="frequency" className="label">Frequency</label>
          <select
            id="frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="input-field"
          >
            {FREQUENCY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Start Date *" name="startDate" type="date" />
        <Field label="End Date" name="endDate" type="date" />
      </div>

      <div>
        <label htmlFor="instructions" className="label">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          rows={3}
          placeholder="e.g. Take with food to reduce stomach upset"
          className="input-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 py-2.5"
        id="submit-medicine-btn"
      >
        {loading ? (
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
            ))}
          </span>
        ) : (
          <>
            <Save size={15} />
            {isEdit ? 'Update Medicine' : 'Add Medicine'}
          </>
        )}
      </button>
    </form>
  );
};

export default AddMedicineForm;
