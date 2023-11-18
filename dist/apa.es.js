let N = (e, ...s) => {
  let r = e.reduce(
    (i, a, h) => i + a + (s[h] ?? ""),
    ""
  ), t = [...new DOMParser().parseFromString(r, "text/html").body.childNodes];
  return t.length === 1 ? t[0] : t;
}, c = (e, s) => {
  let [r, n] = e.split("|");
  return [
    r.trim(),
    n == null ? void 0 : n.split(",").map((l) => {
      let t = l.trim();
      if (/^\'|^\"|^\`/.test(t) || t === "$event")
        return t === "$event" ? t : t.slice(1, -1);
      try {
        return JSON.parse(t);
      } catch {
        return s[t];
      }
    })
  ];
}, u = (e, s, r) => {
  let [n, l] = c(s.getAttribute(e));
  if (!n in r.handlers)
    return;
  let t = r.handlers[n], i = e.slice(1);
  l ? s.addEventListener(
    i,
    (a) => l.at(0) === "$event" ? t(a, ...l.slice(1)) : t(...l)
  ) : s.addEventListener(i, t);
}, f = (e, s) => {
  let r = e.getAttribute("ref");
  r && (r in s.$refs ? s.$refs[r] = [s.$refs[r], e].flat(1 / 0) : s.$refs[r] = e);
}, o = (e, s) => {
  if (!e)
    return;
  const r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(l) {
      return l.getAttributeNames().some((t) => t.startsWith("@") || t === "ref") ? NodeFilter.FILTER_ACCEPT : l.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let n = r.currentNode;
  for (; n = r.nextNode(); )
    n.getAttributeNames().filter((l) => l.startsWith("@") || l === "ref").forEach((l) => {
      u(l, n, s), f(n, s);
    });
  e.shadowRoot !== null && o(e.shadowRoot, s);
}, { isArray: p } = Array, m = (e, s) => {
  p(s) ? s.forEach(
    (r) => typeof r == "string" ? e.appendChild(document.createTextNode(r)) : e.appendChild(r)
  ) : e.appendChild(
    typeof s == "string" ? document.createTextNode(s) : s
  );
}, y = (e, s) => {
  window.customElements.define(
    e.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (r) => {
          },
          onDestroy: () => {
          },
          host: this,
          $refs: {},
          handlers: {},
          watch: (r, n, l) => {
          }
        }, e.shadow && this.attachShadow({ mode: e.shadow });
      }
      static get observedAttributes() {
        return e.observed;
      }
      connectedCallback() {
        let r = {};
        this.getAttributeNames().forEach((t) => {
          t.startsWith(":") && (r[t.slice(1)] = this.getAttribute(t));
        }), this.ctx.props = r, this.ctx.handlers = {};
        let n = s(this.ctx), l = this.shadowRoot ?? this;
        m(l, n), o(this, this.ctx), this.ctx.onInit(l);
      }
      attributeChangedCallback(r, n, l) {
        this.ctx.watch(r, n, l);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
}, d = null, b = (e) => (d = e, e()), E = (e) => {
  let s = /* @__PURE__ */ new Set(), r = () => {
    d !== null && (s.add(d), d = null);
  }, n = () => {
    s.forEach((t) => t());
  }, l = typeof e == "object" ? Object.fromEntries(
    Object.entries(e).map(([t, i]) => [
      t,
      typeof i == "object" ? E(i) : i
    ])
  ) : typeof e == "function" ? { val: b(() => e) } : { val: e };
  return new Proxy(l, {
    get(t, i) {
      return r(), typeof t[i] == "function" ? t[i]() : t[i];
    },
    set(t, i, a) {
      return t[i] = a, n(), !0;
    }
  });
};
export {
  y as define,
  b as derive,
  N as html,
  E as stream
};
