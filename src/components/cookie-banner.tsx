import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { Popup } from '@/components/modules/popup';
import { Checkbox } from '@/components/elements/checkbox';
import { Button } from './elements/button';
import { GearIcon } from './elements/icons/gear';

const labels = {
  title: 'This website uses cookies',
  description: (
    <>
      This website uses cookies to improve user experience. By using our website
      you consent to all cookies in accordance with our Cookie Policy.
      <a href="/cookie-policy" className="text-accent ml-2">
        Learn more
      </a>
    </>
  ),
};

interface CookieItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export function CookieBanner() {
  const cookies: CookieItem[] = [
    {
      id: 'strictly-necessary',
      name: 'Strictly necessary',
      description:
        'These cookies are essential for the website to function properly.',
      required: true,
    },
    {
      id: 'performance',
      name: 'Performance',
      description:
        'These cookies collect information about how visitors use a website, for instance which pages visitors go to most often, and which features they use most. All information these cookies collect is anonymous and cannot be used to identify individual users of this service.',
      required: false,
    },
    {
      id: 'targeting',
      name: 'Targeting',
      description:
        'These cookies are used to deliver adverts more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign.',
      required: false,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description:
        'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.',
      required: false,
    },
    {
      id: 'unclassified',
      name: 'Unclassified',
      description:
        'These cookies are used to collect information about how visitors use a website, for instance which pages visitors go to most often, and which features they use most. All information these cookies collect is anonymous and cannot be used to identify individual users of this service.',
      required: false,
    },
  ];

  const handleOpen = () => {
    const dialog = document.querySelector('.cb-dialog');
    const control = document.querySelector('.cb-control');

    if (dialog) {
      dialog.setAttribute('data-open', 'true');
    }

    if (control) {
      control.setAttribute('data-open', 'true');
    }
  };

  const handleClose = () => {
    const dialog = document.querySelector('.cb-dialog');
    const control = document.querySelector('.cb-control');

    if (dialog) {
      dialog.setAttribute('data-open', 'false');
    }

    if (control) {
      control.setAttribute('data-open', 'false');
    }
  };

  return (
    <>
      <button
        aria-label="Cookie settings"
        onClick={handleOpen}
        className={cn(
          'cb-control py-1 px-2 absolute bottom-3 left-3',
          'bg-background text-foreground',
          'rounded-lg font-medium cursor-pointer',
          'ring-2 ring-transparent hover:ring-accent hover:ring-offset-2',
          'data-[open=false]:inline-block data-[open=true]:hidden',
          'transition-all duration-200',
        )}
      >
        Cookie Settings
      </button>

      <Popup
        onClose={handleClose}
        title={labels.title}
        description={labels.description}
      >
        <div className="flex flex-col gap-2 mb-4">
          {cookies.map((cookie) => (
            <Checkbox
              id={cookie.id}
              label={cookie.name}
              checked={true}
              onChange={() => {}}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              aria-label="Accept all"
              variant="primary"
              className="flex-1"
            >
              Accept all
            </Button>
            <Button
              aria-label="Decline all"
              variant="secondary"
              className="flex-1"
            >
              Decline all
            </Button>
          </div>

          <div className="text-center">
            <button
              aria-label="Show details"
              className={cn(
                'py-2 px-1 font-medium',
                'text-sm uppercase inline-flex items-center gap-1',
                'text-foreground/80 cursor-pointer',
                'group hover:text-foreground',
                'transition-all duration-150',
              )}
            >
              <GearIcon
                className={cn(
                  'w-4 h-4 group-hover:text-accent-dark transition-all duration-150',
                )}
              />
              Show Details
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
}
