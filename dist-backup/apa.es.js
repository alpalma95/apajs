let { isArray: O } = Array, le = (e) => O(e) ? e.map(
  (t) => typeof t == "string" ? document.createTextNode(t) : t
) : typeof e == "string" ? document.createTextNode(e) : e, Te = (e, t) => {
  window.customElements.define(
    e.tag,
    class extends HTMLElement {
      constructor() {
        super(), this.ctx = {
          onInit: (l = () => {
          }) => l(),
          onDestroy: (l = () => {
          }) => l(),
          subscribers: [],
          getHost: () => this,
          watch: (l, n) => this.ctx.subscribers.push({
            attributeName: l,
            cb: n
          })
        }, e.shadow && this.attachShadow({ mode: e.shadow });
      }
      static get observedAttributes() {
        return [e.observed];
      }
      connectedCallback() {
        let l = {};
        this.getAttributeNames().forEach((o) => {
          o.startsWith(":") && (l[o.slice(1)] = this.getAttribute(o));
        }), this.ctx.props = l;
        let n = le(t(this.ctx)), i = this.shadowRoot ?? this;
        O(n) ? n.forEach((o) => i.appendChild(o)) : i.appendChild(n), this.ctx.onInit();
      }
      attributeChangedCallback(l, n, i) {
        this.ctx.subscribers.forEach(({ attributeName: o, cb: r }) => {
          l === o && r(l, n, i);
        });
      }
      disconnectedCallback() {
        this.ctx.onDestroy();
      }
    }
  );
};
function ne(e) {
  for (var t, l, n = arguments, i = 1, o = "", r = "", s = [0], d = function(a) {
    i === 1 && (a || (o = o.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(a ? n[a] : o) : i === 3 && (a || o) ? (s[1] = a ? n[a] : o, i = 2) : i === 2 && o === "..." && a ? s[2] = Object.assign(s[2] || {}, n[a]) : i === 2 && o && !a ? (s[2] = s[2] || {})[o] = !0 : i >= 5 && (i === 5 ? ((s[2] = s[2] || {})[l] = a ? o ? o + n[a] : n[a] : o, i = 6) : (a || o) && (s[2][l] += a ? o + n[a] : o)), o = "";
  }, f = 0; f < e.length; f++) {
    f && (i === 1 && d(), d(f));
    for (var u = 0; u < e[f].length; u++)
      t = e[f][u], i === 1 ? t === "<" ? (d(), s = [s, "", null], i = 3) : o += t : i === 4 ? o === "--" && t === ">" ? (i = 1, o = "") : o = t + o[0] : r ? t === r ? r = "" : o += t : t === '"' || t === "'" ? r = t : t === ">" ? (d(), i = 1) : i && (t === "=" ? (i = 5, l = o, o = "") : t === "/" && (i < 5 || e[f][u + 1] === ">") ? (d(), i === 3 && (s = s[0]), i = s, (s = s[0]).push(this.apply(null, i.slice(1))), i = 0) : t === " " || t === "	" || t === `
` || t === "\r" ? (d(), i = 2) : o += t), i === 3 && o === "!--" && (i = 4, s = s[0]);
  }
  return d(), s.length > 2 ? s.slice(1) : s[1];
}
let E = Object, _, h = E.getPrototypeOf, $ = document, C, c, g, W = { isConnected: 1 }, oe = 1e3, S, I = {}, ie = h(W), H = h(h), R = (e, t, l, n) => (e ?? (setTimeout(l, n), /* @__PURE__ */ new Set())).add(t), L = (e, t, l) => {
  let n = c;
  c = t;
  try {
    return e(l);
  } catch (i) {
    return console.error(i), l;
  } finally {
    c = n;
  }
}, w = (e) => e.filter((t) => {
  var l;
  return (l = t._dom) == null ? void 0 : l.isConnected;
}), q = (e) => S = R(S, e, () => {
  for (let t of S)
    t._bindings = w(t._bindings), t._listeners = w(t._listeners);
  S = _;
}, oe), A = {
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
      let l = [...t._listeners = w(t._listeners)];
      for (let n of l)
        Q(n.f, n.s, n._dom), n._dom = _;
      t._bindings.length ? C = R(C, t, ae) : t._oldVal = e;
    }
  }
}, z = (e) => ({
  __proto__: A,
  _val: e,
  _oldVal: e,
  _bindings: [],
  _listeners: []
}), J = (e) => h(e ?? 0) === A, se = (e) => J(e) ? e.val : e, re = (e) => J(e) ? e.oldVal : e, y = (e, t) => {
  let l = /* @__PURE__ */ new Set(), n = { f: e }, i = g;
  g = [];
  let o = L(e, l, t);
  o = (o ?? $).nodeType ? o : new Text(o);
  for (let r of l)
    q(r), r._bindings.push(n);
  for (let r of g)
    r._dom = o;
  return g = i, n._dom = o;
}, Q = (e, t = z(), l) => {
  let n = /* @__PURE__ */ new Set(), i = { f: e, s: t };
  i._dom = l ?? (g == null ? void 0 : g.push(i)) ?? W, t.val = L(e, n);
  for (let o of n)
    q(o), o._listeners.push(i);
  return t;
}, U = (e, ...t) => {
  for (let l of t.flat(1 / 0)) {
    let n = h(l ?? 0), i = n === A ? y(() => l.val) : n === H ? y(l) : l;
    i != _ && e.append(i);
  }
  return e;
}, de = (e) => (e._isBindingFunc = 1, e), B = (e) => new Proxy((t, ...l) => {
  var r;
  let [n, ...i] = h(l[0] ?? 0) === ie ? l : [{}, ...l], o = e ? $.createElementNS(e, t) : $.createElement(t);
  for (let [s, d] of E.entries(n)) {
    let f = (T) => T ? E.getOwnPropertyDescriptor(T, s) ?? f(h(T)) : _, u = t + "," + s, a = I[u] ?? (I[u] = ((r = f(h(o))) == null ? void 0 : r.set) ?? 0), P = a ? a.bind(o) : o.setAttribute.bind(o, s), G = h(d ?? 0);
    G === A ? y(() => (P(d.val), o)) : G === H && (!s.startsWith("on") || d._isBindingFunc) ? y(() => (P(d()), o)) : P(d);
  }
  return U(o, ...i);
}, { get: (t, l) => t.bind(_, l) }), X = (e, t) => t ? t !== e && e.replaceWith(t) : e.remove(), ae = () => {
  let e = [...C].filter((t) => t._val !== t._oldVal);
  C = _;
  for (let t of new Set(e.flatMap((l) => l._bindings = w(l._bindings))))
    X(t._dom, y(t.f, t._dom)), t._dom = _;
  for (let t of e)
    t._oldVal = t._val;
}, fe = (e, t) => X(e, y(t, e));
const Y = { add: U, _: de, tags: B(), tagsNS: B, state: z, val: se, oldVal: re, derive: Q, hydrate: fe };
let { fromEntries: ce, entries: Z, keys: he, getPrototypeOf: j } = Object, { get: ue, set: F, deleteProperty: K, ownKeys: pe } = Reflect, b = Symbol, { state: k, derive: ge, add: _e, tags: Ee } = Y, ye = j(k()), m, be = 1e3, ee, p = b(), ve = b(), Se = b(), x = b(), v = b(), V = b(), M = (e) => e != null && e[Se] ? ge(() => N(e())) : k(N(e)), N = (e) => {
  if (!(e instanceof Object) || e[p])
    return e;
  let t = new Proxy(
    (e[p] = ce(Z(e).map(([l, n]) => [l, M(n)])), e[ve] = e, e[x] = [], e[v] = k(1), e),
    {
      get: (l, n) => j(l[p][n] ?? 0) === ye ? l[p][n].val : (n === "length" && l[v].val, ue(l, n, t)),
      set(l, n, i) {
        let o = l[p];
        if (n in o)
          return o[n].val = N(i), 1;
        let r = n in l;
        if (F(l, n, i))
          return r || F(o, n, M(i)) && (++l[v].val, Ce(t, n, o[n])), 1;
      },
      deleteProperty: (l, n) => (K(l[p], n) && we(l, n), K(l, n) && ++l[v].val),
      ownKeys: (l) => (l[v].val, pe(l))
    }
  );
  return t;
}, D = (e) => e[x] = e[x].filter((t) => t._containerDom.isConnected), me = (e, t, l, n) => () => {
  let i = n(l, () => delete e[t]);
  return i[V] = t, i;
}, te = (e, t, l, { _containerDom: n, f: i }, o) => {
  if (_e(n, me(e, t, l, i)), !o && Array.isArray(e) && t != e.length - 1) {
    let r = {};
    for (let d of n.childNodes)
      r[d[V]] = d;
    let s = n.firstChild;
    for (let d of he(e))
      s === r[d] ? s = s.nextSibling : n.insertBefore(r[d], s);
  }
}, Ce = (e, t, l) => D(e).forEach(
  te.bind(ee, e, t, l)
), we = (e, t) => {
  var l;
  for (let n of D(e))
    (l = [...n._containerDom.childNodes].find((i) => i[V] === t)) == null || l.remove();
}, xe = (e) => (m ?? (m = (setTimeout(
  () => (m.forEach(D), m = ee),
  be
), /* @__PURE__ */ new Set()))).add(e), $e = (e, t, l) => {
  let n = { _containerDom: e(), f: l };
  t[x].push(n), xe(t);
  for (let [i, o] of Z(t[p]))
    te(t, i, o, n, 1);
  return n._containerDom;
}, { state: Ne, derive: ke, tags: Ae } = Y;
function Pe(e, t, ...l) {
  const n = Ae[e];
  return t ? n(t, ...l) : n(...l);
}
const Ve = ne.bind(Pe);
export {
  Te as defineComponent,
  ke as derive,
  Ve as html,
  $e as list,
  N as reactive,
  Ne as state
};
