import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    error?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-text-primary text-sm">{label}</label>
            <select
                {...props}
                className={`p-2 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-light-gray focus:ring-primary-cyan'} ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    );
};

export default Select;