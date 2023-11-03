const transformTextNodes = (arr) => {
  if (!Array.isArray(arr)) {
    return typeof arr === "string" ? document.createTextNode(arr) : arr;
  }
  const final = arr.map((el) => {
    if (typeof el == "string") {
      return document.createTextNode(el);
    } else {
      return el;
    }
  });
  return final;
};

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.firstRender();
    this.getProps();
    this.onInit();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name.startsWith(":")
      ? (this[name.slice(1)] = newValue)
      : (this[name] = newValue);
    this.watchAttributes(
      name.slice(1),
      JSON.parse(newValue),
      JSON.parse(oldValue)
    );
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    const root = this.shadowRoot ? this.shadowRoot : this;
    const content = transformTextNodes(this.ctx.render(this.ctx));

    if (Array.isArray(content)) {
      content.forEach((el) => root.appendChild(el));
    } else {
      root.appendChild(content);
    }
    this._componentDidRender = true;
  }
  async update() {}

  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      this[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
    });
  }

  /**
   *
   * @param {string} name Name of the attribute that is triggering the change callback
   * @param {any} oldValue Old value previous to the change
   * @param {any} newValue Value after the change
   */
  watchAttributes(name, oldValue, newValue) {}
  onInit() {
    if (this.ctx && typeof this.ctx["onInit"] === "function") {
      this.ctx?.onInit();
    }
  }
  onDestroy() {}
  render() {}
}

const bindScopes = (ctx) => {
  for (const key of Object.keys(ctx)) {
    if (typeof ctx[key] === "function") {
      ctx[key] = ctx[key].bind(ctx);
    }
  }
  return ctx;
};

export const defineComponent = (tagName, ctx) => {
  window.customElements.define(
    tagName,
    class extends ReactiveWC {
      constructor() {
        super();
        this.ctx = bindScopes(ctx);
      }
    }
  );
};
