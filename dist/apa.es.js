let { isArray: l } = Array, { fromEntries: C, entries: j, keys: a } = Object, m = (r, t, s) => {
  r.addEventListener(t.slice(1), s);
}, E = (r, t) => {
  a(t).forEach((s) => {
    if (s.startsWith("@")) {
      m(r, s, t[s]);
      return;
    }
    r.setAttribute(s, t[s]);
  });
}, d = (r) => {
  if (typeof r != "object")
    return document.createTextNode(r);
  const t = document.createElement(r.type);
  return r.props && E(t, r.props), r.children && r.children.map(
    (s) => l(s) ? s.map(d) : d(s)
  ).forEach((s) => {
    l(s) ? s.forEach((o) => t.appendChild(o)) : t.appendChild(s);
  }), t;
}, v = (r, t) => {
  window.customElements.define(
    r.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (s = () => {
          }) => s(),
          onDestroy: (s = () => {
          }) => s(),
          subscribers: [],
          getHost: () => this,
          watch: (s, o) => this.ctx.subscribers.push({
            attributeName: s,
            cb: o
          })
        }, r.shadow && this.attachShadow({ mode: r.shadow });
      }
      static get observedAttributes() {
        return r.observed;
      }
      connectedCallback() {
        let s = {};
        this.getAttributeNames().forEach((e) => {
          e.startsWith(":") && (s[e.slice(1)] = this.getAttribute(e));
        }), this.ctx.props = s;
        let o = t(this.ctx), c = this.shadowRoot ?? this;
        l(o) ? o.forEach((e) => c.appendChild(d(e))) : c.appendChild(d(o)), this.ctx.onInit();
      }
      attributeChangedCallback(s, o, c) {
        this.ctx.subscribers.forEach(({ attributeName: e, cb: i }) => {
          s === e && i(s, o, c);
        });
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
function y(r) {
  for (var t, s, o = arguments, c = 1, e = "", i = "", n = [0], u = function(h) {
    c === 1 && (h || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? n.push(h ? o[h] : e) : c === 3 && (h || e) ? (n[1] = h ? o[h] : e, c = 2) : c === 2 && e === "..." && h ? n[2] = Object.assign(n[2] || {}, o[h]) : c === 2 && e && !h ? (n[2] = n[2] || {})[e] = !0 : c >= 5 && (c === 5 ? ((n[2] = n[2] || {})[s] = h ? e ? e + o[h] : o[h] : e, c = 6) : (h || e) && (n[2][s] += h ? e + o[h] : e)), e = "";
  }, f = 0; f < r.length; f++) {
    f && (c === 1 && u(), u(f));
    for (var b = 0; b < r[f].length; b++)
      t = r[f][b], c === 1 ? t === "<" ? (u(), n = [n, "", null], c = 3) : e += t : c === 4 ? e === "--" && t === ">" ? (c = 1, e = "") : e = t + e[0] : i ? t === i ? i = "" : e += t : t === '"' || t === "'" ? i = t : t === ">" ? (u(), c = 1) : c && (t === "=" ? (c = 5, s = e, e = "") : t === "/" && (c < 5 || r[f][b + 1] === ">") ? (u(), c === 3 && (n = n[0]), c = n, (n = n[0]).push(this.apply(null, c.slice(1))), c = 0) : t === " " || t === "	" || t === `
` || t === "\r" ? (u(), c = 2) : e += t), c === 3 && e === "!--" && (c = 4, n = n[0]);
  }
  return u(), n.length > 2 ? n.slice(1) : n[1];
}
function g(r, t, ...s) {
  return { type: r, props: t, children: s };
}
const A = y.bind(g);
let p = null, x = (r) => (p = r, r()), w = (r) => {
  let t = /* @__PURE__ */ new Set(), s = () => {
    p !== null && (t.add(p), p = null);
  }, o = () => {
    t.forEach((e) => e());
  }, c = typeof r == "object" ? Object.fromEntries(
    Object.entries(r).map(([e, i]) => [
      e,
      typeof i == "object" ? w(i) : i
    ])
  ) : typeof r == "function" ? { val: x(() => r) } : { val: r };
  return new Proxy(c, {
    get(e, i) {
      return s(), typeof e[i] == "function" ? e[i]() : e[i];
    },
    set(e, i, n) {
      return e[i] = n, o(), !0;
    }
  });
};
export {
  v as defineComponent,
  x as derive,
  A as html,
  w as stream
};
