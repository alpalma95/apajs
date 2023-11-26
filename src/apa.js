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
          this.shadow = this.attachShadow({ mode: options.shadow });
        }
        if (typeof options.onConstruct === "function")
          options.onConstruct(this);
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

        let observerConfig = {
          childList: true,
          subtree: true,
        };

        observeChildren(this).then(observer => {
          if (this.shadowRoot)
            observer.observe(this.shadowRoot, observerConfig);

          observer.observe(this, observerConfig);

          // Calling onInit after the observer has been created. In case we create new elements on init
          // for them to be hydrated.
          this.ctx.onInit(root);
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
