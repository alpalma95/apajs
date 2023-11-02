import { createApp } from "petite-vue";

export class ReactiveWC extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.firstRender();
    this.setAttribute("v-scope", "");
    this.getProps();
    this.onInit();
    createApp({ ...this.ctx }).mount(this);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    name.startsWith(":")
      ? (this[name.slice(1)] = newValue)
      : (this[name] = newValue);
    this.watchAttributes(
      name.slice(1),
      JSON.parse(newValue),
      JSON.parse(oldValue)
    );
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    const root = this.shadowRoot ? this.shadowRoot : this;
    root.innerHTML = this.ctx.render();
    this._componentDidRender = true;
  }
  async update() {}

  getProps() {
    this.getAttributeNames().forEach((attr) => {
      if (!attr.startsWith(":")) return;
      this[attr.slice(1)] = JSON.parse(this.getAttribute(attr));
    });
  }

  /**
   *
   * @param {string} name Name of the attribute that is triggering the change callback
   * @param {any} oldValue Old value previous to the change
   * @param {any} newValue Value after the change
   */
  watchAttributes(name, oldValue, newValue) {}
  onInit() {}
  onDestroy() {}
  render() {}
}
