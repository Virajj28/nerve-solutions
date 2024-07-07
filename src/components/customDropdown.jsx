import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export const CustomDropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);

  const optionsHandler = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && optionsRef.current) {
      optionsRef.current.style.maxHeight = `${optionsRef.current.scrollHeight}px`;
    } else if (optionsRef.current) {
      optionsRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
    <div className="custom-dropdown">
      <div className="selected-value" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue}
        {
          isOpen ?
            <IoIosArrowUp color='blue' height={10} width={10} />
            : <IoIosArrowDown color='blue' height={10} width={10} />
        }
      </div>
    </div>
      <div className={`options ${isOpen ? 'open' : ''}`} ref={optionsRef}>
        {options.map((option) => (
          <div
            key={option}
            className={`option ${selectedValue === option ? 'selected' : ''}`}
            onClick={() => optionsHandler(option)}
          >
            {option}
          </div>
        ))}
      </div>
      </div>
  );
};
