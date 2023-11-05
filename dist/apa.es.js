let { isArray: P } = Array, { createTextNode: V } = document, { fromEntries: B, entries: G, keys: H } = Object, { parse: S } = JSON, J = (t) => P(t) ? t.map((e) => typeof e == "string" ? V(e) : e) : typeof t == "string" ? V(t) : t;
class K extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getAttributeNames().forEach((o) => {
      if (!o.startsWith(":"))
        return;
      let n = {};
      n[o.slice(1)] = S(this.getAttribute(o)), this.ctx ? this.ctx.props = n : this.props = n;
    });
    let e = this.shadowRoot ? this.shadowRoot : this, s = J(this.render());
    P(s) ? s.forEach((o) => e.appendChild(o)) : e.appendChild(s), this.onInit();
  }
  attributeChangedCallback(e, s, o) {
    e.startsWith(":") ? this[e.slice(1)] = o : this[e] = o, this.watch(e.slice(1), S(s), S(o));
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  watch(e, s, o) {
    this.ctx.watch && this.ctx.watch(e, s, o, this);
  }
  onInit() {
    this.ctx.onInit && this.ctx.onInit(this);
  }
  onDestroy() {
    this.ctx.onDestroy && this.ctx.onDestroy(this);
  }
  render() {
    return this.ctx.render(this.ctx);
  }
}
let L = (t) => {
  for (let e of H(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
  return t;
}, le = (t, e, s = {}) => {
  window.customElements.define(
    t,
    class extends K {
      static get observedAttributes() {
        return s.observed ?? [];
      }
      constructor() {
        super(), this.ctx = L(e), this.ctx.getHost = () => this, s.shadow && this.attachShadow({ mode: s.shadow });
      }
    }
  );
};
function q(t) {
  for (var e, s, o = arguments, n = 1, i = "", a = "", l = [0], d = function(r) {
    n === 1 && (r || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(r ? o[r] : i) : n === 3 && (r || i) ? (l[1] = r ? o[r] : i, n = 2) : n === 2 && i === "..." && r ? l[2] = Object.assign(l[2] || {}, o[r]) : n === 2 && i && !r ? (l[2] = l[2] || {})[i] = !0 : n >= 5 && (n === 5 ? ((l[2] = l[2] || {})[s] = r ? i ? i + o[r] : o[r] : i, n = 6) : (r || i) && (l[2][s] += r ? i + o[r] : i)), i = "";
  }, c = 0; c < t.length; c++) {
    c && (n === 1 && d(), d(c));
    for (var p = 0; p < t[c].length; p++)
      e = t[c][p], n === 1 ? e === "<" ? (d(), l = [l, "", null], n = 3) : i += e : n === 4 ? i === "--" && e === ">" ? (n = 1, i = "") : i = e + i[0] : a ? e === a ? a = "" : i += e : e === '"' || e === "'" ? a = e : e === ">" ? (d(), n = 1) : n && (e === "=" ? (n = 5, s = i, i = "") : e === "/" && (n < 5 || t[c][p + 1] === ">") ? (d(), n === 3 && (l = l[0]), n = l, (l = l[0]).push(this.apply(null, n.slice(1))), n = 0) : e === " " || e === "	" || e === `
` || e === "\r" ? (d(), n = 2) : i += e), n === 3 && i === "!--" && (n = 4, l = l[0]);
  }
  return d(), l.length > 2 ? l.slice(1) : l[1];
}
let x = Object, _, f = x.getPrototypeOf, O = document, y, h, u, T = { isConnected: 1 }, z = 1e3, b, k = {}, Q = f(T), D = f(f), I = (t, e, s, o) => (t ?? (setTimeout(s, o), /* @__PURE__ */ new Set())).add(e), N = (t, e, s) => {
  let o = h;
  h = e;
  try {
    return t(s);
  } catch (n) {
    return console.error(n), s;
  } finally {
    h = o;
  }
}, m = (t) => t.filter((e) => {
  var s;
  return (s = e._dom) == null ? void 0 : s.isConnected;
}), j = (t) => b = I(b, t, () => {
  for (let e of b)
    e._bindings = m(e._bindings), e._listeners = m(e._listeners);
  b = _;
}, z), v = {
  get val() {
    return h == null || h.add(this), this._val;
  },
  get oldVal() {
    return h == null || h.add(this), this._oldVal;
  },
  set val(t) {
    let e = this;
    if (t !== e._val) {
      e._val = t;
      let s = [...e._listeners = m(e._listeners)];
      for (let o of s)
        M(o.f, o.s, o._dom), o._dom = _;
      e._bindings.length ? y = I(y, e, Z) : e._oldVal = t;
    }
  }
}, W = (t) => ({
  __proto__: v,
  _val: t,
  _oldVal: t,
  _bindings: [],
  _listeners: []
}), F = (t) => f(t ?? 0) === v, U = (t) => F(t) ? t.val : t, X = (t) => F(t) ? t.oldVal : t, g = (t, e) => {
  let s = /* @__PURE__ */ new Set(), o = { f: t }, n = u;
  u = [];
  let i = N(t, s, e);
  i = (i ?? O).nodeType ? i : new Text(i);
  for (let a of s)
    j(a), a._bindings.push(o);
  for (let a of u)
    a._dom = i;
  return u = n, o._dom = i;
}, M = (t, e = W(), s) => {
  let o = /* @__PURE__ */ new Set(), n = { f: t, s: e };
  n._dom = s ?? (u == null ? void 0 : u.push(n)) ?? T, e.val = N(t, o);
  for (let i of o)
    j(i), i._listeners.push(n);
  return e;
}, R = (t, ...e) => {
  for (let s of e.flat(1 / 0)) {
    let o = f(s ?? 0), n = o === v ? g(() => s.val) : o === D ? g(s) : s;
    n != _ && t.append(n);
  }
  return t;
}, Y = (t) => (t._isBindingFunc = 1, t), E = (t) => new Proxy((e, ...s) => {
  var a;
  let [o, ...n] = f(s[0] ?? 0) === Q ? s : [{}, ...s], i = t ? O.createElementNS(t, e) : O.createElement(e);
  for (let [l, d] of x.entries(o)) {
    let c = (C) => C ? x.getOwnPropertyDescriptor(C, l) ?? c(f(C)) : _, p = e + "," + l, r = k[p] ?? (k[p] = ((a = c(f(i))) == null ? void 0 : a.set) ?? 0), w = r ? r.bind(i) : i.setAttribute.bind(i, l), A = f(d ?? 0);
    A === v ? g(() => (w(d.val), i)) : A === D && (!l.startsWith("on") || d._isBindingFunc) ? g(() => (w(d()), i)) : w(d);
  }
  return R(i, ...n);
}, { get: (e, s) => e.bind(_, s) }), $ = (t, e) => e ? e !== t && t.replaceWith(e) : t.remove(), Z = () => {
  let t = [...y].filter((e) => e._val !== e._oldVal);
  y = _;
  for (let e of new Set(t.flatMap((s) => s._bindings = m(s._bindings))))
    $(e._dom, g(e.f, e._dom)), e._dom = _;
  for (let e of t)
    e._oldVal = e._val;
}, ee = (t, e) => $(t, g(e, t));
const te = { add: R, _: Y, tags: E(), tagsNS: E, state: W, val: U, oldVal: X, derive: M, hydrate: ee }, { state: se, derive: re, tags: ie } = te;
function oe(t, e, ...s) {
  const o = ie[t];
  return e ? o(e, ...s) : o(...s);
}
const de = q.bind(oe);
let ne = (t) => typeof t != "object" ? se(t) : B(G(t).map(([e, s]) => [e, ne(s)]));
export {
  K as ReactiveWC,
  le as defineComponent,
  re as derive,
  de as html,
  ne as reactive,
  se as state
};
