// Reusable Form Field component
const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  accept,
  icon,
}) => {
  if (type === "file") {
    return (
      <div className="w-full max-w-xl flex flex-col gap-2">
        <label className="text-base font-medium text-[#0D1C17]">{label}</label>
        <label
          htmlFor={name}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#1FE0AB] text-[#0D1C17] font-bold rounded-xl text-center hover:bg-[#13c89a] transition duration-200"
        >
          {placeholder || "Upload file"}
          {icon}
        </label>
        <input
          id={name}
          type="file"
          name={name}
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </div>
    );
  }
  // Other input types
  return (
    <div className="w-full max-w-xl flex flex-col gap-2">
      <label className="text-base font-medium text-[#0D1C17]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl text-[#0D1C17] placeholder-[#4F9682] focus:outline-none"
        required
      />
    </div>
  );
};

export default FormField;