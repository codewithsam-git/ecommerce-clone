import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  console.log(value);
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}