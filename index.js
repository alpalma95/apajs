import { define } from "./src";
import { html } from "./src";

define({ tag: "custom-1", shadow: "open" }, function (ctx) {
  const { $refs } = ctx;

  ctx.onInit = root => {
    /**
     * Equivalent would be (because we're using both shadow
     * and light root for slotted elements):
     *
     *    [root.querySelector('[ref="count"]').textContent = count,
     *    ctx.host.querySelector('[ref="count"]').textContent = count]
     *      .forEach(...)
     */
    $refs.count.forEach(el => (el.textContent = count));
  };

  let count = 3;
  let double = count * 2;

  const inc = num => {
    // Will be simplified later with streams
    count += num;
    $refs.count.forEach(el => (el.textContent = count));
    double = count * 2;
    $refs.double.textContent = double;
  };

  ctx.handlers = {
    inc,
  };

  return html`
    <div>
      <h2 style="color: red;">Count incrementing by: ${ctx.props.step}</h2>
      <div class="red">
        Count is: <span ref="count">${count}</span> and double is:
        <span ref="double">${double}</span>
      </div>
      <button @click="inc | ${ctx.props.step}">
        From component + ${ctx.props.step}
      </button>
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

  return html`<div>
    <h1>Test works! ${state.count}</h1>
    <h2>List</h2>
    ${items.map(item => `<li>Item: ${item.id}: ${item.text}</li>`).join("")}
  </div>`;
});

define({ tag: "custom-3" }, function (ctx) {
  const { $refs: $ } = ctx;

  const { initial_count } = ctx.props;
  let count = initial_count;

  ctx.handlers = {
    inc() {
      count++;

      // when implementing streams this logic will be outside the event handler
      // ctx.host.querySelector("custom-4").setAttribute(":name", count);
      // ctx.host.querySelector("[data-id='count']").textContent = count;
      $.text_count.textContent = count;
      $.attr_count.setAttribute(":name", count);
    },
  };
  return html`
    <h1>Count is: <span ref="text_count">${count}</span></h1>
    <button @click="inc"> Inc </button>
    <div>
      <custom-4 ref="attr_count" :name="${count}"></custom-2>
    </div>
  `;
});

define({ tag: "custom-4", observed: [":name"] }, function (ctx) {
  let att = ctx.props.name;
  ctx.watch = (n, ov, nv) => {
    if (n == ":name") {
      // doing it like this so later we can test streams
      att = nv;
      ctx.$refs.name.textContent = att;
    }
  };

  return html`<h1>
    Test from changing attribute: <span ref="name">${att}</span>
  </h1>`;
});
