type shadow = "open" | "closed";
type props = {
  [key: string]: any;
};

type watch = (name: String, oldValue: any, newValue: any) => void;
type Ref = HTMLElement | Set<HTMLElement>;
interface Refs {
  [key: string]: Ref;
}

interface Handlers {
  [key: string]: () => any;
}

export interface Context {
  [key: string]: any;
  onInit?: (host?: HTMLElement) => void;
  onDestroy?: (host?: HTMLElement) => void;
  watch?: watch;
  $refs: Refs | Object;
  host: HTMLElement;
  handlers: Handlers | Object;
  props?: props | Object;
}

/**
 * - **Tag**: Selector for our custom component. Nevermind
 * if we're using an autonomous custom element or not, we shoud
 * provide one
 *
 * - **Shadow:** If set to any value, it'll be created in our custom element
 *
 * - **onConstruct**: Host (customElemet) will be passed as argument.
 * This is especially useful if we need to perform any custom logic
 * that typically should run inside the constructor.
 *
 * - **Observed**: list of observed attributes to be watched during the attributeChangedCallback
 *
 * - **isStatic**: Optional parameter to avoid all hydration step
 */
export interface Options {
  tag: string;
  shadow?: shadow;
  onConstruct?: (host?: HTMLElement) => void;
  observed?: string[];
  isStatic?: boolean;
}

/**
 * In case we want our custom element to extend an existing one.
 */
interface Ext {
  className?: HTMLElement;
  tag?: string;
}

/**
 * It takes the context as a parameter (where we can set lifecycle methods, as well as handlers for event listeners) and optionally returns a string to be used as innerHTML.
 *
 */
type Component = (ctx: Context) => string | void;

export type Define = (
  options: Options,
  component: Component,
  ext?: Ext
) => void;
