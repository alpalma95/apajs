import { CardComponent } from "./js/components/cardComponent";
import { ListComponent } from "./js/components/listComponent";
import { ErrorMessage } from "./js/components/errorMessage";
import { ResetButton } from "./js/components/resetButton";

window.customElements.define("card-component", CardComponent);
window.customElements.define("list-component", ListComponent);
window.customElements.define("error-message", ErrorMessage);
window.customElements.define("reset-button", ResetButton);
