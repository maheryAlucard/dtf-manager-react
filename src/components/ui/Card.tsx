import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      {title && <h2 className="mb-4 font-semibold text-gray-700 text-xl">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;