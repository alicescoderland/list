import React, { useState } from "react";

const Select = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };

  return (
    <select
      value={selectedOption || ""}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
    >
      {options.map((optionsItem) => {
        return (
          <option key={optionsItem.id} value={optionsItem.value}>
            {optionsItem.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
