import { cn } from '@/lib/utils';
import { XIcon } from '@/components/elements/icons';

interface PopupProps {
  onClose: () => void;
  title: string;
  description: any;
  children?: any;
}

export function Popup({ onClose, title, description, children }: PopupProps) {
  return (
    <div
      data-open="false"
      className={cn(
        'cb-dialog fixed w-full h-screen top-0 left-0 bg-background/50',
        'will-change-opacity transition-discrete',
        'data-[open=false]:hidden data-[open=true]:block',
        'data-[open=false]:opacity-0 data-[open=true]:opacity-100',
        'transition-[display,opacity] duration-200',
      )}
    >
      <div className="w-full h-full">
        <div
          className={cn(
            'fixed bottom-3 left-3 p-4 max-w-xs w-full',
            'bg-background text-foreground rounded-lg shadow-lg',
            'will-change-transform transition-discrete',
            'data-[open=false]:translate-y-full data-[open=true]:translate-y-0',
            'transition-[transform] duration-200',
          )}
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">{title}</h2>

            <button
              onClick={onClose}
              className={cn(
                'flex-shrink-0 text-foreground cursor-pointer',
                'rounded-sm w-6 h-6 inline-flex items-center justify-center',
                'ring-2 ring-transparent hover:ring-accent',
                'transition-all duration-200',
              )}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 text-sm text-balance">{description}</div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
