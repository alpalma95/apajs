import { ReactiveWC } from "../../../../src";
import { html } from "../../../../src";

export class ErrorMessage extends ReactiveWC {
  constructor() {
    super();
  }

  onInit() {
    this.classList.add("error-message");
  }

  render() {
    return html`
      <h2>Something went wrong!</h2>
      <p>Please try again later or contact support if the problem persists.</p>
    `;
  }
}
