// Types for state and derive
/// <reference types="vanjs-core" />
// Types for reactive and list
/// <reference types="vanjs-ext" />

type shadow = "open" | "closed";
type HTMLElementOrString = HTMLElement | string;
type props = {
  [key: string]: any;
};

type watch = (
  name: String,
  oldValue: any,
  newValue: any,
  host?: HTMLElement
) => void;

interface ContextInternal extends Context {
  getHost(): HTMLElement;
  props?: props;
}

export interface Context {
  [key: string]: any;
  onInit?: (host?: HTMLElement) => void;
  onDestroy?: (host?: HTMLElement) => void;
  watch?: watch;
  render: (ctx: ContextInternal) => HTMLElementOrString | HTMLElementOrString[];
}

export interface Options {
  shadow?: shadow;
  observed: string[];
}

export type DefineComponent = (
  tagName: string,
  ctx: Context,
  opt?: Options
) => void;

export declare const defineComponent: DefineComponent;
