import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  console.log(value);
  return (
    <div className="container mb-4">
      <input
        type="text"
        className="form-control text-center"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}