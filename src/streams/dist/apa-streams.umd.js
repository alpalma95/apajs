(function(o,r){typeof exports=="object"&&typeof module<"u"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(o=typeof globalThis<"u"?globalThis:o||self,r(o["@apajs/streams"]={}))})(this,function(o){"use strict";let r=null,f=new WeakMap;class d{constructor(t){this.cb=t,this._set=new Set}unhook(){this._set.forEach(t=>t.delete(this))}}let p=e=>{r=new d(e),r.cb();let t=r;return r=null,t},l=(e,t)=>{if(r===null)return;let n;f.has(e)?n=f.get(e).get(t):f.set(e,new Map([[t,n=new Set]])),r._set.add(n),n.add(r)},i=(e,t)=>{if(!f.get(e))return;f.get(e).get(t).forEach(({cb:s})=>s())},h=e=>{if(Array.isArray(e)||typeof e!="function"&&typeof e!="object")return{val:e};if(typeof e=="function"){let t=c(1);return p(()=>t.val=e()),t}else return Object.fromEntries(Object.entries(e).map(([t,n])=>[t,typeof n=="object"||typeof n=="function"?c(n):n]))},c=e=>{let t=h(e);return new Proxy(t,{get(n,s,u){return l(n,s),Reflect.get(n,s,u)},set(n,s,u,y){return n[s]!==u&&(Reflect.set(n,s,u,y),i(n,s)),!0}})};o.hook=p,o.stream=c,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});