/**
 * Creates a new element.
 * @param tag - The tag name of the element.
 * @param props - The properties of the element.
 * @param children - The children of the element.
 * @returns A new element.
 */
export function createElement(
  tag: string | Function,
  props: Record<string, any>,
  ...children: any[]
) {
  // If tag is a function, treat it as a component.
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }
  // Create a native element.
  const element = document.createElement(tag);
  // Set properties.
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.setAttribute('class', value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        // Attach event listeners (e.g., onClick -> click)
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });
  }
  // Append children.
  children.flat().forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
  return element;
}

/**
 * Creates a root for a component.
 * @param element - The element to render the component into.
 * @returns A root for the component.
 */
export function createRoot(element: HTMLElement | null) {
  function render(component: Node) {
    if (!element) {
      throw new Error('Element not found');
    }

    element.innerHTML = '';
    element.appendChild(component);
  }

  return {
    render,
  };
}
