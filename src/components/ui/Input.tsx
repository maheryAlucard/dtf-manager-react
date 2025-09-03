import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-cyan-600';

  return (
    <div>
      {label && <label className="block mb-1 font-medium text-gray-700 text-sm">{label}</label>}
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;