import React from 'react';

interface TableProps<T> {
  headers: { key: keyof T | string; label: string; }[]; // Allow string for custom keys like 'actions'
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="bg-white border border-gray-200 min-w-full">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th key={String(header.key)} className="px-4 py-2 border-b font-semibold text-gray-600 text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;