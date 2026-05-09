'use client';

import { useState } from 'react';

type PasswordInputComponentType = {
  id: string;
  label: string;
  name: string;
  defaultValue?: string;
  error?: string | string[];
};

export default function PasswordInputComponent(
  props: PasswordInputComponentType
) {
  const { id, label, defaultValue, name, error } = props;
  const [showP, setShowP] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-medium w-fit">
          {label}
        </label>

        <button type="button" onClick={() => setShowP(!showP)}>
          Show/Hide
        </button>
      </div>

      <input
        id={id}
        name={name}
        type={showP ? 'text' : 'password'}
        className="border rounded px-2 py-1"
        defaultValue={defaultValue}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
}
