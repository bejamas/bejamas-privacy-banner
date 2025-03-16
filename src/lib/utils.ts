/**
 * Utility for conditionally joining class names together
 *
 * @example
 * cn('base-class', condition && 'conditional-class', { 'object-class': true, 'disabled-class': false })
 */
export function cn(
  ...inputs: (
    | string
    | boolean
    | undefined
    | null
    | { [key: string]: boolean }
  )[]
): string {
  return inputs
    .filter(Boolean)
    .flatMap(
      (input: Record<string, any> | string | boolean | null | undefined) => {
        // Handle objects like { 'class-name': true, 'another-class': false }
        if (typeof input === 'object' && input !== null) {
          return Object.entries(input)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key);
        }

        return input;
      },
    )
    .join(' ');
}

/**
 * Creates a variant function for defining component variants with Tailwind classes
 * @param baseClasses - The base classes that are always applied
 * @param variants - An object containing variant definitions
 * @returns A function that generates class names based on selected variants
 */
export function createVariants(
  baseClasses: string,
  variants: Record<string, Record<string, string>>,
) {
  return function (options: Record<string, string> = {}) {
    // Start with base classes
    let classes = baseClasses;

    // Add selected variant classes
    Object.entries(options).forEach(([variantType, variantValue]) => {
      if (variants[variantType] && variants[variantType][variantValue]) {
        classes += ' ' + variants[variantType][variantValue];
      }
    });

    return classes;
  };
}
