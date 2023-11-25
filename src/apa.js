/// <reference types="./main.d.ts" />

import { hydrateAsync, observeChildren } from "./hydrationManager";

/**
 * *@type {import("./main").DefineComponent}
 */
export let define = (options, component) => {
  window.customElements.define(
    options.tag,
    class extends HTMLElement {
      constructor() {
        super();
        this.ctx = {
          onInit: root => {},
          onDestroy: () => {},
          host: this,
          $refs: {},
          handlers: {},
          watch: (n, ov, nv) => {},
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
          let value = this.getAttribute(attr);
          try {
            temp[attr] = JSON.parse(value);
          } catch (_) {
            temp[attr] = value;
          }
        });

        this.ctx["props"] = temp;
        this.ctx["handlers"] = {};

        let root = this.shadowRoot ?? this;
        root.innerHTML = component(this.ctx);

        (async () => {
          await hydrateAsync(this, this.ctx);
        })();

        // even though root is also accessible from ctx.host, it might be too verbose
        // if we want to do any query selector on init. It takes literally one word
        // and it makes query selector much easier in the component.
        this.ctx.onInit(root);

        let observerConfig = {
          childList: true,
          subtree: true,
        };

        observeChildren(this).then(observer => {
          if (this.shadowRoot)
            observer.observe(this.shadowRoot, observerConfig);

          observer.observe(this, observerConfig);
        });
      }
      attributeChangedCallback(n, ov, nv) {
        this.ctx.watch(n, ov, nv);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
