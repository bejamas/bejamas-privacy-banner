/**
 * Creates a new element.
 * @param tag - The tag name of the element.
 * @param props - The properties of the element.
 * @param children - The children of the element.
 * @returns A new element.
 */
export function createElement(
  tag: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
) {
  // If tag is a function, treat it as a component.
  if (typeof tag === 'function') {
    // Always pass children to component functions
    return tag({
      ...props,
      children: children.length > 0 ? children : undefined,
    });
  }

  // Check if we're creating an SVG element
  const svgTags = [
    'svg',
    'circle',
    'ellipse',
    'g',
    'line',
    'path',
    'polygon',
    'polyline',
    'rect',
    'text',
    'use',
  ];
  const isSvgElement = svgTags.includes(tag);

  // Create the element with the appropriate method
  const element = isSvgElement
    ? createSVGElement(tag, props)
    : createHTMLElement(tag, props);

  // Append children.
  children.flat().forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else if (Array.isArray(child)) {
      // Handle nested arrays of children
      child.forEach((nestedChild) => {
        if (nestedChild instanceof Node) {
          element.appendChild(nestedChild);
        } else if (
          typeof nestedChild === 'string' ||
          typeof nestedChild === 'number'
        ) {
          element.appendChild(document.createTextNode(String(nestedChild)));
        }
      });
    } else if (child !== null && child !== undefined && child !== false) {
      // Convert other non-null values to string
      element.appendChild(document.createTextNode(String(child)));
    }
  });
  return element;
}

/**
 * Creates an SVG element with the appropriate namespace.
 * @param tag - The SVG tag name.
 * @param props - The properties to set on the element.
 * @returns An SVG element.
 */
function createSVGElement(
  tag: string,
  props: Record<string, any> | null,
): Element {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.setAttribute('class', value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        // Attach event listeners (e.g., onClick -> click)
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (
        [
          'stroke-width',
          'fill-rule',
          'clip-rule',
          'fill',
          'stroke',
          'viewBox',
        ].includes(key)
      ) {
        // Handle SVG-specific attributes
        element.setAttributeNS(null, key, value);
      } else {
        element.setAttribute(key, value);
      }
    });
  }

  return element;
}

/**
 * Creates an HTML element.
 * @param tag - The HTML tag name.
 * @param props - The properties to set on the element.
 * @returns An HTML element.
 */
function createHTMLElement(
  tag: string,
  props: Record<string, any> | null,
): Element {
  const element = document.createElement(tag);

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

/**
 * Fragment component that renders children without a wrapper element
 * @param props - Component props containing children
 * @returns A document fragment containing all children
 */
export function Fragment(props: { children: any }) {
  const fragment = document.createDocumentFragment();

  // Handle both single child and arrays of children
  const children = Array.isArray(props.children)
    ? props.children.flat()
    : [props.children];

  children.forEach((child) => {
    if (child === null || child === undefined || child === false) {
      return;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      fragment.appendChild(document.createTextNode(child.toString()));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    } else if (Array.isArray(child)) {
      // Handle nested arrays of children
      child.forEach((nestedChild) => {
        if (nestedChild instanceof Node) {
          fragment.appendChild(nestedChild);
        } else if (nestedChild != null) {
          fragment.appendChild(document.createTextNode(String(nestedChild)));
        }
      });
    }
  });

  return fragment;
}
