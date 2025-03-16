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
