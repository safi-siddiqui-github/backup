type TextInputComponentType = {
  id: string;
  label: string;
  name: string;
  defaultValue?: string;
  error?: string | string[];
};

export default function TextInputComponent(props: TextInputComponentType) {
  const { id, label, defaultValue, name, error } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium w-fit">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        className="border rounded px-2 py-1"
        defaultValue={defaultValue}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
}
