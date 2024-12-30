interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  className,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input type={type} name={name} className={className} required />
    </div>
  );
};

export default FormField;
