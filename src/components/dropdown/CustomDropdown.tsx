"use client";

import React, { useState } from "react";
import styles from "./CustomDropdown.module.scss";

type BaseProps = {
  label: string;
  options: string[];
};

type MultiSelectProps = BaseProps & {
  isMulti: true;
  selected: string[];
  setSelected: (val: string[]) => void;
};

type SingleSelectProps = BaseProps & {
  isMulti?: false;
  selected: string;
  setSelected: (val: string) => void;
};

type Props = MultiSelectProps | SingleSelectProps;

const CustomDropdown = (props: Props) => {
  const [open, setOpen] = useState(false);

  const { label, options, isMulti = false } = props;

  const handleSelect = (option: string) => {
    if (isMulti) {
      const current = props.selected as string[];
      const set = props.setSelected as (val: string[]) => void;

      const newValue = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];

      set(newValue);
    } else {
      const set = props.setSelected as (val: string) => void;
      set(option);
      setOpen(false);
    }
  };

  const displayValue = Array.isArray(props.selected)
    ? props.selected.join(", ")
    : props.selected;

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
          {options.map((option) => {
            const isSelected = Array.isArray(props.selected)
              ? props.selected.includes(option)
              : props.selected === option;

            return (
              <div
                key={option}
                className={`${styles.dropdownItem} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
