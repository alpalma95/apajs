let J = (e) => Array.isArray(e) ? e.map((s) => typeof s == "string" ? document.createTextNode(s) : s) : typeof e == "string" ? document.createTextNode(e) : e;
class M extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getProps(), this.firstRender(), this.onInit();
  }
  attributeChangedCallback(t, s, o) {
    t.startsWith(":") ? this[t.slice(1)] = o : this[t] = o, this.watch(t.slice(1), JSON.parse(s), JSON.parse(o));
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  firstRender() {
    let t = this.shadowRoot ? this.shadowRoot : this, s = J(this.ctx.render(this.ctx));
    Array.isArray(s) ? s.forEach((o) => t.appendChild(o)) : t.appendChild(s);
  }
  getProps() {
    this.getAttributeNames().forEach((t) => {
      if (!t.startsWith(":"))
        return;
      let s = {};
      s[t.slice(1)] = JSON.parse(this.getAttribute(t)), this.ctx ? this.ctx.props = s : this.props = s;
    });
  }
  watch(t, s, o) {
  }
  onInit() {
  }
  onDestroy() {
  }
  render() {
  }
}
let j = (e) => {
  for (let t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
  return e;
}, Y = (e, t, s = {}) => {
  window.customElements.define(
    e,
    class extends M {
      constructor() {
        super(), this.ctx = j(t), this.ctx.getHost = () => this, s.shadow && this.attachShadow({ mode: s.shadow });
      }
      onInit() {
        this.ctx && typeof this.ctx.onInit == "function" && this.ctx.onInit(this);
      }
      onDestroy() {
        this.ctx && typeof this.ctx.onDestroy == "function" && this.ctx.onDestroy(this);
      }
      watch(o, n, i) {
        this.ctx && typeof this.ctx.watch == "function" && this.ctx.watch(o, n, i, this);
      }
    }
  );
};
function z(e) {
  for (var t, s, o = arguments, n = 1, i = "", a = "", l = [0], d = function(r) {
    n === 1 && (r || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? l.push(r ? o[r] : i) : n === 3 && (r || i) ? (l[1] = r ? o[r] : i, n = 2) : n === 2 && i === "..." && r ? l[2] = Object.assign(l[2] || {}, o[r]) : n === 2 && i && !r ? (l[2] = l[2] || {})[i] = !0 : n >= 5 && (n === 5 ? ((l[2] = l[2] || {})[s] = r ? i ? i + o[r] : o[r] : i, n = 6) : (r || i) && (l[2][s] += r ? i + o[r] : i)), i = "";
  }, c = 0; c < e.length; c++) {
    c && (n === 1 && d(), d(c));
    for (var p = 0; p < e[c].length; p++)
      t = e[c][p], n === 1 ? t === "<" ? (d(), l = [l, "", null], n = 3) : i += t : n === 4 ? i === "--" && t === ">" ? (n = 1, i = "") : i = t + i[0] : a ? t === a ? a = "" : i += t : t === '"' || t === "'" ? a = t : t === ">" ? (d(), n = 1) : n && (t === "=" ? (n = 5, s = i, i = "") : t === "/" && (n < 5 || e[c][p + 1] === ">") ? (d(), n === 3 && (l = l[0]), n = l, (l = l[0]).push(this.apply(null, n.slice(1))), n = 0) : t === " " || t === "	" || t === `
` || t === "\r" ? (d(), n = 2) : i += t), n === 3 && i === "!--" && (n = 4, l = l[0]);
  }
  return d(), l.length > 2 ? l.slice(1) : l[1];
}
let S = Object, _, f = S.getPrototypeOf, C = document, b, h, u, k = { isConnected: 1 }, B = 1e3, y, P = {}, G = f(k), N = f(f), T = (e, t, s, o) => (e ?? (setTimeout(s, o), /* @__PURE__ */ new Set())).add(t), V = (e, t, s) => {
  let o = h;
  h = t;
  try {
    return e(s);
  } catch (n) {
    return console.error(n), s;
  } finally {
    h = o;
  }
}, m = (e) => e.filter((t) => {
  var s;
  return (s = t._dom) == null ? void 0 : s.isConnected;
}), D = (e) => y = T(y, e, () => {
  for (let t of y)
    t._bindings = m(t._bindings), t._listeners = m(t._listeners);
  y = _;
}, B), v = {
  get val() {
    return h == null || h.add(this), this._val;
  },
  get oldVal() {
    return h == null || h.add(this), this._oldVal;
  },
  set val(e) {
    let t = this;
    if (e !== t._val) {
      t._val = e;
      let s = [...t._listeners = m(t._listeners)];
      for (let o of s)
        W(o.f, o.s, o._dom), o._dom = _;
      t._bindings.length ? b = T(b, t, q) : t._oldVal = e;
    }
  }
}, I = (e) => ({
  __proto__: v,
  _val: e,
  _oldVal: e,
  _bindings: [],
  _listeners: []
}), E = (e) => f(e ?? 0) === v, H = (e) => E(e) ? e.val : e, K = (e) => E(e) ? e.oldVal : e, g = (e, t) => {
  let s = /* @__PURE__ */ new Set(), o = { f: e }, n = u;
  u = [];
  let i = V(e, s, t);
  i = (i ?? C).nodeType ? i : new Text(i);
  for (let a of s)
    D(a), a._bindings.push(o);
  for (let a of u)
    a._dom = i;
  return u = n, o._dom = i;
}, W = (e, t = I(), s) => {
  let o = /* @__PURE__ */ new Set(), n = { f: e, s: t };
  n._dom = s ?? (u == null ? void 0 : u.push(n)) ?? k, t.val = V(e, o);
  for (let i of o)
    D(i), i._listeners.push(n);
  return t;
}, R = (e, ...t) => {
  for (let s of t.flat(1 / 0)) {
    let o = f(s ?? 0), n = o === v ? g(() => s.val) : o === N ? g(s) : s;
    n != _ && e.append(n);
  }
  return e;
}, L = (e) => (e._isBindingFunc = 1, e), A = (e) => new Proxy((t, ...s) => {
  var a;
  let [o, ...n] = f(s[0] ?? 0) === G ? s : [{}, ...s], i = e ? C.createElementNS(e, t) : C.createElement(t);
  for (let [l, d] of S.entries(o)) {
    let c = (x) => x ? S.getOwnPropertyDescriptor(x, l) ?? c(f(x)) : _, p = t + "," + l, r = P[p] ?? (P[p] = ((a = c(f(i))) == null ? void 0 : a.set) ?? 0), w = r ? r.bind(i) : i.setAttribute.bind(i, l), O = f(d ?? 0);
    O === v ? g(() => (w(d.val), i)) : O === N && (!l.startsWith("on") || d._isBindingFunc) ? g(() => (w(d()), i)) : w(d);
  }
  return R(i, ...n);
}, { get: (t, s) => t.bind(_, s) }), $ = (e, t) => t ? t !== e && e.replaceWith(t) : e.remove(), q = () => {
  let e = [...b].filter((t) => t._val !== t._oldVal);
  b = _;
  for (let t of new Set(e.flatMap((s) => s._bindings = m(s._bindings))))
    $(t._dom, g(t.f, t._dom)), t._dom = _;
  for (let t of e)
    t._oldVal = t._val;
}, Q = (e, t) => $(e, g(t, e));
const F = { add: R, _: L, tags: A(), tagsNS: A, state: I, val: H, oldVal: K, derive: W, hydrate: Q }, U = (e) => {
  for (const t of Object.keys(e))
    t.startsWith("@") && (e[`on${t.slice(1)}`] = e[t], delete e[t]);
  return e;
};
function X(e, t, ...s) {
  let o = U({ ...t });
  const n = F.tags[e];
  return o ? n(o, ...s) : n(...s);
}
const Z = z.bind(X), { state: tt, derive: et } = F;
export {
  M as ReactiveWC,
  Y as defineComponent,
  et as derive,
  Z as html,
  tt as state
};
