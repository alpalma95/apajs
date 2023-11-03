import { defineComponent } from "./src/round";
import { derive, html } from "./src";
import { state } from "./src";

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
      <!-- This is how we access props from template, if we don't want them to be reactive -->
      <h2>Count started at: ${props.initial_count}</h2>
      <div class="red">Count is: ${count} and double is: ${double}</div>
      <button @click="${() => inc(3)}">++</button>

      <!-- Of course, we can use other custom elements in here! -->
      <custom-2></custom-2>
    </div>`,
  },
  { shadow: "open" }
);

defineComponent("custom-2", {
  count: 0,
  items: [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ],
  render: ({ count, items }) => html`<div>
    <h1>Test works! ${count}</h1>
    <ul>
      ${items.map((it) => html`<li>Item ${it.id}: ${it.text}</li>`)}
    </ul>
  </div>`,
});
