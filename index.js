import { define } from "./src";
import { html } from "./src";
import { stream, hook } from "./src";
import { create, cssomSheet } from "https://cdn.skypack.dev/twind";
import "https://cdn.skypack.dev/twind/shim";
// Test styles with Twind
const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

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

        <custom-2></custom-2>
      </div>
    `;
  }
);

define({ tag: "custom-2" }, function (ctx) {
  const items = stream([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]);
  let _initial = items.val.at(-1).id + 1;

  ctx.onInit = () => {
    hook(() => {
      const emptyMessage = html`<p class="${tw`text-red-500`}">No items!</p>`;

      const list = html`${items.val.map(
        item =>
          html`<li ref="list_item_${item.id}">
            Item ${item.id}: ${item.text}
            <button
              class="${tw`bg-gray-100 p-1 rounded text-sm`}"
              :click="remove | ${item.id}"
            >
              🗑️
            </button>
          </li>`
      )}`;

      ctx.$refs.list.innerHTML = items.val.length == 0 ? emptyMessage : list;
    });
  };

  ctx.handlers = {
    add() {
      items.val = [...items.val, { id: _initial, text: `Item ${_initial}` }];
      _initial++;
    },
    remove(id) {
      items.val = [...items.val.filter(item => item.id != id)];
    },
  };

  return html`<div>
    <h2 class="${tw`font-bold text-2xl`}">Custom 2 works!</h2>
    <button
      class="${tw`rounded bg-blue-200 px-2 py-1 my-2 font-semibold`}"
      :click="add"
    >
      Add item
    </button>
    <h2 class="${tw`font-bold text-xl`}">List</h2>
    <ul ref="list" class="${tw`mb-5`}"></ul>
  </div>`;
});

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
