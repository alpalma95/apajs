let m = (t, r) => {
  let [e, s] = t.split("|");
  return [
    e.trim(),
    s == null ? void 0 : s.split(",").map((i) => {
      let n = i.trim();
      if (/^\'|^\"|^\`/.test(n) || n === "$event")
        return n === "$event" ? n : n.slice(1, -1);
      try {
        return JSON.parse(n);
      } catch {
        return r[n];
      }
    })
  ];
}, p = (t, r, e) => {
  let [s, i] = m(r.getAttribute(t));
  if (!s in e.handlers)
    return;
  let n = e.handlers[s], a = t.slice(1);
  i ? r.addEventListener(
    a,
    (l) => i.at(0) === "$event" ? n(l, ...i.slice(1)) : n(...i)
  ) : r.addEventListener(a, n);
}, w = (t, r) => {
  let e = t.getAttribute("ref");
  if (e)
    if (e in r.$refs)
      if (r.$refs[e] instanceof HTMLElement) {
        let s = r.$refs[e];
        r.$refs[e] = /* @__PURE__ */ new Set(), r.$refs[e].add(s).add(t);
      } else
        r.$refs[e].add(t);
    else
      r.$refs[e] = t;
}, b = (t, r) => {
  let e = t.getAttribute("ref");
  r.$refs[e] instanceof Set ? r.$refs[e].delete(t) : delete r.$refs[e];
}, c = (t, r) => {
  t.getAttributeNames().filter((e) => e.startsWith(":") || e === "ref").forEach((e) => {
    e == "ref" && w(t, r), e.startsWith(":") && p(e, t, r);
  });
}, E = (t) => {
  let r = t.parentElement;
  for (; (r = r.parentElement) && !r.tagName.includes("-"); )
    ;
  return r;
}, N = (t) => {
  let r = (e) => {
    e.filter(
      (i) => E(i.target) == t
    ).forEach((i) => {
      if (i.type !== "childList")
        return;
      let { addedNodes: n, removedNodes: a } = i;
      a.length && a.forEach((l) => {
        !l.tagName || !l.getAttribute("ref") || b(l, t.ctx);
      }), n.length && n.forEach(async (l) => {
        l.tagName && (c(l, t.ctx), l.childNodes.length > 0 && await u(l, t.ctx));
      });
    });
  };
  return new Promise((e) => {
    e(new MutationObserver(r));
  });
}, d = (t, r) => {
  if (!t)
    return;
  const e = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    /** @param {HTMLElement} node */
    acceptNode(i) {
      return i.getAttributeNames().some((n) => n.startsWith(":") || n === "ref") ? NodeFilter.FILTER_ACCEPT : i.tagName.includes("-") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    }
  });
  let s = e.currentNode;
  for (; s = e.nextNode(); )
    c(s, r);
  t.shadowRoot !== null && d(t.shadowRoot, r);
}, u = (t, r) => new Promise((e) => {
  d(t, r), e();
}), L = (t, r) => {
  window.customElements.define(
    t.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (e) => {
          },
          onDestroy: () => {
          },
          host: this,
          $refs: {},
          handlers: {},
          watch: (e, s, i) => {
          }
        }, t.shadow && (this.shadow = this.attachShadow({ mode: t.shadow })), typeof t.onConstruct == "function" && t.onConstruct(this);
      }
      static get observedAttributes() {
        return t.observed;
      }
      connectedCallback() {
        let e = {};
        this.getAttributeNames().forEach((n) => {
          let a = this.getAttribute(n);
          try {
            e[n] = JSON.parse(a);
          } catch {
            e[n] = a;
          }
        }), this.ctx.props = e, this.ctx.handlers = {};
        let s = this.shadowRoot ?? this;
        s.innerHTML = r(this.ctx), (async () => await u(this, this.ctx))();
        let i = {
          childList: !0,
          subtree: !0
        };
        N(this).then((n) => {
          this.shadowRoot && n.observe(this.shadowRoot, i), n.observe(this, i), this.ctx.onInit(s);
        });
      }
      attributeChangedCallback(e, s, i) {
        this.ctx.watch(e, s, i);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
}, { isArray: g } = Array, T = (t, ...r) => {
  let e = r.map((s) => s instanceof HTMLElement ? s.outerHTML : g(s) ? s.join(" ") : s);
  return t.reduce(
    (s, i, n) => s + i + (e[n] ?? ""),
    ""
  );
}, f = null, o = /* @__PURE__ */ new WeakMap();
class y {
  constructor(r) {
    this.cb = r, this._set = /* @__PURE__ */ new Set();
  }
  unhook() {
    this._set.forEach((r) => r.delete(this));
  }
}
let A = (t) => {
  f = new y(t), f.cb();
  let r = f;
  return f = null, r;
}, R = (t, r) => {
  if (f === null)
    return;
  let e;
  o.has(t) ? e = o.get(t).get(r) : o.set(t, /* @__PURE__ */ new Map([[r, e = /* @__PURE__ */ new Set()]])), f._set.add(e), e.add(f);
}, $ = (t, r) => {
  if (!o.get(t))
    return;
  o.get(t).get(r).forEach(({ cb: s }) => s());
}, C = (t) => {
  if (Array.isArray(t) || typeof t != "function" && typeof t != "object")
    return { val: t };
  if (typeof t == "function") {
    let r = h(1);
    return A(() => r.val = t()), r;
  } else
    return Object.fromEntries(
      Object.entries(t).map(([r, e]) => [
        r,
        typeof e == "object" || typeof e == "function" ? h(e) : e
      ])
    );
}, h = (t) => {
  let r = C(t);
  return new Proxy(r, {
    get(e, s, i) {
      return R(e, s), Reflect.get(e, s, i);
    },
    set(e, s, i, n) {
      return e[s] !== i && (Reflect.set(e, s, i, n), $(e, s)), !0;
    }
  });
};
export {
  L as define,
  A as hook,
  T as html,
  h as stream
};
