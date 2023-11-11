/// <reference types="./main.d.ts" />

import { createElement, isArray } from "./utils";

/**
 * *@type {import("./main").DefineComponent}
 */
export let defineComponent = (options, component) => {
  window.customElements.define(
    options.tag,
    class extends HTMLElement {
      constructor() {
        super();
        this.ctx = {
          onInit: (cb = () => {}) => cb(),
          onDestroy: (cb = () => {}) => cb(),
          subscribers: [],
          getHost: () => this,
          watch: (name, cb) =>
            this.ctx.subscribers.push({
              attributeName: name,
              cb: cb,
            }),
        };
        if (options.shadow) {
          this.attachShadow({ mode: options.shadow });
        }
      }
      static get observedAttributes() {
        return options.observed;
      }

      connectedCallback() {
        let temp = {};

        this.getAttributeNames().forEach(attr => {
          if (!attr.startsWith(":")) return;
          temp[attr.slice(1)] = this.getAttribute(attr);
        });

        this.ctx["props"] = temp;
        let content = component(this.ctx);
        let root = this.shadowRoot ?? this;

        if (isArray(content)) {
          content.forEach(el => root.appendChild(createElement(el)));
        } else {
          root.appendChild(createElement(content));
        }

        this.ctx.onInit();
      }
      attributeChangedCallback(n, ov, nv) {
        this.ctx.subscribers.forEach(({ attributeName, cb }) => {
          if (n === attributeName) cb(n, ov, nv);
        });
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
