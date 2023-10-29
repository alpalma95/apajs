import { getVDOMAsync, diffAsync } from "./diff";
import { buildDOM, html } from "./round-html";
import { appendDOM, track, unregisterEvents } from "./utils";

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
    html.bind(this);
  }
  connectedCallback() {
    this.getProps();
    this.onInit();
    this.firstRender();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name.startsWith(":")
      ? (this[name.slice(1)] = newValue)
      : (this[name] = newValue);
    this.watchAttributes(
      name.slice(1),
      JSON.parse(oldValue),
      JSON.parse(newValue)
    );
    this.update();
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    const root = this.shadowRoot ? this.shadowRoot : this;

    const innerHTML = buildDOM(this.render());
    appendDOM(root, innerHTML);
  }
  async update() {
    console.log("Track WAS: ", track);
    unregisterEvents(this);
    console.log("Track is: ", track);

    const vdom = buildDOM(this.render());
    const dom = this.shadowRoot ? this.shadowRoot : this;
    await diffAsync(vdom, dom);
  }

  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      this[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
    });
  }

  defineState(object) {
    if (object === null || typeof object !== "object") {
      return object;
    }
    for (const property in object) {
      object[property] = this.defineState(object[property]);
    }
    return new Proxy(object, {
      get(target, property) {
        return target[property];
      },
      set: (target, property, value) => {
        if (target[property] !== value) {
          target[property] = value;
          this.update();
        }
        return true;
      },
    });
  }
  onInit() {}
  onDestroy() {}
  render() {}
}
