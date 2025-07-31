import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  // console.log(value)
  return (
    <div className="d-flex justify-content-center mb-4">
      <input
        type="text"
        className="form-control w-50"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
