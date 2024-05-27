import React, { useState, useEffect } from "react";
import "./index.scss";

interface OptionProps {
  label: string;
  value: string;
}

interface SwitchProps {
  options: OptionProps[];
  name?: string;
  onChange?: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const MultiSwitch: React.FC<SwitchProps> = ({
  options,
  name,
  onChange,
}) => {
  const [selected, setSelected] = useState<string>(options[0].value);
  const [startLeft, setStartLeft] = useState(0);
  const [endLeft, setEndLeft] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const currentIndex = options.findIndex(
      (option) => option.value === selected,
    );
    setStartLeft(endLeft);
    setEndLeft(currentIndex * (100 / options.length));
    setIsAnimating(true);
  }, [selected, endLeft, options]);

  const handleSwitch = (option: OptionProps) => {
    setSelected(option.value);
    if (onChange) {
      onChange(name!, option);
    }
  };

  const indicatorStyle = {
    left: `${startLeft}%`,
    width: `${100 / options.length}%`,
    transform: `translateX(${endLeft - startLeft}%)`,
    transition: "transform 1s ease-in-out",
  };

  return (
    <div className="switch-container">
      {options.map((option, index) => (
        <div
          key={option.value}
          className={`switch-option ${selected === option.value ? "selected" : ""}`}
          onClick={() => handleSwitch(option)}
        >
          {option.value}
        </div>
      ))}
      <div
        className={`switch-indicator ${isAnimating ? "animating" : ""}`}
        style={indicatorStyle}
        onTransitionEnd={() => setIsAnimating(false)}
      />
    </div>
  );
};
