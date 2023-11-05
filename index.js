import { defineComponent } from "./src/apa";
import { derive, html } from "./src";
import { state } from "./src";
import { reactive } from "./src/reactive";
import van from "vanjs-core";

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

defineComponent("custom-2", {
  // VanX (addon) offers a reactive function that does the same. However, for the scope of
  // ApaJS, I believe it'd be an overkill, since it implies other helpers. I decided
  // to go with my own lightweight version, based on Van state
  state: reactive({ count: 2 }),
  items: state([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ]),
  addItem() {
    this.state.count.val++;
    const newItem = {
      id: this.state.count.val,
      text: `Item num ${this.state.count.val}`,
    };
    this.items.val = [...this.items.val, newItem];
    van.add(
      this.list_root,
      html`<li>Item no: ${newItem.id}: ${newItem.text}</li>`
    );
    // this.state.count.val.add({
    //   id: this.state.count.val,
    //   text: `Item num ${this.state.count.val}`,
    // });
    console.log(this.items.val);
  },
  list_root: html`<ul key="random"></ul>`,
  render: ({ state, items, addItem, list_root }) => html`<div>
    <h1>Test works! ${state.count}</h1>
    ${list_root}
    <button onclick="${addItem}">Inc reactive</button>
  </div>`,
});
