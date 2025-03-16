import { cn } from '@/lib/utils';
import { CheckIcon } from '../icons';

export interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  const handleToggleState = () => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    onChange(checkbox.checked);
  };

  return (
    <label
      className={cn(
        'flex items-center gap-2 text-sm uppercase font-medium',
        'has-checked:text-accent',
        'has-checked:[&>span]:bg-accent',
        'has-checked:[&>span]:border-accent',
        'has-checked:[&_svg]:w-4',
        'transition-all duration-200 cursor-pointer',
      )}
    >
      <span
        className={cn(
          'w-4 h-4 inline-flex items-center justify-center rounded-sm border border-foreground',
          'transition-all duration-200',
        )}
      >
        <CheckIcon className="w-0 h-4 transition-all duration-200" />
      </span>
      {label}
      <input
        id={id}
        type="checkbox"
        className="checkbox hidden"
        onChange={handleToggleState}
        checked={checked}
      />
    </label>
  );
}
