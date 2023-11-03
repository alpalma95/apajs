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

defineComponent("bla-bla", {
  count: ref(0),
  inc(num) {
    this.count.val += num;
  },
  onInit() {
    console.log("Hi from on init");
    setInterval(() => {
      this.inc(4);
    }, 1000);
  },
  render: ({ count, inc }) => html` <div>
    <div>${count}</div>
    <button @click="${() => inc(3)}">++</button>
    <test-test></test-test>
  </div>`,
});
