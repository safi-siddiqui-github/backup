'use client';

import { ChangeEvent, useCallback, useState } from 'react';

type FileInputComponentType = {
  id: string;
  label: string;
  name: string;
  error?: string | string[];
};

export default function FileInputComponent(props: FileInputComponentType) {
  const { id, label, name, error } = props;
  const [iv, setIV] = useState<Blob | MediaSource>();
  const HC = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files && e.currentTarget.files.length > 0) {
        setIV(e.currentTarget.files[0]);
      }
    },
    [setIV]
  );

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium w-fit">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="border rounded px-2 py-1"
        onChange={HC}
      />

      {iv && (
        <img
          src={URL.createObjectURL(iv)}
          alt="image"
          className="w-20 h-20 mt-1"
        />
      )}

      <p className="text-red-500">{error}</p>
    </div>
  );
}
