import { Minus, Plus } from 'lucide-react';

interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  required?: boolean;
}

export default function NumericInput({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 0.1,
  label,
  required = false
}: NumericInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(parseFloat(newValue.toFixed(1)));
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(parseFloat(newValue.toFixed(1)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    onChange(Math.min(max, Math.max(min, val)));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          step={step}
          min={min}
          max={max}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center font-semibold"
          required={required}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
