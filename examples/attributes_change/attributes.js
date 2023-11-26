import { define } from "../../src";
import { html } from "../../src";
import { stream, hook } from "../../src";
import { sheet, tw } from "../shared/twind";
import "../shared/backBtnComponent";

document.adoptedStyleSheets = [sheet.target];

define({ tag: "custom-3" }, function (ctx) {
  const { $refs: $ } = ctx;
  let count = stream(ctx.props.initial_count);

  ctx.onInit = () => {
    hook(() => {
      $.text_count.textContent = count.val;
      $.attr_count.setAttribute("name", count.val);
    });
  };

  ctx.handlers = {
    inc() {
      count.val++;
    },
  };
  return html`
    <h1 class="font-bold text-3xl mt-3">
      Count is: <span ref="text_count">${count}</span>
    </h1>
    <button
      class="${tw`rounded bg-blue-200 px-2 py-1 my-2 font-semibold`}"
      :click="inc"
    >
      Inc
    </button>
    <div>
      <custom-4 ref="attr_count" name="${count}"></custom-4>
    </div>
  `;
});

const Custom4Options = {
  tag: "custom-4",
  observed: ["name"],
};

define(Custom4Options, function (ctx) {
  let att = stream(ctx.props.name);

  ctx.onInit = () => {
    // Technically the attributes change callback is doing the same (at least, for this use case),
    // but this showcases that each instance of the component has its own scope.
    // This was a bug in previous versions.
    hook(() => (ctx.$refs.name.textContent = att.val));
  };

  ctx.watch = (n, ov, nv) => {
    if (n == "name") {
      att.val = nv;
    }
  };

  return html`<p class="">
    Test from changing attribute: <span ref="name">${att.val}</span>
  </p>`;
});
