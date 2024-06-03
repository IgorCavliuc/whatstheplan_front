import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

interface Option {
  label: string;
  value: any;
}

interface IconProps {
  isOpen: boolean;
}

interface CloseIconProps {}

interface SelectCustomProps {
  placeHolder?: string;
  options?: Option[];
  isMulti?: boolean;
  isSearchable?: boolean;
  save?: "value" | "object";
  name?: string;
  onChange?: (value: Option, shouldValidate?: boolean) => void;
  align?: "left" | "right" | "center" | "auto";
}

const Icon: React.FC<IconProps> = ({ isOpen }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="#222"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isOpen ? "translate" : ""}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

const CloseIcon: React.FC<CloseIconProps> = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

export const SelectCustom: React.FC<SelectCustomProps> = ({
  placeHolder,
  options,
  save = "object",
  name,
  isMulti = false,
  isSearchable = false,
  onChange,
  align = "auto",
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(
    isMulti ? [] : null,
  );
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e: React.MouseEvent) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (
      !selectedValue ||
      (Array.isArray(selectedValue) && selectedValue.length === 0)
    ) {
      return placeHolder;
    }
    if (isMulti && Array.isArray(selectedValue)) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option, index) => (
            <div key={`${option.value}-${index}`} className="dropdown-tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return (selectedValue as Option).label;
  };

  const removeOption = (option: Option) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.filter((o) => o.value !== option.value);
    }
    return [];
  };

  const onTagRemove = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation();
    // const newValue = removeOption(option);
    setSelectedValue(option);
    if (onChange) onChange(option);
  };

  const onItemClick = (option: Option) => {
    let newValue: Option | Option[];
    if (isMulti && Array.isArray(selectedValue)) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }

    setSelectedValue(newValue);
    if (onChange) onChange(option);
  };

  const isSelected = (option: Option) => {
    if (isMulti && Array.isArray(selectedValue)) {
      return selectedValue.some((o) => o.value === option.value);
    }
    console.log("selectedValue", selectedValue);
    if (!selectedValue) {
      return false;
    }
    return (selectedValue as Option).value === option.value;
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options?.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
    );
  };

  return (
    <div className="custom--dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div
          className={`dropdown-selected-value ${
            !selectedValue ||
            (Array.isArray(selectedValue) && selectedValue.length === 0)
              ? "placeholder"
              : ""
          }`}
        >
          {getDisplay()}
        </div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon isOpen={showMenu} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className={`dropdown-menu alignment--${align}`}>
          {isSearchable && (
            <div className="search-box">
              <input
                className="form-control"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getOptions()?.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
