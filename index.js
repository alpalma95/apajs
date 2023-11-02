import { ReactiveWC } from "./src/round";
import { createApp } from "petite-vue";
class Test extends ReactiveWC {
  constructor() {
    super();
  }

  onInit() {
    this.count = 0;

    this.inc = (num) => {
      this.count += num;
      console.log("workin'");
    };
  }

  render() {
    return /*html*/ `
    <div>
      <div>{{ count }}</div>
      <button @click="()=>inc()">++</button>
    </div>`;
  }
}

window.customElements.define("test-test", Test);

const defineComponent = (tagName, ctx) => {
  window.customElements.define(
    tagName,
    class extends ReactiveWC {
      constructor() {
        super();
        this.ctx = ctx;
      }
    }
  );
};

defineComponent("bla-bla", {
  count: 0,
  inc(num) {
    this.count += num;
  },
  render: () => /*html*/ `
  <div>
    <div>{{ count }}</div>
    <button @click="inc(3)">++</button>
  </div>`,
});
