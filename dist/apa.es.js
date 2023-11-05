let { isArray: P } = Array, M = (t) => P(t) ? t.map(
  (e) => typeof e == "string" ? document.createTextNode(e) : e
) : typeof t == "string" ? document.createTextNode(t) : t;
class R extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps();
    let e = this.shadowRoot ? this.shadowRoot : this, s = M(this.ctx.render(this.ctx) ?? this.render());
    P(s) ? s.forEach((n) => e.appendChild(n)) : e.appendChild(s), this.onInit();
  }
  attributeChangedCallback(e, s, n) {
    e.startsWith(":") ? this[e.slice(1)] = n : this[e] = n, this.watch(e.slice(1), JSON.parse(s), JSON.parse(n));
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  getProps() {
    this.getAttributeNames().forEach((e) => {
      if (!e.startsWith(":"))
        return;
      let s = {};
      s[e.slice(1)] = JSON.parse(this.getAttribute(e)), this.ctx ? this.ctx.props = s : this.props = s;
    });
  }
  watch(e, s, n) {
  }
  onInit() {
  }
  onDestroy() {
  }
  render() {
  }
}
let $ = (t) => {
  for (let e of Object.keys(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
  return t;
}, ie = (t, e, s = {}) => {
  window.customElements.define(
    t,
    class extends R {
      constructor() {
        super(), this.ctx = $(e), this.ctx.getHost = () => this, s.shadow && this.attachShadow({ mode: s.shadow });
      }
      onInit() {
        this.ctx.onInit && this.ctx.onInit(this);
      }
      onDestroy() {
        this.ctx.onDestroy && this.ctx.onDestroy(this);
      }
      watch(n, o, i) {
        this.ctx.watch && this.ctx.watch(n, o, i, this);
      }
    }
  );
};
function B(t) {
  for (var e, s, n = arguments, o = 1, i = "", a = "", l = [0], d = function(r) {
    o === 1 && (r || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(r ? n[r] : i) : o === 3 && (r || i) ? (l[1] = r ? n[r] : i, o = 2) : o === 2 && i === "..." && r ? l[2] = Object.assign(l[2] || {}, n[r]) : o === 2 && i && !r ? (l[2] = l[2] || {})[i] = !0 : o >= 5 && (o === 5 ? ((l[2] = l[2] || {})[s] = r ? i ? i + n[r] : n[r] : i, o = 6) : (r || i) && (l[2][s] += r ? i + n[r] : i)), i = "";
  }, c = 0; c < t.length; c++) {
    c && (o === 1 && d(), d(c));
    for (var p = 0; p < t[c].length; p++)
      e = t[c][p], o === 1 ? e === "<" ? (d(), l = [l, "", null], o = 3) : i += e : o === 4 ? i === "--" && e === ">" ? (o = 1, i = "") : i = e + i[0] : a ? e === a ? a = "" : i += e : e === '"' || e === "'" ? a = e : e === ">" ? (d(), o = 1) : o && (e === "=" ? (o = 5, s = i, i = "") : e === "/" && (o < 5 || t[c][p + 1] === ">") ? (d(), o === 3 && (l = l[0]), o = l, (l = l[0]).push(this.apply(null, o.slice(1))), o = 0) : e === " " || e === "	" || e === `
` || e === "\r" ? (d(), o = 2) : i += e), o === 3 && i === "!--" && (o = 4, l = l[0]);
  }
  return d(), l.length > 2 ? l.slice(1) : l[1];
}
let C = Object, _, f = C.getPrototypeOf, x = document, y, h, u, T = { isConnected: 1 }, G = 1e3, b, A = {}, H = f(T), V = f(f), k = (t, e, s, n) => (t ?? (setTimeout(s, n), /* @__PURE__ */ new Set())).add(e), D = (t, e, s) => {
  let n = h;
  h = e;
  try {
    return t(s);
  } catch (o) {
    return console.error(o), s;
  } finally {
    h = n;
  }
}, m = (t) => t.filter((e) => {
  var s;
  return (s = e._dom) == null ? void 0 : s.isConnected;
}), E = (t) => b = k(b, t, () => {
  for (let e of b)
    e._bindings = m(e._bindings), e._listeners = m(e._listeners);
  b = _;
}, G), v = {
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
      for (let n of s)
        W(n.f, n.s, n._dom), n._dom = _;
      e._bindings.length ? y = k(y, e, z) : e._oldVal = t;
    }
  }
}, I = (t) => ({
  __proto__: v,
  _val: t,
  _oldVal: t,
  _bindings: [],
  _listeners: []
}), j = (t) => f(t ?? 0) === v, K = (t) => j(t) ? t.val : t, L = (t) => j(t) ? t.oldVal : t, g = (t, e) => {
  let s = /* @__PURE__ */ new Set(), n = { f: t }, o = u;
  u = [];
  let i = D(t, s, e);
  i = (i ?? x).nodeType ? i : new Text(i);
  for (let a of s)
    E(a), a._bindings.push(n);
  for (let a of u)
    a._dom = i;
  return u = o, n._dom = i;
}, W = (t, e = I(), s) => {
  let n = /* @__PURE__ */ new Set(), o = { f: t, s: e };
  o._dom = s ?? (u == null ? void 0 : u.push(o)) ?? T, e.val = D(t, n);
  for (let i of n)
    E(i), i._listeners.push(o);
  return e;
}, F = (t, ...e) => {
  for (let s of e.flat(1 / 0)) {
    let n = f(s ?? 0), o = n === v ? g(() => s.val) : n === V ? g(s) : s;
    o != _ && t.append(o);
  }
  return t;
}, q = (t) => (t._isBindingFunc = 1, t), N = (t) => new Proxy((e, ...s) => {
  var a;
  let [n, ...o] = f(s[0] ?? 0) === H ? s : [{}, ...s], i = t ? x.createElementNS(t, e) : x.createElement(e);
  for (let [l, d] of C.entries(n)) {
    let c = (S) => S ? C.getOwnPropertyDescriptor(S, l) ?? c(f(S)) : _, p = e + "," + l, r = A[p] ?? (A[p] = ((a = c(f(i))) == null ? void 0 : a.set) ?? 0), w = r ? r.bind(i) : i.setAttribute.bind(i, l), O = f(d ?? 0);
    O === v ? g(() => (w(d.val), i)) : O === V && (!l.startsWith("on") || d._isBindingFunc) ? g(() => (w(d()), i)) : w(d);
  }
  return F(i, ...o);
}, { get: (e, s) => e.bind(_, s) }), J = (t, e) => e ? e !== t && t.replaceWith(e) : t.remove(), z = () => {
  let t = [...y].filter((e) => e._val !== e._oldVal);
  y = _;
  for (let e of new Set(t.flatMap((s) => s._bindings = m(s._bindings))))
    J(e._dom, g(e.f, e._dom)), e._dom = _;
  for (let e of t)
    e._oldVal = e._val;
}, Q = (t, e) => J(t, g(e, t));
const U = { add: F, _: q, tags: N(), tagsNS: N, state: I, val: K, oldVal: L, derive: W, hydrate: Q }, { state: X, derive: oe, tags: Y } = U;
function Z(t, e, ...s) {
  const n = Y[t];
  return e ? n(e, ...s) : n(...s);
}
const ne = B.bind(Z);
let { fromEntries: ee, entries: te } = Object, se = (t) => typeof t != "object" ? X(t) : ee(te(t).map(([e, s]) => [e, se(s)]));
export {
  R as ReactiveWC,
  ie as defineComponent,
  oe as derive,
  ne as html,
  se as reactive,
  X as state
};
