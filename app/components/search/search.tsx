"use client";
import React from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search books..."
      aria-label="Search books"
      className="input input-bordered w-full max-w-md mb-4"
    />
  );
}
