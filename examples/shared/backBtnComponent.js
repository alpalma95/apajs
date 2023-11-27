import { define, html } from "../../src";

define(
  { tag: "back-btn", onConstruct: host => host.setAttribute("href", "/") },
  function (_) {
    return html`
      <span
        class="font-bold text-blue-700 hover:(underline text-blue-900) mb-10 block"
        href="/"
        >&lAarr; Back to examples</span
      >
    `;
  },
  { className: HTMLAnchorElement, tag: "a" }
);
