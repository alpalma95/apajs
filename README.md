<picture>
    <img src="./docs/img/apa-thumbnail.png" alt="Cute water drop with eyes and smile" width="150" align="right" />
</picture>

<h1>ApăJS</h1>

<sub> `Apă` (_water_, in Romanian) &ndash; For when you just need a little hydration.</sub>

# Intro

ApăJS is a minimal library aiming at reducing boilerplate around web components, yet keeping them fairly "vanilla". With its **~3kb** (minified, **~1kb** gzipped), it provides out-of-the-box:

- A way of creating web components with a functional approach
- Automatically add event handlers to DOM elements
- Automatically store references to the DOM to lower the boilerplate around query selectors
- First-class support for server-side rendered HTML

# Getting started

The easiest way of getting started is via esm. You can import the main functions from there:

```javascript
import { define, html } from "https://esm.sh/apajs@1.0.1";

define({ tag: "hello-world" }, function () {
  return html`<h1>Hello world!</h1>`;
});
```

Alternatively, if you want to use npm, `npm i apajs`.

Documentation is still WIP. If you're super curious and want to test it out, please take a look a the [examples](/examples) directory. There you can find several examples to have a first feel of how the syntax looks like!
