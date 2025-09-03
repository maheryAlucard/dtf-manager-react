import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-text-primary text-sm">{label}</label>
            <select
                {...props}
                className="p-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-cyan"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;