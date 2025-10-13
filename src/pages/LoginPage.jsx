import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation (replace with real auth in production)
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-forest-800 text-center mb-2">Sign In to VanMitra</h2>
        <div>
          <label className="block text-sm font-medium text-forest-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-forest-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-forest-200 rounded-lg bg-white text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-forest-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-forest-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
