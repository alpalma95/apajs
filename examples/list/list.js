import { define } from "../../src";
import { html } from "../../src";
import { stream, hook } from "https://esm.sh/apajs-streams@1.0.1";
import { sheet, tw } from "../shared/twind";
import "../shared/backBtnComponent";

document.adoptedStyleSheets = [sheet.target];

// For components where we don't need any lifecycle hooks, it's better to just use a function
const list = streamArr =>
  html`${streamArr.val.map(
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

define({ tag: "custom-2" }, function (ctx) {
  const items = stream([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]);
  let _initial = items.val.at(-1).id + 1;

  const emptyMessage = html`<p class="${tw`text-blue-700`}">No items!</p>`;

  ctx.onInit = () => {
    hook(() => {
      ctx.$refs.list.innerHTML =
        items.val.length == 0 ? emptyMessage : list(items);
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
