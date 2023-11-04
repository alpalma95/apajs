let { isArray: isArray } = Array;
let txtNodes = (arr) => {
  if (!isArray(arr)) {
    return typeof arr === "string" ? document.createTextNode(arr) : arr;
  }
  return arr.map((el) =>
    typeof el == "string" ? document.createTextNode(el) : el
  );
};

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps();
    let root = this.shadowRoot ? this.shadowRoot : this;
    let content = txtNodes(this.ctx.render(this.ctx) ?? this.render());

    if (isArray(content)) {
      content.forEach((el) => root.appendChild(el));
    } else {
      root.appendChild(content);
    }
    this.onInit();
  }
  attributeChangedCallback(n, ov, nv) {
    n.startsWith(":") ? (this[n.slice(1)] = nv) : (this[n] = nv);
    this.watch(n.slice(1), JSON.parse(ov), JSON.parse(nv));
  }
  disconnectedCallback() {
    this.onDestroy();
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
        this.ctx["getHost"] = () => this;
        if (options.shadow) {
          this.attachShadow({ mode: options.shadow });
        }
      }
      onInit() {
        if (this.ctx["onInit"]) {
          this.ctx.onInit(this);
        }
      }
      onDestroy() {
        if (this.ctx["onDestroy"]) {
          this.ctx.onDestroy(this);
        }
      }
      watch(n, ov, nv) {
        if (this.ctx["watch"]) {
          this.ctx.watch(n, ov, nv, this);
        }
      }
    }
  );
};
