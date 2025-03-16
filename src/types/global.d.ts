/** @jsx createElement */
declare function createElement(tag: any, props: any, ...children: any[]): HTMLElement;
declare const Fragment: any;

// Define JSX namespace
namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
