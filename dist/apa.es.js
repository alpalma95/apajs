let { isArray: l } = Array, { fromEntries: E, entries: a, keys: w } = Object, m = (o, s) => {
  l(s) ? s.forEach(
    (c) => typeof c == "string" ? o.appendChild(document.createTextNode(c)) : o.appendChild(c)
  ) : o.appendChild(
    typeof s == "string" ? document.createTextNode(s) : s
  );
}, C = (o, s) => {
  window.customElements.define(
    o.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (c) => {
          },
          onDestroy: () => {
          },
          host: this,
          watch: (c, r, t) => {
          }
        }, o.shadow && this.attachShadow({ mode: o.shadow });
      }
      static get observedAttributes() {
        return o.observed;
      }
      connectedCallback() {
        let c = {};
        this.getAttributeNames().forEach((e) => {
          e.startsWith(":") && (c[e.slice(1)] = this.getAttribute(e));
        }), this.ctx.props = c;
        let r = s(this.ctx), t = this.shadowRoot ?? this;
        m(t, r), this.ctx.onInit(t);
      }
      attributeChangedCallback(c, r, t) {
        this.ctx.watch(c, r, t);
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
function b(o) {
  for (var s, c, r = arguments, t = 1, e = "", d = "", n = [0], f = function(i) {
    t === 1 && (i || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? n.push(i ? r[i] : e) : t === 3 && (i || e) ? (n[1] = i ? r[i] : e, t = 2) : t === 2 && e === "..." && i ? n[2] = Object.assign(n[2] || {}, r[i]) : t === 2 && e && !i ? (n[2] = n[2] || {})[e] = !0 : t >= 5 && (t === 5 ? ((n[2] = n[2] || {})[c] = i ? e ? e + r[i] : r[i] : e, t = 6) : (i || e) && (n[2][c] += i ? e + r[i] : e)), e = "";
  }, u = 0; u < o.length; u++) {
    u && (t === 1 && f(), f(u));
    for (var h = 0; h < o[u].length; h++)
      s = o[u][h], t === 1 ? s === "<" ? (f(), n = [n, "", null], t = 3) : e += s : t === 4 ? e === "--" && s === ">" ? (t = 1, e = "") : e = s + e[0] : d ? s === d ? d = "" : e += s : s === '"' || s === "'" ? d = s : s === ">" ? (f(), t = 1) : t && (s === "=" ? (t = 5, c = e, e = "") : s === "/" && (t < 5 || o[u][h + 1] === ">") ? (f(), t === 3 && (n = n[0]), t = n, (n = n[0]).push(this.apply(null, t.slice(1))), t = 0) : s === " " || s === "	" || s === `
` || s === "\r" ? (f(), t = 2) : e += s), t === 3 && e === "!--" && (t = 4, n = n[0]);
  }
  return f(), n.length > 2 ? n.slice(1) : n[1];
}
function y(o, s, ...c) {
  const r = document.createElement(o);
  if (s)
    for (const [t, e] of a(s))
      t.startsWith("on-") ? r.addEventListener(t.slice(3), e) : r.setAttribute(t, e);
  return c && c.forEach((t) => {
    if (l(t)) {
      t.forEach((e) => m(r, e));
      return;
    }
    if (typeof t != "object") {
      const e = document.createTextNode(t);
      r.appendChild(e);
      return;
    }
    r.appendChild(t);
  }), r;
}
const v = b.bind(y);
let p = null, x = (o) => (p = o, o()), g = (o) => {
  let s = /* @__PURE__ */ new Set(), c = () => {
    p !== null && (s.add(p), p = null);
  }, r = () => {
    s.forEach((e) => e());
  }, t = typeof o == "object" ? Object.fromEntries(
    Object.entries(o).map(([e, d]) => [
      e,
      typeof d == "object" ? g(d) : d
    ])
  ) : typeof o == "function" ? { val: x(() => o) } : { val: o };
  return new Proxy(t, {
    get(e, d) {
      return c(), typeof e[d] == "function" ? e[d]() : e[d];
    },
    set(e, d, n) {
      return e[d] = n, r(), !0;
    }
  });
};
export {
  C as defineComponent,
  x as derive,
  v as html,
  g as stream
};
