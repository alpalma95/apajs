let { isArray: G } = Array, { createTextNode: I } = document, { fromEntries: Ee, entries: Ne, keys: ee } = Object, { parse: P } = JSON, te = (t) => G(t) ? t.map((e) => typeof e == "string" ? I(e) : e) : typeof t == "string" ? I(t) : t;
class le extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.getAttributeNames().forEach((i) => {
      if (!i.startsWith(":"))
        return;
      let s = {};
      s[i.slice(1)] = P(this.getAttribute(i)), this.ctx ? this.ctx.props = s : this.props = s;
    });
    let e = this.shadowRoot ? this.shadowRoot : this, l = te(this.render());
    G(l) ? l.forEach((i) => e.appendChild(i)) : e.appendChild(l), this.onInit();
  }
  attributeChangedCallback(e, l, i) {
    e.startsWith(":") ? this.props[e.slice(1)] = i : this[e] = i, this.watch(e.slice(1), P(l), P(i));
  }
  disconnectedCallback() {
    this.onDestroy();
  }
  watch(e, l, i) {
    this.ctx.watch && this.ctx.watch(e, l, i, this);
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
let ie = (t) => {
  for (let e of ee(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
  return t;
}, Te = (t, e, l = {}) => {
  window.customElements.define(
    t,
    class extends le {
      static get observedAttributes() {
        return l.observed ?? [];
      }
      constructor() {
        super(), this.ctx = ie(e), this.ctx.getHost = () => this, l.shadow && this.attachShadow({ mode: l.shadow });
      }
    }
  );
};
function se(t) {
  for (var e, l, i = arguments, s = 1, n = "", d = "", o = [0], r = function(a) {
    s === 1 && (a || (n = n.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? o.push(a ? i[a] : n) : s === 3 && (a || n) ? (o[1] = a ? i[a] : n, s = 2) : s === 2 && n === "..." && a ? o[2] = Object.assign(o[2] || {}, i[a]) : s === 2 && n && !a ? (o[2] = o[2] || {})[n] = !0 : s >= 5 && (s === 5 ? ((o[2] = o[2] || {})[l] = a ? n ? n + i[a] : i[a] : n, s = 6) : (a || n) && (o[2][l] += a ? n + i[a] : n)), n = "";
  }, f = 0; f < t.length; f++) {
    f && (s === 1 && r(), r(f));
    for (var p = 0; p < t[f].length; p++)
      e = t[f][p], s === 1 ? e === "<" ? (r(), o = [o, "", null], s = 3) : n += e : s === 4 ? n === "--" && e === ">" ? (s = 1, n = "") : n = e + n[0] : d ? e === d ? d = "" : n += e : e === '"' || e === "'" ? d = e : e === ">" ? (r(), s = 1) : s && (e === "=" ? (s = 5, l = n, n = "") : e === "/" && (s < 5 || t[f][p + 1] === ">") ? (r(), s === 3 && (o = o[0]), s = o, (o = o[0]).push(this.apply(null, s.slice(1))), s = 0) : e === " " || e === "	" || e === `
` || e === "\r" ? (r(), s = 2) : n += e), s === 3 && n === "!--" && (s = 4, o = o[0]);
  }
  return r(), o.length > 2 ? o.slice(1) : o[1];
}
let $ = Object, y, c = $.getPrototypeOf, k = document, m, h, u, R = { isConnected: 1 }, ne = 1e3, w, O = {}, oe = c(R), M = c(c), H = (t, e, l, i) => (t ?? (setTimeout(l, i), /* @__PURE__ */ new Set())).add(e), J = (t, e, l) => {
  let i = h;
  h = e;
  try {
    return t(l);
  } catch (s) {
    return console.error(s), l;
  } finally {
    h = i;
  }
}, b = (t) => t.filter((e) => {
  var l;
  return (l = e._dom) == null ? void 0 : l.isConnected;
}), L = (t) => w = H(w, t, () => {
  for (let e of w)
    e._bindings = b(e._bindings), e._listeners = b(e._listeners);
  w = y;
}, ne), C = {
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
      let l = [...e._listeners = b(e._listeners)];
      for (let i of l)
        Q(i.f, i.s, i._dom), i._dom = y;
      e._bindings.length ? m = H(m, e, fe) : e._oldVal = t;
    }
  }
}, q = (t) => ({
  __proto__: C,
  _val: t,
  _oldVal: t,
  _bindings: [],
  _listeners: []
}), z = (t) => c(t ?? 0) === C, re = (t) => z(t) ? t.val : t, de = (t) => z(t) ? t.oldVal : t, _ = (t, e) => {
  let l = /* @__PURE__ */ new Set(), i = { f: t }, s = u;
  u = [];
  let n = J(t, l, e);
  n = (n ?? k).nodeType ? n : new Text(n);
  for (let d of l)
    L(d), d._bindings.push(i);
  for (let d of u)
    d._dom = n;
  return u = s, i._dom = n;
}, Q = (t, e = q(), l) => {
  let i = /* @__PURE__ */ new Set(), s = { f: t, s: e };
  s._dom = l ?? (u == null ? void 0 : u.push(s)) ?? R, e.val = J(t, i);
  for (let n of i)
    L(n), n._listeners.push(s);
  return e;
}, U = (t, ...e) => {
  for (let l of e.flat(1 / 0)) {
    let i = c(l ?? 0), s = i === C ? _(() => l.val) : i === M ? _(l) : l;
    s != y && t.append(s);
  }
  return t;
}, ae = (t) => (t._isBindingFunc = 1, t), B = (t) => new Proxy((e, ...l) => {
  var d;
  let [i, ...s] = c(l[0] ?? 0) === oe ? l : [{}, ...l], n = t ? k.createElementNS(t, e) : k.createElement(e);
  for (let [o, r] of $.entries(i)) {
    let f = (A) => A ? $.getOwnPropertyDescriptor(A, o) ?? f(c(A)) : y, p = e + "," + o, a = O[p] ?? (O[p] = ((d = f(c(n))) == null ? void 0 : d.set) ?? 0), x = a ? a.bind(n) : n.setAttribute.bind(n, o), D = c(r ?? 0);
    D === C ? _(() => (x(r.val), n)) : D === M && (!o.startsWith("on") || r._isBindingFunc) ? _(() => (x(r()), n)) : x(r);
  }
  return U(n, ...s);
}, { get: (e, l) => e.bind(y, l) }), X = (t, e) => e ? e !== t && t.replaceWith(e) : t.remove(), fe = () => {
  let t = [...m].filter((e) => e._val !== e._oldVal);
  m = y;
  for (let e of new Set(t.flatMap((l) => l._bindings = b(l._bindings))))
    X(e._dom, _(e.f, e._dom)), e._dom = y;
  for (let e of t)
    e._oldVal = e._val;
}, he = (t, e) => X(t, _(e, t));
const Y = { add: U, _: ae, tags: B(), tagsNS: B, state: q, val: re, oldVal: de, derive: Q, hydrate: he };
let { fromEntries: ce, entries: pe, keys: ue, getPrototypeOf: Z } = Object, { get: ye, set: F, deleteProperty: K, ownKeys: ge } = Reflect, S = Symbol, { state: T, derive: _e, add: Se, tags: Ve } = Y, ve = Z(T()), we, g = S(), me = S(), be = S(), E = S(), v = S(), V = S(), W = (t) => t != null && t[be] ? _e(() => N(t())) : T(N(t)), N = (t) => {
  if (!(t instanceof Object) || t[g])
    return t;
  let e = new Proxy(
    (t[g] = ce(pe(t).map(([l, i]) => [l, W(i)])), t[me] = t, t[E] = [], t[v] = T(1), t),
    {
      get: (l, i) => Z(l[g][i] ?? 0) === ve ? l[g][i].val : (i === "length" && l[v].val, ye(l, i, e)),
      set(l, i, s) {
        let n = l[g];
        if (i in n)
          return n[i].val = N(s), 1;
        let d = i in l;
        if (F(l, i, s))
          return d || F(n, i, W(s)) && (++l[v].val, Ae(e, i, n[i])), 1;
      },
      deleteProperty: (l, i) => (K(l[g], i) && Pe(l, i), K(l, i) && ++l[v].val),
      ownKeys: (l) => (l[v].val, ge(l))
    }
  );
  return e;
}, j = (t) => t[E] = t[E].filter((e) => e._containerDom.isConnected), Ce = (t, e, l, i) => () => {
  let s = i(l, () => delete t[e]);
  return s[V] = e, s;
}, xe = (t, e, l, { _containerDom: i, f: s }, n) => {
  if (Se(i, Ce(t, e, l, s)), !n && Array.isArray(t) && e != t.length - 1) {
    let d = {};
    for (let r of i.childNodes)
      d[r[V]] = r;
    let o = i.firstChild;
    for (let r of ue(t))
      o === d[r] ? o = o.nextSibling : i.insertBefore(d[r], o);
  }
}, Ae = (t, e, l) => j(t).forEach(
  xe.bind(we, t, e, l)
), Pe = (t, e) => {
  var l;
  for (let i of j(t))
    (l = [...i._containerDom.childNodes].find((s) => s[V] === e)) == null || l.remove();
}, { state: De, derive: Ie, tags: $e } = Y;
function ke(t, e, ...l) {
  const i = $e[t];
  return e ? i(e, ...l) : i(...l);
}
const Oe = se.bind(ke);
export {
  le as ReactiveWC,
  Te as defineComponent,
  Ie as derive,
  Oe as html,
  N as reactive,
  De as state
};
