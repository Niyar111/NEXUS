import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import { isValidEmail } from '../utils/helpers';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { fadeIn } from '../animations/gsapHelpers';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    fadeIn(formRef.current);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setApiError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  return (
    <AuthLayout>
      <div ref={formRef}>
        <h2 className="text-xl font-bold text-text-primary mb-1">Welcome back</h2>
        <p className="text-sm text-text-secondary mb-6">Sign in to your account to continue</p>

        {apiError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-status-missed text-sm rounded-xl px-4 py-3 mb-4">
            <AlertCircle size={15} />
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`input-field ${errors.email ? 'border-status-missed' : ''}`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
                <AlertCircle size={12} />{errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`input-field pr-10 ${errors.password ? 'border-status-missed' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="flex items-center gap-1 text-xs text-status-missed mt-1">
                <AlertCircle size={12} />{errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            id="login-btn"
          >
            {loading ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </span>
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;

