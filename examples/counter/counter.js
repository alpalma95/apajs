import { define } from "../../src";
import { html } from "../../src";
import { stream, hook } from "https://esm.sh/apajs-streams@1.0.1";
import { sheet, tw } from "../shared/twind";
import "../shared/backBtnComponent";

// So all web components in light DOM share the same Twind stylesheet.
document.adoptedStyleSheets = [sheet.target];

define(
  {
    tag: "custom-1",
    shadow: "open",
    // Shadow is available when declaring shadow root config. Adding the same constructed
    // stylesheet as for the light DOM.
    onConstruct: host => {
      host.shadow.adoptedStyleSheets = [sheet.target];
    },
  },
  function (ctx) {
    const { $refs } = ctx;
    let count = stream(3);
    let double = stream(() => count.val * 2);

    ctx.onInit = () => {
      hook(() => {
        $refs.count.forEach(el => (el.textContent = count.val));
      });
      hook(() => ($refs.double.textContent = double.val));
    };

    const inc = num => {
      count.val += num;
    };

    ctx.handlers = {
      inc,
    };

    return html`
      <div>
        <h1 class="${tw`font-bold text-3xl`}">
          Count incrementing by: ${ctx.props.step}
        </h1>
        <div class="red">
          Count is: <span ref="count">${count}</span> and double is:
          <span ref="double">${double}</span>
        </div>
        <button
          class="${tw`rounded bg-blue-200 px-4 py-2 my-2 font-semibold`}"
          :click="inc | ${ctx.props.step}"
        >
          From component + ${ctx.props.step}
        </button>
        <slot></slot>
      </div>
    `;
  }
);
