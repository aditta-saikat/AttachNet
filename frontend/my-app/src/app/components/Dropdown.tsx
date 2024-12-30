// components/Dropdown.tsx
interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Dropdown = ({ value, onChange, className }: DropdownProps) => {
  return (
    <select value={value} onChange={onChange} className={className}>
      <option value="">Select your role</option>
      <option value="teacher">Teacher</option>
      <option value="student">Student</option>
    </select>
  );
};

export default Dropdown;
