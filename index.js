import { defineComponent } from "./src";
import { html } from "./src";
import { state } from "./src";

defineComponent({ tag: "custom-1", shadow: "open" }, function (ctx) {
  let count = 3;
  let double = count * 2;
  const host = ctx.getHost();
  const test = "blaaaa test";

  const step = +ctx.props.step;
  const inc = () => {
    count += step;
    console.log("yes");
  };

  // ctx.onInit(() => console.log(host));

  return html`<div>
      <h2 style="color: red;">
        Count incrementing by: ${ctx.props.step} ${test.toUpperCase()}
      </h2>
      <div class="red">Count is: ${count} and double is: ${double}</div>
      <button @click="${inc}">++</button>

      <custom-2></custom-2>
    </div>
    <div>saf</div> `;
});

// For looping over an array of items, we need to use the list function (directly exported from vanX addon)
// Items array must be a reactive object.
// Disclaimer: I don't really like this, as it feels a bit more cumbersome than directly mapping an array,
// as we would do in JSX or in other web components libraries like Lit or Hybrids. I'll look for a solution
// after tests have been implemented
// We will use this below
// Tip: see how we can use "functional" components
const reactiveList = arr => {
  const removeItem = itemID => {
    arr.splice([arr.findIndex(item => item.id == itemID)], 1);
  };
  return html`<ul class="red">
    ${arr.map(
      item =>
        html`<li>
          Item no: ${item.id}: ${item.text}
          <button @click="${() => removeItem(item.id)}">remove</button>
        </li>`
    )}
  </ul>`;
};

defineComponent({ tag: "custom-2" }, function (ctx) {
  const state = { count: 2 };
  const items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ];
  const nonReactiveItems = [
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
    <!-- For accessing the value of reactive objects and them being reactive, we need to use an arrow function -->
    <h1>Test works! ${state.count}</h1>
    <button @click="${addItem}">Inc reactive</button>
    <h2>Non reactive list</h2>
    <!-- Note that in this case a simple map would work as expected -->
    ${nonReactiveItems.map(
      item => html`<li>Item: ${item.id}: ${item.text}</li>`
    )}
    <!-- Here we're using the mapped array. We could do it inline as well -->
    <h2>Reactive list: Items <strong>${items.length}</strong></h2>
    <!-- Disclaimer2: if we use the reactiveList property getter, this condition will work
  until the list is empty. Then, after we add more items, we can see how the number of items
  is still incrementing and the p has been replaced with the ul, but the list will show empty -->
    ${items.length > 0 ? reactiveList(items) : html`<p>No items!</p>`}
  </div>`;
});

defineComponent({ tag: "custom-3" }, function (ctx) {
  const { initial_count } = ctx.props;
  const host = ctx.getHost();

  // ctx.onInit(() => console.log(host));

  const count = initial_count;
  return html`
    <h1>Count is: ${count}</h1>
    <button
      @click="${() => {
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
  const att = state(ctx.props.name);
  ctx.watch(":name", (n, ov, nv) => (att.val = nv));
  // ctx.onDestroy(() => console.log("Byeeeeee"));

  return html`<h1>Test from changing attribute: ${att}</h1>`;
});
