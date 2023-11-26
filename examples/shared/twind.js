import { create, cssomSheet } from "https://cdn.skypack.dev/twind";
import "https://cdn.skypack.dev/twind/shim";

export const sheet = cssomSheet({ target: new CSSStyleSheet() });
export const { tw } = create({ sheet });
