import { defineComponent } from "./src/round";
import { html } from "./src";
import { ref } from "./src";

defineComponent("test-test", {
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

defineComponent(
  "bla-bla",
  {
    count: ref(0),
    inc(num) {
      this.count.val += num;
    },
    onInit() {
      // Unfortunately this is the only way to make props reactive.
      // On init, we set the val of the ref() to this.props.whatever
      this.count.val = this.props.initial_count;

      setInterval(() => {
        this.inc(4);
      }, 1000);
    },
    render: ({ count, inc, props }) => html` <div>
      <!-- This is how we access props from template, if we don't want them to be reactive -->
      <h2>Count started at: ${props.initial_count}</h2>
      <div class="red">Count is: ${count}</div>
      <button @click="${() => inc(3)}">++</button>
      <test-test></test-test>
    </div>`,
  },
  { shadow: "open" }
);
