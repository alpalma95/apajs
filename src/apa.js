/// <reference types="./main.d.ts" />

import { isArray } from "./utils";
import { keys } from "./utils";

let txtNodes = arr => {
  if (!isArray(arr)) {
    return typeof arr === "string" ? document.createTextNode(arr) : arr;
  }
  return arr.map(el =>
    typeof el == "string" ? document.createTextNode(el) : el
  );
};

let bindScopes = ctx => {
  for (let key of keys(ctx)) {
    if (typeof ctx[key] === "function") {
      ctx[key] = ctx[key].bind(ctx);
    }
  }
  return ctx;
};

/**
 * @type {import("./main").DefineComponent}
 */
export let defineComponent = (tagName, ctx, options = {}) => {
  window.customElements.define(
    tagName,
    class extends HTMLElement {
      constructor() {
        super();
        this.ctx = bindScopes(ctx);
        if (options.shadow) {
          this.attachShadow({ mode: options.shadow });
        }
      }
      connectedCallback() {
        let temp = {};

        this.getAttributeNames().forEach(attr => {
          if (!attr.startsWith(":")) return;
          temp[attr.slice(1)] = this.getAttribute(attr);
        });

        this.ctx["props"] = temp;

        this.ctx["getHost"] = () => this;
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
          this.ctx.watch(n.slice(1), ov, nv, this);
        }
      }
      disconnectedCallback() {
        if (this.ctx["onDestroy"]) {
          this.ctx.onDestroy(this);
        }
      }
    }
  );
};
