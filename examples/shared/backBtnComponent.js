import { define, html } from "../../src";

define({ tag: "back-btn" }, function (_) {
  return html`
    <a
      class="font-bold text-blue-700 hover:(underline text-blue-900) mb-10 block"
      href="/"
      >&lAarr; Back to examples</a
    >
  `;
});
