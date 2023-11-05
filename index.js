import { defineComponent } from "./src/apa";
import { derive, html } from "./src";
import { state } from "./src";
import { list, reactive } from "./src/van";

defineComponent(
  "custom-1",
  {
    // State, directly re-exported from van
    count: state(3),
    // Derive is also reexported from van. For computed values based on other
    // states within the object literal, we should use a getter.
    get double() {
      return derive(() => this.count.val * 2);
      // Notice the following would work, but wouldn't be reactive:
      // return this.count.val * 2
    },

    inc(num) {
      this.count.val += num;
      // The get host function will be automatically added to the context, in case
      // we want to interact with the class.
      const host = this.getHost();
      console.log("From a defined method!", host);
    },
    // For methods that have equivalent in lifecycle methods, the host argument
    // will be passed automatically.
    onInit(host) {
      // Unfortunately this is the only way to make props reactive.
      // On init, we set the val of the state() to this.props.whatever
      this.count.val = this.props.initial_count;
      console.log("From onInit!", host);
    },
    // Under the hood, the whole context is passed as argument, hence we can destructure
    // all the properties that we're defining above
    render: ({ count, inc, props, double }) => html`<div>
      <!-- Because of how Van works under the hood, we must set the whole property as calculated state.
    style="color: \${()=>...}" would result into an empty attribute-->
      <h2 style="${() => (count.val % 2 == 0 ? "color: red" : "color: blue")}">
        <!-- This is how we access props from template, if we don't want them to be reactive -->
        Count started at: ${props.initial_count}
      </h2>
      <div class="red">Count is: ${count} and double is: ${double}</div>
      <button onclick="${() => inc(3)}">++</button>

      <!-- Of course, we can use other custom elements in here! -->
      <custom-2></custom-2>
    </div>`,
  },
  { shadow: "open" }
);

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

defineComponent("custom-2", {
  // Reactive, directly exported from vanX addon
  state: reactive({ count: 2 }),
  items: reactive([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]),
  nonReactiveItems: [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ],
  addItem() {
    this.state.count++;
    const newItem = {
      id: this.state.count,
      text: `Item num ${this.state.count}`,
    };
    this.items.push(newItem);
  },

  // If we want the list to work as expected, we must mutate it, it's not enough with reassigning.

  render: ({ state, addItem, items, nonReactiveItems }) => html`<div>
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
  </div>`,
});
