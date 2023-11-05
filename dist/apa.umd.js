(function(a,b){typeof exports=="object"&&typeof module<"u"?b(exports):typeof define=="function"&&define.amd?define(["exports"],b):(a=typeof globalThis<"u"?globalThis:a||self,b(a.apajs={}))})(this,function(a){"use strict";let{isArray:b}=Array,{createTextNode:j}=document,{fromEntries:K,entries:L,keys:q}=Object,{parse:S}=JSON,z=t=>b(t)?t.map(e=>typeof e=="string"?j(e):e):typeof t=="string"?j(t):t;class P extends HTMLElement{constructor(){super()}connectedCallback(){this.getAttributeNames().forEach(n=>{if(!n.startsWith(":"))return;let o={};o[n.slice(1)]=S(this.getAttribute(n)),this.ctx?this.ctx.props=o:this.props=o});let e=this.shadowRoot?this.shadowRoot:this,i=z(this.render());b(i)?i.forEach(n=>e.appendChild(n)):e.appendChild(i),this.onInit()}attributeChangedCallback(e,i,n){e.startsWith(":")?this[e.slice(1)]=n:this[e]=n,this.watch(e.slice(1),S(i),S(n))}disconnectedCallback(){this.onDestroy()}watch(e,i,n){this.ctx.watch&&this.ctx.watch(e,i,n,this)}onInit(){this.ctx.onInit&&this.ctx.onInit(this)}onDestroy(){this.ctx.onDestroy&&this.ctx.onDestroy(this)}render(){return this.ctx.render(this.ctx)}}let Q=t=>{for(let e of q(t))typeof t[e]=="function"&&(t[e]=t[e].bind(t));return t},U=(t,e,i={})=>{window.customElements.define(t,class extends P{static get observedAttributes(){return i.observed??[]}constructor(){super(),this.ctx=Q(e),this.ctx.getHost=()=>this,console.log(this.ctx),i.shadow&&this.attachShadow({mode:i.shadow})}})};function X(t){for(var e,i,n=arguments,o=1,s="",c="",l=[0],r=function(d){o===1&&(d||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?l.push(d?n[d]:s):o===3&&(d||s)?(l[1]=d?n[d]:s,o=2):o===2&&s==="..."&&d?l[2]=Object.assign(l[2]||{},n[d]):o===2&&s&&!d?(l[2]=l[2]||{})[s]=!0:o>=5&&(o===5?((l[2]=l[2]||{})[i]=d?s?s+n[d]:n[d]:s,o=6):(d||s)&&(l[2][i]+=d?s+n[d]:s)),s=""},h=0;h<t.length;h++){h&&(o===1&&r(),r(h));for(var g=0;g<t[h].length;g++)e=t[h][g],o===1?e==="<"?(r(),l=[l,"",null],o=3):s+=e:o===4?s==="--"&&e===">"?(o=1,s=""):s=e+s[0]:c?e===c?c="":s+=e:e==='"'||e==="'"?c=e:e===">"?(r(),o=1):o&&(e==="="?(o=5,i=s,s=""):e==="/"&&(o<5||t[h][g+1]===">")?(r(),o===3&&(l=l[0]),o=l,(l=l[0]).push(this.apply(null,o.slice(1))),o=0):e===" "||e==="	"||e===`
`||e==="\r"?(r(),o=2):s+=e),o===3&&s==="!--"&&(o=4,l=l[0])}return r(),l.length>2?l.slice(1):l[1]}let O=Object,u,f=O.getPrototypeOf,x=document,y,p,_,V={isConnected:1},Y=1e3,v,k={},Z=f(V),E=f(f),D=(t,e,i,n)=>(t??(setTimeout(i,n),new Set)).add(e),I=(t,e,i)=>{let n=p;p=e;try{return t(i)}catch(o){return console.error(o),i}finally{p=n}},w=t=>t.filter(e=>{var i;return(i=e._dom)==null?void 0:i.isConnected}),N=t=>v=D(v,t,()=>{for(let e of v)e._bindings=w(e._bindings),e._listeners=w(e._listeners);v=u},Y),C={get val(){return p==null||p.add(this),this._val},get oldVal(){return p==null||p.add(this),this._oldVal},set val(t){let e=this;if(t!==e._val){e._val=t;let i=[...e._listeners=w(e._listeners)];for(let n of i)R(n.f,n.s,n._dom),n._dom=u;e._bindings.length?y=D(y,e,se):e._oldVal=t}}},W=t=>({__proto__:C,_val:t,_oldVal:t,_bindings:[],_listeners:[]}),M=t=>f(t??0)===C,ee=t=>M(t)?t.val:t,te=t=>M(t)?t.oldVal:t,m=(t,e)=>{let i=new Set,n={f:t},o=_;_=[];let s=I(t,i,e);s=(s??x).nodeType?s:new Text(s);for(let c of i)N(c),c._bindings.push(n);for(let c of _)c._dom=s;return _=o,n._dom=s},R=(t,e=W(),i)=>{let n=new Set,o={f:t,s:e};o._dom=i??(_==null?void 0:_.push(o))??V,e.val=I(t,n);for(let s of n)N(s),s._listeners.push(o);return e},F=(t,...e)=>{for(let i of e.flat(1/0)){let n=f(i??0),o=n===C?m(()=>i.val):n===E?m(i):i;o!=u&&t.append(o)}return t},ie=t=>(t._isBindingFunc=1,t),$=t=>new Proxy((e,...i)=>{var c;let[n,...o]=f(i[0]??0)===Z?i:[{},...i],s=t?x.createElementNS(t,e):x.createElement(e);for(let[l,r]of O.entries(n)){let h=A=>A?O.getOwnPropertyDescriptor(A,l)??h(f(A)):u,g=e+","+l,d=k[g]??(k[g]=((c=h(f(s)))==null?void 0:c.set)??0),T=d?d.bind(s):s.setAttribute.bind(s,l),J=f(r??0);J===C?m(()=>(T(r.val),s)):J===E&&(!l.startsWith("on")||r._isBindingFunc)?m(()=>(T(r()),s)):T(r)}return F(s,...o)},{get:(e,i)=>e.bind(u,i)}),B=(t,e)=>e?e!==t&&t.replaceWith(e):t.remove(),se=()=>{let t=[...y].filter(e=>e._val!==e._oldVal);y=u;for(let e of new Set(t.flatMap(i=>i._bindings=w(i._bindings))))B(e._dom,m(e.f,e._dom)),e._dom=u;for(let e of t)e._oldVal=e._val},ne=(t,e)=>B(t,m(e,t));const oe={add:F,_:ie,tags:$(),tagsNS:$,state:W,val:ee,oldVal:te,derive:R,hydrate:ne},{state:G,derive:le,tags:de}=oe;function re(t,e,...i){const n=de[t];return e?n(e,...i):n(...i)}const ce=X.bind(re);let H=t=>typeof t!="object"?G(t):K(L(t).map(([e,i])=>[e,H(i)]));a.ReactiveWC=P,a.defineComponent=U,a.derive=le,a.html=ce,a.reactive=H,a.state=G,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
