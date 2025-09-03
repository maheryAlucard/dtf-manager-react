import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-text-primary text-sm">{label}</label>
            <textarea
                {...props}
                className="p-2 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-cyan min-h-[80px]"
            ></textarea>
        </div>
    );
};

export default Textarea;