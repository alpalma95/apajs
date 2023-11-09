import { isArray } from "./utils";
import { jsonParse } from "./utils";
import { keys } from "./utils";

let txtNodes = arr => {
  console.log(arr);
  if (!isArray(arr)) {
    return typeof arr === "string" ? document.createTextNode(arr) : arr;
  }
  return arr.map(el =>
    typeof el == "string" ? document.createTextNode(el) : el
  );
};

class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getAttributeNames().forEach(attr => {
      if (!attr.startsWith(":")) return;
      let temp = {};
      temp[attr.slice(1)] = jsonParse(this.getAttribute(attr));
      this.ctx["props"] = temp;
    });
    let root = this.shadowRoot ?? this;
    let content = txtNodes(this.ctx.render(this.ctx));

    if (isArray(content)) {
      content.forEach(el => root.appendChild(el));
    } else {
      root.appendChild(content);
    }

    if (this.ctx["onInit"]) {
      this.ctx.onInit(this);
    }
  }
  attributeChangedCallback(n, ov, nv) {
    if (this.ctx["watch"]) {
      this.ctx.watch(n.slice(1), jsonParse(ov), jsonParse(nv), this);
    }
  }
  disconnectedCallback() {
    if (this.ctx["onDestroy"]) {
      this.ctx.onDestroy(this);
    }
  }
}

let bindScopes = ctx => {
  for (let key of keys(ctx)) {
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
      static get observedAttributes() {
        return options.observed ?? [];
      }
      constructor() {
        super();
        this.ctx = bindScopes(ctx);
        this.ctx["getHost"] = () => this;
        if (options.shadow) {
          this.attachShadow({ mode: options.shadow });
        }
      }
    }
  );
};
