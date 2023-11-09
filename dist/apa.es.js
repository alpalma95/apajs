let { isArray: I } = Array, { fromEntries: ke, entries: Ee, keys: j } = Object, { parse: A } = JSON, ee = (e) => (console.log(e), I(e) ? e.map(
  (t) => typeof t == "string" ? document.createTextNode(t) : t
) : typeof e == "string" ? document.createTextNode(e) : e);
class te extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getAttributeNames().forEach((n) => {
      if (!n.startsWith(":"))
        return;
      let i = {};
      i[n.slice(1)] = A(this.getAttribute(n)), this.ctx.props = i;
    });
    let t = this.shadowRoot ?? this, l = ee(this.ctx.render(this.ctx));
    I(l) ? l.forEach((n) => t.appendChild(n)) : t.appendChild(l), this.ctx.onInit && this.ctx.onInit(this);
  }
  attributeChangedCallback(t, l, n) {
    this.ctx.watch && this.ctx.watch(t.slice(1), A(l), A(n), this);
  }
  disconnectedCallback() {
    this.ctx.onDestroy && this.ctx.onDestroy(this);
  }
}
let le = (e) => {
  for (let t of j(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
  return e;
}, Ne = (e, t, l = {}) => {
  window.customElements.define(
    e,
    class extends te {
      static get observedAttributes() {
        return l.observed ?? [];
      }
      constructor() {
        super(), this.ctx = le(t), this.ctx.getHost = () => this, l.shadow && this.attachShadow({ mode: l.shadow });
      }
    }
  );
};
function ne(e) {
  for (var t, l, n = arguments, i = 1, o = "", d = "", s = [0], r = function(f) {
    i === 1 && (f || (o = o.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(f ? n[f] : o) : i === 3 && (f || o) ? (s[1] = f ? n[f] : o, i = 2) : i === 2 && o === "..." && f ? s[2] = Object.assign(s[2] || {}, n[f]) : i === 2 && o && !f ? (s[2] = s[2] || {})[o] = !0 : i >= 5 && (i === 5 ? ((s[2] = s[2] || {})[l] = f ? o ? o + n[f] : n[f] : o, i = 6) : (f || o) && (s[2][l] += f ? o + n[f] : o)), o = "";
  }, a = 0; a < e.length; a++) {
    a && (i === 1 && r(), r(a));
    for (var u = 0; u < e[a].length; u++)
      t = e[a][u], i === 1 ? t === "<" ? (r(), s = [s, "", null], i = 3) : o += t : i === 4 ? o === "--" && t === ">" ? (i = 1, o = "") : o = t + o[0] : d ? t === d ? d = "" : o += t : t === '"' || t === "'" ? d = t : t === ">" ? (r(), i = 1) : i && (t === "=" ? (i = 5, l = o, o = "") : t === "/" && (i < 5 || e[a][u + 1] === ">") ? (r(), i === 3 && (s = s[0]), i = s, (s = s[0]).push(this.apply(null, i.slice(1))), i = 0) : t === " " || t === "	" || t === `
` || t === "\r" ? (r(), i = 2) : o += t), i === 3 && o === "!--" && (i = 4, s = s[0]);
  }
  return r(), s.length > 2 ? s.slice(1) : s[1];
}
let $ = Object, g, h = $.getPrototypeOf, k = document, b, c, p, W = { isConnected: 1 }, ie = 1e3, m, B = {}, oe = h(W), M = h(h), R = (e, t, l, n) => (e ?? (setTimeout(l, n), /* @__PURE__ */ new Set())).add(t), H = (e, t, l) => {
  let n = c;
  c = t;
  try {
    return e(l);
  } catch (i) {
    return console.error(i), l;
  } finally {
    c = n;
  }
}, C = (e) => e.filter((t) => {
  var l;
  return (l = t._dom) == null ? void 0 : l.isConnected;
}), J = (e) => m = R(m, e, () => {
  for (let t of m)
    t._bindings = C(t._bindings), t._listeners = C(t._listeners);
  m = g;
}, ie), w = {
  get val() {
    return c == null || c.add(this), this._val;
  },
  get oldVal() {
    return c == null || c.add(this), this._oldVal;
  },
  set val(e) {
    let t = this;
    if (e !== t._val) {
      t._val = e;
      let l = [...t._listeners = C(t._listeners)];
      for (let n of l)
        z(n.f, n.s, n._dom), n._dom = g;
      t._bindings.length ? b = R(b, t, fe) : t._oldVal = e;
    }
  }
}, L = (e) => ({
  __proto__: w,
  _val: e,
  _oldVal: e,
  _bindings: [],
  _listeners: []
}), q = (e) => h(e ?? 0) === w, se = (e) => q(e) ? e.val : e, re = (e) => q(e) ? e.oldVal : e, _ = (e, t) => {
  let l = /* @__PURE__ */ new Set(), n = { f: e }, i = p;
  p = [];
  let o = H(e, l, t);
  o = (o ?? k).nodeType ? o : new Text(o);
  for (let d of l)
    J(d), d._bindings.push(n);
  for (let d of p)
    d._dom = o;
  return p = i, n._dom = o;
}, z = (e, t = L(), l) => {
  let n = /* @__PURE__ */ new Set(), i = { f: e, s: t };
  i._dom = l ?? (p == null ? void 0 : p.push(i)) ?? W, t.val = H(e, n);
  for (let o of n)
    J(o), o._listeners.push(i);
  return t;
}, Q = (e, ...t) => {
  for (let l of t.flat(1 / 0)) {
    let n = h(l ?? 0), i = n === w ? _(() => l.val) : n === M ? _(l) : l;
    i != g && e.append(i);
  }
  return e;
}, de = (e) => (e._isBindingFunc = 1, e), D = (e) => new Proxy((t, ...l) => {
  var d;
  let [n, ...i] = h(l[0] ?? 0) === oe ? l : [{}, ...l], o = e ? k.createElementNS(e, t) : k.createElement(t);
  for (let [s, r] of $.entries(n)) {
    let a = (P) => P ? $.getOwnPropertyDescriptor(P, s) ?? a(h(P)) : g, u = t + "," + s, f = B[u] ?? (B[u] = ((d = a(h(o))) == null ? void 0 : d.set) ?? 0), x = f ? f.bind(o) : o.setAttribute.bind(o, s), O = h(r ?? 0);
    O === w ? _(() => (x(r.val), o)) : O === M && (!s.startsWith("on") || r._isBindingFunc) ? _(() => (x(r()), o)) : x(r);
  }
  return Q(o, ...i);
}, { get: (t, l) => t.bind(g, l) }), U = (e, t) => t ? t !== e && e.replaceWith(t) : e.remove(), fe = () => {
  let e = [...b].filter((t) => t._val !== t._oldVal);
  b = g;
  for (let t of new Set(e.flatMap((l) => l._bindings = C(l._bindings))))
    U(t._dom, _(t.f, t._dom)), t._dom = g;
  for (let t of e)
    t._oldVal = t._val;
}, ae = (e, t) => U(e, _(t, e));
const X = { add: Q, _: de, tags: D(), tagsNS: D, state: L, val: se, oldVal: re, derive: z, hydrate: ae };
let { fromEntries: ce, entries: he, keys: ue, getPrototypeOf: Y } = Object, { get: pe, set: F, deleteProperty: K, ownKeys: ge } = Reflect, v = Symbol, { state: T, derive: ye, add: _e, tags: Te } = X, ve = Y(T()), Se, y = v(), me = v(), be = v(), E = v(), S = v(), V = v(), G = (e) => e != null && e[be] ? ye(() => N(e())) : T(N(e)), N = (e) => {
  if (!(e instanceof Object) || e[y])
    return e;
  let t = new Proxy(
    (e[y] = ce(he(e).map(([l, n]) => [l, G(n)])), e[me] = e, e[E] = [], e[S] = T(1), e),
    {
      get: (l, n) => Y(l[y][n] ?? 0) === ve ? l[y][n].val : (n === "length" && l[S].val, pe(l, n, t)),
      set(l, n, i) {
        let o = l[y];
        if (n in o)
          return o[n].val = N(i), 1;
        let d = n in l;
        if (F(l, n, i))
          return d || F(o, n, G(i)) && (++l[S].val, xe(t, n, o[n])), 1;
      },
      deleteProperty: (l, n) => (K(l[y], n) && Pe(l, n), K(l, n) && ++l[S].val),
      ownKeys: (l) => (l[S].val, ge(l))
    }
  );
  return t;
}, Z = (e) => e[E] = e[E].filter((t) => t._containerDom.isConnected), Ce = (e, t, l, n) => () => {
  let i = n(l, () => delete e[t]);
  return i[V] = t, i;
}, we = (e, t, l, { _containerDom: n, f: i }, o) => {
  if (_e(n, Ce(e, t, l, i)), !o && Array.isArray(e) && t != e.length - 1) {
    let d = {};
    for (let r of n.childNodes)
      d[r[V]] = r;
    let s = n.firstChild;
    for (let r of ue(e))
      s === d[r] ? s = s.nextSibling : n.insertBefore(d[r], s);
  }
}, xe = (e, t, l) => Z(e).forEach(
  we.bind(Se, e, t, l)
), Pe = (e, t) => {
  var l;
  for (let n of Z(e))
    (l = [...n._containerDom.childNodes].find((i) => i[V] === t)) == null || l.remove();
}, { state: Ve, derive: Oe, tags: Ae } = X;
function $e(e, t, ...l) {
  const n = Ae[e];
  return t ? n(t, ...l) : n(...l);
}
const Be = ne.bind($e);
export {
  Ne as defineComponent,
  Oe as derive,
  Be as html,
  N as reactive,
  Ve as state
};
