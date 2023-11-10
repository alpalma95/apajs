import { defineComponent } from "./src";
import { derive, html } from "./src";
import { state } from "./src";
import { list, reactive } from "./src";

defineComponent({ tag: "custom-1", shadow: "open" }, function (ctx) {
  const count = state(3);
  const double = derive(() => count.val * 2);
  const host = ctx.getHost();

  const step = +ctx.props.step;
  const inc = () => {
    count.val += step;
  };

  ctx.onInit(() => console.log(host));

  return html`<div>
    <!-- Because of how Van works under the hood, we must set the whole property as calculated state.
  style="color: \${()=>...}" would result into an empty attribute-->
    <h2 style="${() => (count.val % 2 == 0 ? "color: red" : "color: blue")}">
      <!-- This is how we access props from template, if we don't want them to be reactive -->
      Count incrementing by: ${ctx.props.step}
    </h2>
    <div class="red">Count is: ${count} and double is: ${double}</div>
    <button onclick="${inc}">++</button>

    <!-- Of course, we can use other custom elements in here! -->
    <custom-2></custom-2>
  </div>`;
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
  return list(
    () => html`<ul class="red"></ul>`, // callback returning the container of the list
    arr, // dependencies array
    item =>
      // map function as we would normally do
      html`<li>
        Item no: ${item.val.id}: ${item.val.text}
        <button onclick="${() => removeItem(item.val.id)}">remove</button>
      </li>`
  );
};

defineComponent({ tag: "custom-2" }, function (ctx) {
  const state = reactive({ count: 2 });
  const items = reactive([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]);
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
    <h1>Test works! ${() => state.count}</h1>
    <button onclick="${addItem}">Inc reactive</button>
    <h2>Non reactive list</h2>
    <!-- Note that in this case a simple map would work as expected -->
    ${nonReactiveItems.map(
      item => html`<li>Item: ${item.id}: ${item.text}</li>`
    )}
    <!-- Here we're using the mapped array. We could do it inline as well -->
    <h2>Reactive list: Items <strong>${() => items.length}</strong></h2>
    <!-- Disclaimer2: if we use the reactiveList property getter, this condition will work
  until the list is empty. Then, after we add more items, we can see how the number of items
  is still incrementing and the p has been replaced with the ul, but the list will show empty -->
    ${() => (items.length > 0 ? reactiveList(items) : html`<p>No items!</p>`)}
  </div>`;
});

defineComponent({ tag: "custom-3" }, function (ctx) {
  const { initial_count } = ctx.props;
  const host = ctx.getHost();

  ctx.onInit(() => console.log(host));

  const count = state(initial_count);
  return html`
    <h1>Count is: ${count}</h1>
    <button
      onclick="${() => {
        count.val++;
        console.log("Host from method!", host);
      }}"
    >
      Inc
    </button>
    <div>
      <custom-4 :name="${count}"></custom-2>
    </div>
  `;
});

defineComponent({ tag: "custom-4", observed: [":name"] }, function (ctx) {
  const att = state(ctx.props.name);
  ctx.watch(":name", (n, ov, nv) => (att.val = nv));
  ctx.onDestroy(() => console.log("Byeeeeee"));

  return html`<h1>Test from changing attribute: ${att}</h1>`;
});
