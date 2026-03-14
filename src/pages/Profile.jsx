import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { getInitials, isValidEmail } from '../utils/helpers';
import { User, Save, AlertCircle } from 'lucide-react';
import { fadeIn } from '../animations/gsapHelpers';

const TIMEZONE_OPTIONS = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney',
];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useApp();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    timezone: user?.timezone || 'America/New_York',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fadeIn(formRef.current);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      updateUser(form);
      addToast('Profile updated successfully!', 'success');
    } catch {
      addToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto" ref={formRef}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <User size={20} className="text-primary" />
            <h1 className="page-title">Profile Settings</h1>
          </div>
          <p className="page-subtitle">Manage your account information</p>
        </div>

        {/* Avatar card */}
        <div className="card p-6 mb-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">{getInitials(user?.name)}</span>
          </div>
          <div>
            <p className="font-semibold text-text-primary">{user?.name}</p>
            <p className="text-sm text-text-secondary">{user?.email}</p>
            <p className="text-xs text-primary mt-1">Member since Jan 2024</p>
          </div>
        </div>

        {/* Form */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="label">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'border-status-missed' : ''}`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
                  <AlertCircle size={12} />{errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-status-missed' : ''}`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
                  <AlertCircle size={12} />{errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="timezone" className="label">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className="input-field"
              >
                {TIMEZONE_OPTIONS.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 mt-2"
              id="update-profile-btn"
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
                  Update Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

