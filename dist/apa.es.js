let { isArray: I } = Array, { fromEntries: ke, entries: Ee, keys: j } = Object, { parse: A } = JSON, ee = (e) => I(e) ? e.map(
  (t) => typeof t == "string" ? document.createTextNode(t) : t
) : typeof e == "string" ? document.createTextNode(e) : e;
class te extends HTMLElement {
  constructor() {
    super(), this.ctx = {};
  }
  connectedCallback() {
    this.getAttributeNames().forEach((i) => {
      if (!i.startsWith(":"))
        return;
      let n = {};
      n[i.slice(1)] = A(this.getAttribute(i)), this.ctx.props = n;
    });
    let t = this.shadowRoot ?? this, l = ee(this.ctx.render(this.ctx));
    I(l) ? l.forEach((i) => t.appendChild(i)) : t.appendChild(l), this.ctx.onInit && this.ctx.onInit(this);
  }
  attributeChangedCallback(t, l, i) {
    this.ctx.watch && this.ctx.watch(t.slice(1), A(l), A(i), this);
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
function ie(e) {
  for (var t, l, i = arguments, n = 1, s = "", d = "", o = [0], r = function(f) {
    n === 1 && (f || (s = s.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? o.push(f ? i[f] : s) : n === 3 && (f || s) ? (o[1] = f ? i[f] : s, n = 2) : n === 2 && s === "..." && f ? o[2] = Object.assign(o[2] || {}, i[f]) : n === 2 && s && !f ? (o[2] = o[2] || {})[s] = !0 : n >= 5 && (n === 5 ? ((o[2] = o[2] || {})[l] = f ? s ? s + i[f] : i[f] : s, n = 6) : (f || s) && (o[2][l] += f ? s + i[f] : s)), s = "";
  }, a = 0; a < e.length; a++) {
    a && (n === 1 && r(), r(a));
    for (var u = 0; u < e[a].length; u++)
      t = e[a][u], n === 1 ? t === "<" ? (r(), o = [o, "", null], n = 3) : s += t : n === 4 ? s === "--" && t === ">" ? (n = 1, s = "") : s = t + s[0] : d ? t === d ? d = "" : s += t : t === '"' || t === "'" ? d = t : t === ">" ? (r(), n = 1) : n && (t === "=" ? (n = 5, l = s, s = "") : t === "/" && (n < 5 || e[a][u + 1] === ">") ? (r(), n === 3 && (o = o[0]), n = o, (o = o[0]).push(this.apply(null, n.slice(1))), n = 0) : t === " " || t === "	" || t === `
` || t === "\r" ? (r(), n = 2) : s += t), n === 3 && s === "!--" && (n = 4, o = o[0]);
  }
  return r(), o.length > 2 ? o.slice(1) : o[1];
}
let $ = Object, y, h = $.getPrototypeOf, k = document, b, c, p, W = { isConnected: 1 }, ne = 1e3, m, B = {}, se = h(W), M = h(h), R = (e, t, l, i) => (e ?? (setTimeout(l, i), /* @__PURE__ */ new Set())).add(t), H = (e, t, l) => {
  let i = c;
  c = t;
  try {
    return e(l);
  } catch (n) {
    return console.error(n), l;
  } finally {
    c = i;
  }
}, C = (e) => e.filter((t) => {
  var l;
  return (l = t._dom) == null ? void 0 : l.isConnected;
}), J = (e) => m = R(m, e, () => {
  for (let t of m)
    t._bindings = C(t._bindings), t._listeners = C(t._listeners);
  m = y;
}, ne), w = {
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
      for (let i of l)
        z(i.f, i.s, i._dom), i._dom = y;
      t._bindings.length ? b = R(b, t, fe) : t._oldVal = e;
    }
  }
}, L = (e) => ({
  __proto__: w,
  _val: e,
  _oldVal: e,
  _bindings: [],
  _listeners: []
}), q = (e) => h(e ?? 0) === w, oe = (e) => q(e) ? e.val : e, re = (e) => q(e) ? e.oldVal : e, _ = (e, t) => {
  let l = /* @__PURE__ */ new Set(), i = { f: e }, n = p;
  p = [];
  let s = H(e, l, t);
  s = (s ?? k).nodeType ? s : new Text(s);
  for (let d of l)
    J(d), d._bindings.push(i);
  for (let d of p)
    d._dom = s;
  return p = n, i._dom = s;
}, z = (e, t = L(), l) => {
  let i = /* @__PURE__ */ new Set(), n = { f: e, s: t };
  n._dom = l ?? (p == null ? void 0 : p.push(n)) ?? W, t.val = H(e, i);
  for (let s of i)
    J(s), s._listeners.push(n);
  return t;
}, Q = (e, ...t) => {
  for (let l of t.flat(1 / 0)) {
    let i = h(l ?? 0), n = i === w ? _(() => l.val) : i === M ? _(l) : l;
    n != y && e.append(n);
  }
  return e;
}, de = (e) => (e._isBindingFunc = 1, e), D = (e) => new Proxy((t, ...l) => {
  var d;
  let [i, ...n] = h(l[0] ?? 0) === se ? l : [{}, ...l], s = e ? k.createElementNS(e, t) : k.createElement(t);
  for (let [o, r] of $.entries(i)) {
    let a = (P) => P ? $.getOwnPropertyDescriptor(P, o) ?? a(h(P)) : y, u = t + "," + o, f = B[u] ?? (B[u] = ((d = a(h(s))) == null ? void 0 : d.set) ?? 0), x = f ? f.bind(s) : s.setAttribute.bind(s, o), O = h(r ?? 0);
    O === w ? _(() => (x(r.val), s)) : O === M && (!o.startsWith("on") || r._isBindingFunc) ? _(() => (x(r()), s)) : x(r);
  }
  return Q(s, ...n);
}, { get: (t, l) => t.bind(y, l) }), U = (e, t) => t ? t !== e && e.replaceWith(t) : e.remove(), fe = () => {
  let e = [...b].filter((t) => t._val !== t._oldVal);
  b = y;
  for (let t of new Set(e.flatMap((l) => l._bindings = C(l._bindings))))
    U(t._dom, _(t.f, t._dom)), t._dom = y;
  for (let t of e)
    t._oldVal = t._val;
}, ae = (e, t) => U(e, _(t, e));
const X = { add: Q, _: de, tags: D(), tagsNS: D, state: L, val: oe, oldVal: re, derive: z, hydrate: ae };
let { fromEntries: ce, entries: he, keys: ue, getPrototypeOf: Y } = Object, { get: pe, set: F, deleteProperty: K, ownKeys: ye } = Reflect, v = Symbol, { state: T, derive: ge, add: _e, tags: Te } = X, ve = Y(T()), Se, g = v(), me = v(), be = v(), E = v(), S = v(), V = v(), G = (e) => e != null && e[be] ? ge(() => N(e())) : T(N(e)), N = (e) => {
  if (!(e instanceof Object) || e[g])
    return e;
  let t = new Proxy(
    (e[g] = ce(he(e).map(([l, i]) => [l, G(i)])), e[me] = e, e[E] = [], e[S] = T(1), e),
    {
      get: (l, i) => Y(l[g][i] ?? 0) === ve ? l[g][i].val : (i === "length" && l[S].val, pe(l, i, t)),
      set(l, i, n) {
        let s = l[g];
        if (i in s)
          return s[i].val = N(n), 1;
        let d = i in l;
        if (F(l, i, n))
          return d || F(s, i, G(n)) && (++l[S].val, xe(t, i, s[i])), 1;
      },
      deleteProperty: (l, i) => (K(l[g], i) && Pe(l, i), K(l, i) && ++l[S].val),
      ownKeys: (l) => (l[S].val, ye(l))
    }
  );
  return t;
}, Z = (e) => e[E] = e[E].filter((t) => t._containerDom.isConnected), Ce = (e, t, l, i) => () => {
  let n = i(l, () => delete e[t]);
  return n[V] = t, n;
}, we = (e, t, l, { _containerDom: i, f: n }, s) => {
  if (_e(i, Ce(e, t, l, n)), !s && Array.isArray(e) && t != e.length - 1) {
    let d = {};
    for (let r of i.childNodes)
      d[r[V]] = r;
    let o = i.firstChild;
    for (let r of ue(e))
      o === d[r] ? o = o.nextSibling : i.insertBefore(d[r], o);
  }
}, xe = (e, t, l) => Z(e).forEach(
  we.bind(Se, e, t, l)
), Pe = (e, t) => {
  var l;
  for (let i of Z(e))
    (l = [...i._containerDom.childNodes].find((n) => n[V] === t)) == null || l.remove();
}, { state: Ve, derive: Oe, tags: Ae } = X;
function $e(e, t, ...l) {
  const i = Ae[e];
  return t ? i(t, ...l) : i(...l);
}
const Be = ie.bind($e);
export {
  Ne as defineComponent,
  Oe as derive,
  Be as html,
  N as reactive,
  Ve as state
};
