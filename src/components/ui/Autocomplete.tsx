import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface AutocompleteOption<T = any> {
  id: string | number;
  label: string;
  data?: T;
}

interface AutocompleteProps<T = any> {
  label?: string;
  placeholder?: string;
  value: string;
  options: AutocompleteOption<T>[];
  onChange: (value: string) => void;
  onSelect?: (option: AutocompleteOption<T>) => void;
  disabled?: boolean;
}

const Autocomplete = <T,>({
  label,
  placeholder,
  value,
  options,
  onChange,
  onSelect,
  disabled,
}: AutocompleteProps<T>) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const term = value.trim().toLowerCase();
    if (!term) return options;
    return options.filter(o => o.label.toLowerCase().includes(term));
  }, [value, options]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      setActiveIndex(0);
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        const opt = filtered[activeIndex];
        onChange(opt.label);
        onSelect?.(opt);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block font-medium text-gray-700 text-sm">{label}</label>
      )}
      <div className="relative">
        <input
          className="block disabled:opacity-50 py-2.5 sm:py-3 ps-4 pe-9 border-gray-200 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full sm:text-sm disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded={open}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <div
          className="top-1/2 absolute -translate-y-1/2 end-3"
          role="button"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <svg className="size-3.5 text-gray-500 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>
      {open && filtered.length > 0 && (
        <div className="z-50 absolute bg-white [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 p-1 border border-gray-200 rounded-lg [&::-webkit-scrollbar-thumb]:rounded-full w-full [&::-webkit-scrollbar]:w-2 max-h-72 overflow-hidden overflow-y-auto" role="listbox">
          {filtered.map((opt, i) => (
            <div
              key={opt.id}
              className={`cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${i === activeIndex ? 'bg-gray-100' : ''}`}
              role="option"
              tabIndex={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt.label);
                onSelect?.(opt);
                setOpen(false);
              }}
            >
              <div className="flex justify-between items-center w-full">
                <span>{opt.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;


