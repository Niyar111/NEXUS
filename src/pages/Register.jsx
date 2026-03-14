import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import { isValidEmail } from '../utils/helpers';
import { Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { fadeIn } from '../animations/gsapHelpers';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => { fadeIn(formRef.current); }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch {
      setApiError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const Field = ({ label, name, type = 'text', placeholder, children }) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input-field ${children ? 'pr-10' : ''} ${errors[name] ? 'border-status-missed' : ''}`}
        />
        {children}
      </div>
      {errors[name] && (
        <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
          <AlertCircle size={12} />{errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <AuthLayout>
      <div ref={formRef}>
        <h2 className="text-xl font-bold text-text-primary mb-1">Create your account</h2>
        <p className="text-sm text-text-secondary mb-6">Start managing your medication today</p>

        {apiError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-status-missed text-sm rounded-xl px-4 py-3 mb-4">
            <AlertCircle size={15} />{apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field label="Full Name" name="name" placeholder="Alex Johnson" />
          <Field label="Email address" name="email" type="email" placeholder="you@example.com" />
          <Field
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
          >
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </Field>
          <Field
            label="Confirm Password"
            name="confirm"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            id="register-btn"
          >
            {loading ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </span>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;

