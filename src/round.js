let transformTextNodes = (arr) => {
  if (!Array.isArray(arr)) {
    return typeof arr === "string" ? document.createTextNode(arr) : arr;
  }
  let final = arr.map((el) => {
    return typeof el == "string" ? document.createTextNode(el) : el;
  });
  return final;
};

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps();
    this.firstRender();
    this.onInit();
  }
  attributeChangedCallback(n, ov, nv) {
    n.startsWith(":") ? (this[n.slice(1)] = nv) : (this[n] = nv);
    this.watch(n.slice(1), JSON.parse(ov), JSON.parse(nv));
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    let root = this.shadowRoot ? this.shadowRoot : this;
    let content = transformTextNodes(this.ctx.render(this.ctx));

    if (Array.isArray(content)) {
      content.forEach((el) => root.appendChild(el));
    } else {
      root.appendChild(content);
    }
  }
  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      let temp = {};
      temp[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
      !this.ctx ? (this.props = temp) : (this.ctx["props"] = temp);
    });
  }
  watch(n, ov, nv) {}
  onInit() {}
  onDestroy() {}
  render() {}
}

let bindScopes = (ctx) => {
  for (let key of Object.keys(ctx)) {
    if (typeof ctx[key] === "function") {
      ctx[key] = ctx[key].bind(ctx);
    }
  }
  return ctx;
};

export let defineComponent = (tagName, ctx, options = {}) => {
  window.customElements.define(
    tagName,
    class extends ReactiveWC {
      constructor() {
        super();
        this.ctx = bindScopes(ctx);
        if (options.shadow) {
          this.attachShadow({ mode: options.shadow });
        }
      }
      onInit() {
        if (this.ctx && typeof this.ctx["onInit"] === "function") {
          this.ctx.onInit();
        }
      }
      onDestroy() {
        if (this.ctx && typeof this.ctx["onDestroy"] === "function") {
          this.ctx.onDestroy();
        }
      }
      watch(n, ov, nv) {
        if (this.ctx && typeof this.ctx["watch"] === "function") {
          this.ctx.watch(n, ov, nv);
        }
      }
    }
  );
};
