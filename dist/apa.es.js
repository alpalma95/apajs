let p = (e, r) => {
  let [t, n] = e.split("|");
  return [
    t.trim(),
    n == null ? void 0 : n.split(",").map((l) => {
      let s = l.trim();
      if (/^\'|^\"|^\`/.test(s) || s === "$event")
        return s === "$event" ? s : s.slice(1, -1);
      try {
        return JSON.parse(s);
      } catch {
        return r[s];
      }
    })
  ];
}, E = (e, r, t) => {
  let [n, l] = p(r.getAttribute(e));
  if (!n in t.handlers)
    return;
  let s = t.handlers[n], i = e.slice(1);
  l ? r.addEventListener(
    i,
    (a) => l.at(0) === "$event" ? s(a, ...l.slice(1)) : s(...l)
  ) : r.addEventListener(i, s);
}, b = (e, r) => {
  let t = e.getAttribute("ref");
  if (t)
    if (t in r.$refs)
      if (r.$refs[t] instanceof HTMLElement) {
        let n = r.$refs[t];
        r.$refs[t] = /* @__PURE__ */ new Set(), r.$refs[t].add(n).add(e);
      } else
        r.$refs[t].add(e);
    else
      r.$refs[t] = e;
}, o = (e, r) => {
  e.getAttributeNames().filter((t) => t.startsWith("@") || t === "ref").forEach((t) => {
    t == "ref" && b(e, r), t.startsWith("@") && E(t, e, r);
  });
}, w = (e) => {
  let r = e.parentElement;
  for (; (r = r.parentElement) && !r.tagName.includes("-"); )
    ;
  return r;
}, N = (e) => {
  let r = (t) => {
    t.filter(
      (l) => w(l.target) == e
    ).forEach((l) => {
      if (l.type !== "childList")
        return;
      let { addedNodes: s } = l;
      s.length && s.forEach(async (i) => {
        i.tagName && (o(i, e.ctx), i.childNodes.length > 0 && await c(i, e.ctx));
      });
    });
  };
  return new Promise((t) => {
    t(new MutationObserver(r));
  });
}, h = (e, r) => {
  if (!e)
    return;
  const t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(l) {
      return l.getAttributeNames().some((s) => s.startsWith("@") || s === "ref") ? NodeFilter.FILTER_ACCEPT : l.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let n = t.currentNode;
  for (; n = t.nextNode(); )
    o(n, r);
  e.shadowRoot !== null && h(e.shadowRoot, r);
}, c = (e, r) => new Promise((t) => {
  h(e, r), t();
}), { isArray: f } = Array, y = (e, r) => {
  f(r) ? r.forEach(
    (t) => typeof t == "string" ? e.appendChild(document.createTextNode(t)) : e.appendChild(t)
  ) : e.appendChild(
    typeof r == "string" ? document.createTextNode(r) : r
  );
}, A = (e, r) => {
  window.customElements.define(
    e.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (t) => {
          },
          onDestroy: () => {
          },
          host: this,
          $refs: {},
          handlers: {},
          watch: (t, n, l) => {
          }
        }, e.shadow && this.attachShadow({ mode: e.shadow });
      }
      static get observedAttributes() {
        return e.observed;
      }
      connectedCallback() {
        let t = {};
        this.getAttributeNames().forEach((i) => {
          i.startsWith(":") && (t[i.slice(1)] = this.getAttribute(i));
        }), this.ctx.props = t, this.ctx.handlers = {};
        let n = r(this.ctx), l = this.shadowRoot ?? this;
        y(l, n), (async () => await c(this, this.ctx))(), this.ctx.onInit(l);
        let s = {
          childList: !0,
          subtree: !0
        };
        N(this).then((i) => {
          this.shadowRoot && i.observe(this.shadowRoot, s), i.observe(this, s);
        });
      }
      attributeChangedCallback(t, n, l) {
        this.ctx.watch(t, n, l);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
}, C = (e, ...r) => {
  let t = r.map((a) => a instanceof HTMLElement ? a.outerHTML : f(a) ? a.join(" ") : a), n = e.reduce(
    (a, u, m) => a + u + (t[m] ?? ""),
    ""
  ), i = [...new DOMParser().parseFromString(n, "text/html").body.childNodes];
  return i.length === 1 ? i[0] : i;
}, d = null, g = (e) => (d = e, e()), v = (e) => {
  let r = /* @__PURE__ */ new Set(), t = () => {
    d !== null && (r.add(d), d = null);
  }, n = () => {
    r.forEach((s) => s());
  }, l = typeof e == "object" ? Object.fromEntries(
    Object.entries(e).map(([s, i]) => [
      s,
      typeof i == "object" ? v(i) : i
    ])
  ) : typeof e == "function" ? { val: g(() => e) } : { val: e };
  return new Proxy(l, {
    get(s, i) {
      return t(), typeof s[i] == "function" ? s[i]() : s[i];
    },
    set(s, i, a) {
      return s[i] = a, n(), !0;
    }
  });
};
export {
  A as define,
  g as derive,
  C as html,
  v as stream
};
