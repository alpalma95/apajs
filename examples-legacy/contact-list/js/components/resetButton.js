import { ReactiveWC, html } from "../../../../src";
import { userService } from "../services/userService";

export class ResetButton extends ReactiveWC {
  constructor() {
    super();
  }

  resetCount() {
    userService.count.value = 0;
  }

  render() {
    return html`<button @click="${this.resetCount}">
      <slot name="test">Default text</slot>
    </button>`;
  }
}
