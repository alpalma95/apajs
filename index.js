import { defineComponent } from "./src";
import { html } from "./src";

defineComponent({ tag: "custom-1", shadow: "open" }, function (ctx) {
  let count = 3;
  let double = count * 2;
  const test = "blaaaa test";

  const step = +ctx.props.step;
  const inc = () => {
    count += step;
    console.log("yes");
  };

  return html`
    <div>
      <h2 style="color: red;">
        Count incrementing by: ${ctx.props.step} ${test.toUpperCase()}
      </h2>
      <div class="red">Count is: ${count} and double is: ${double}</div>
      <button on-click="${inc}">++</button>
      <custom-2></custom-2>
    </div>
    <div>saf</div>
  `;
});

defineComponent({ tag: "custom-2" }, function (ctx) {
  const state = { count: 2 };
  const items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ];

  const addItem = function () {
    state.count++;
    const newItem = {
      id: state.count,
      text: `Item num ${state.count}`,
    };

    items.push(newItem);
  };

  return html`<div>
    <h1>Test works! ${state.count}</h1>
    <button on-click="${addItem}">Inc reactive</button>
    <h2>Non reactive list</h2>
    ${items.map(item => html` <li>Item: ${item.id}: ${item.text}</li>`)}
  </div>`;
});

defineComponent({ tag: "custom-3" }, function (ctx) {
  const { initial_count } = ctx.props;
  const host = ctx.host;

  ctx.onInit(() => console.log(host));

  const count = initial_count;
  return html`

    <h1>Count is: ${count}</h1>
    <button
      on-click="${() => {
        console.log("Host from method!", host);
      }}"
    >
      Inc
    </button>
    <div>
      <custom-4 :name="2"></custom-2>
    </div>
  `;
});

defineComponent({ tag: "custom-4", observed: [":name"] }, function (ctx) {
  const att = ctx.props.name;
  ctx.watch(":name", (n, ov, nv) => (att = nv));

  // ctx.onDestroy(() => console.log("Byeeeeee"));

  return html`<h1>Test from changing attribute: ${att}</h1>`;
});
