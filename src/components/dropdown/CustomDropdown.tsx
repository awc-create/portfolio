"use client";

import React, { useState } from "react";
import styles from "./CustomDropdown.module.scss";

type Props = {
  label: string;
  options: string[];
  isMulti?: boolean;
  selected: string[] | string;
  setSelected: (val: string[] | string) => void;
};

const CustomDropdown = ({ label, options, isMulti = false, selected, setSelected }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (isMulti) {
      const current = Array.isArray(selected) ? selected : [];
      const newValue = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      setSelected(newValue);
    } else {
      setSelected(option);
      setOpen(false);
    }
  };

  const displayValue = Array.isArray(selected) ? selected.join(", ") : selected;

  return (
    <div
      className={styles.customDropdown}
      onClick={() => setOpen(!open)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.dropdownLabel}>
        {displayValue || label}
        <span className={styles.dropdownArrow}>▼</span>
      </div>
      {open && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${
                Array.isArray(selected) && selected.includes(option) ? styles.selected : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
