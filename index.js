import { define } from "./src";
import { html } from "./src";

define({ tag: "custom-1", shadow: "open" }, function (ctx) {
  let count = 3;
  let double = count * 2;
  const test = "blaaaa test";

  const step = +ctx.props.step;
  const inc = () => {
    // Will be simplified later with streams
    count += step;
    ctx.host.shadowRoot.querySelector("div.red > span").textContent = count;
    double = count * 2;
    ctx.host.shadowRoot.querySelector('div [data-id="double"]').textContent =
      double;
  };

  // Kind of if like this was a class, we "override" the default onInit method.
  ctx.onInit = root => {
    console.log(root.querySelector("h2"));

    // Because content projected from slot is not technically inside the shadow root,
    // but projected in it. For query selecting it, we must use the light root of the
    // custom element.
    ctx.host.querySelector("[data-id]").addEventListener("click", inc);
  };

  return html`
    <div>
      <h2 style="color: red;">
        Count incrementing by: ${ctx.props.step} ${test.toUpperCase()}
      </h2>
      <div class="red">
        Count is: <span>${count}</span> and double is:
        <span data-id="double">${double}</span>
      </div>
      <button on-click="${inc}">++</button>
      <slot></slot>

      <custom-2></custom-2>
    </div>
    <div>saf</div>
  `;
});

define({ tag: "custom-2" }, function (ctx) {
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

define({ tag: "custom-3" }, function (ctx) {
  const { initial_count } = ctx.props;
  let count = initial_count;

  return html`
    <h1>Count is: <span data-id="count">${count}</span></h1>
    <button
      on-click="${() => {
        count++;

        // when implementing streams this logic will be outside the event handler
        ctx.host.querySelector("custom-4").setAttribute(":name", count);
        ctx.host.querySelector("[data-id='count']").textContent = count;
      }}"
    >
      Inc
    </button>
    <div>
      <custom-4 :name="${count}"></custom-2>
    </div>
  `;
});

define({ tag: "custom-4", observed: [":name"] }, function (ctx) {
  let att = ctx.props.name;
  ctx.watch = (n, ov, nv) => {
    if (n == ":name") {
      // doing it like this so later we can test streams
      att = nv;
      ctx.host.querySelector("span").textContent = att;
    }
  };

  return html`<h1>Test from changing attribute: <span>${att}</span></h1>`;
});
