let { isArray: b } = Array, { fromEntries: g, entries: a, keys: w } = Object, l = (o, s) => {
  b(s) ? s.forEach(
    (r) => typeof r == "string" ? o.appendChild(document.createTextNode(r)) : o.appendChild(r)
  ) : o.appendChild(
    typeof s == "string" ? document.createTextNode(s) : s
  );
}, C = (o, s) => {
  window.customElements.define(
    o.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (r = () => {
          }) => r(),
          onDestroy: (r = () => {
          }) => r(),
          subscribers: [],
          host: this,
          watch: (r, i) => this.ctx.subscribers.push({
            attributeName: r,
            cb: i
          })
        }, o.shadow && this.attachShadow({ mode: o.shadow });
      }
      static get observedAttributes() {
        return o.observed;
      }
      connectedCallback() {
        let r = {};
        this.getAttributeNames().forEach((e) => {
          e.startsWith(":") && (r[e.slice(1)] = this.getAttribute(e));
        }), this.ctx.props = r;
        let i = s(this.ctx), t = this.shadowRoot ?? this;
        l(t, i), this.ctx.onInit();
      }
      attributeChangedCallback(r, i, t) {
        this.ctx.subscribers.forEach(({ attributeName: e, cb: c }) => {
          r === e && c(r, i, t);
        });
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
function m(o) {
  for (var s, r, i = arguments, t = 1, e = "", c = "", n = [0], f = function(d) {
    t === 1 && (d || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? n.push(d ? i[d] : e) : t === 3 && (d || e) ? (n[1] = d ? i[d] : e, t = 2) : t === 2 && e === "..." && d ? n[2] = Object.assign(n[2] || {}, i[d]) : t === 2 && e && !d ? (n[2] = n[2] || {})[e] = !0 : t >= 5 && (t === 5 ? ((n[2] = n[2] || {})[r] = d ? e ? e + i[d] : i[d] : e, t = 6) : (d || e) && (n[2][r] += d ? e + i[d] : e)), e = "";
  }, u = 0; u < o.length; u++) {
    u && (t === 1 && f(), f(u));
    for (var h = 0; h < o[u].length; h++)
      s = o[u][h], t === 1 ? s === "<" ? (f(), n = [n, "", null], t = 3) : e += s : t === 4 ? e === "--" && s === ">" ? (t = 1, e = "") : e = s + e[0] : c ? s === c ? c = "" : e += s : s === '"' || s === "'" ? c = s : s === ">" ? (f(), t = 1) : t && (s === "=" ? (t = 5, r = e, e = "") : s === "/" && (t < 5 || o[u][h + 1] === ">") ? (f(), t === 3 && (n = n[0]), t = n, (n = n[0]).push(this.apply(null, t.slice(1))), t = 0) : s === " " || s === "	" || s === `
` || s === "\r" ? (f(), t = 2) : e += s), t === 3 && e === "!--" && (t = 4, n = n[0]);
  }
  return f(), n.length > 2 ? n.slice(1) : n[1];
}
function y(o, s, ...r) {
  const i = document.createElement(o);
  if (s)
    for (const [t, e] of a(s))
      t.startsWith("on-") ? i.addEventListener(t.slice(3), e) : i.setAttribute(t, e);
  return r && r.forEach((t) => {
    if (b(t)) {
      t.forEach((e) => l(i, e));
      return;
    }
    if (typeof t != "object") {
      const e = document.createTextNode(t);
      i.appendChild(e);
      return;
    }
    i.appendChild(t);
  }), i;
}
const j = m.bind(y);
let p = null, x = (o) => (p = o, o()), E = (o) => {
  let s = /* @__PURE__ */ new Set(), r = () => {
    p !== null && (s.add(p), p = null);
  }, i = () => {
    s.forEach((e) => e());
  }, t = typeof o == "object" ? Object.fromEntries(
    Object.entries(o).map(([e, c]) => [
      e,
      typeof c == "object" ? E(c) : c
    ])
  ) : typeof o == "function" ? { val: x(() => o) } : { val: o };
  return new Proxy(t, {
    get(e, c) {
      return r(), typeof e[c] == "function" ? e[c]() : e[c];
    },
    set(e, c, n) {
      return e[c] = n, i(), !0;
    }
  });
};
export {
  C as defineComponent,
  x as derive,
  j as html,
  E as stream
};
