import { cn, createVariants } from '@/lib/utils';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children?: Node;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const buttonVariants = createVariants('cb-button', {
  variant: {
    primary: 'btn btn-primary text-white',
    secondary: 'btn btn-secondary text-accent-dark',
  },
});

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant }), props.className)}
    >
      {children}
    </button>
  );
}
