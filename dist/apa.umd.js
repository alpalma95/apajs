(function(f,p){typeof exports=="object"&&typeof module<"u"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(f=typeof globalThis<"u"?globalThis:f||self,p(f.apajs={}))})(this,function(f){"use strict";let{isArray:p}=Array,{fromEntries:w,entries:g,keys:v}=Object,m=(o,s)=>{p(s)?s.forEach(n=>typeof n=="string"?o.appendChild(document.createTextNode(n)):o.appendChild(n)):o.appendChild(typeof s=="string"?document.createTextNode(s):s)},E=(o,s)=>{window.customElements.define(o.tag,class extends HTMLElement{constructor(){super(),this.ctx={onInit:(n=()=>{})=>n(),onDestroy:(n=()=>{})=>n(),subscribers:[],host:this,watch:(n,r)=>this.ctx.subscribers.push({attributeName:n,cb:r})},o.shadow&&this.attachShadow({mode:o.shadow})}static get observedAttributes(){return o.observed}connectedCallback(){let n={};this.getAttributeNames().forEach(e=>{e.startsWith(":")&&(n[e.slice(1)]=this.getAttribute(e))}),this.ctx.props=n;let r=s(this.ctx),t=this.shadowRoot??this;m(t,r),this.ctx.onInit()}attributeChangedCallback(n,r,t){this.ctx.subscribers.forEach(({attributeName:e,cb:c})=>{n===e&&c(n,r,t)})}disconnectedCallback(){this.ctx.onDestroy()}})};function x(o){for(var s,n,r=arguments,t=1,e="",c="",i=[0],u=function(d){t===1&&(d||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(d?r[d]:e):t===3&&(d||e)?(i[1]=d?r[d]:e,t=2):t===2&&e==="..."&&d?i[2]=Object.assign(i[2]||{},r[d]):t===2&&e&&!d?(i[2]=i[2]||{})[e]=!0:t>=5&&(t===5?((i[2]=i[2]||{})[n]=d?e?e+r[d]:r[d]:e,t=6):(d||e)&&(i[2][n]+=d?e+r[d]:e)),e=""},h=0;h<o.length;h++){h&&(t===1&&u(),u(h));for(var b=0;b<o[h].length;b++)s=o[h][b],t===1?s==="<"?(u(),i=[i,"",null],t=3):e+=s:t===4?e==="--"&&s===">"?(t=1,e=""):e=s+e[0]:c?s===c?c="":e+=s:s==='"'||s==="'"?c=s:s===">"?(u(),t=1):t&&(s==="="?(t=5,n=e,e=""):s==="/"&&(t<5||o[h][b+1]===">")?(u(),t===3&&(i=i[0]),t=i,(i=i[0]).push(this.apply(null,t.slice(1))),t=0):s===" "||s==="	"||s===`
`||s==="\r"?(u(),t=2):e+=s),t===3&&e==="!--"&&(t=4,i=i[0])}return u(),i.length>2?i.slice(1):i[1]}function C(o,s,...n){const r=document.createElement(o);if(s)for(const[t,e]of g(s))t.startsWith("on-")?r.addEventListener(t.slice(3),e):r.setAttribute(t,e);return n&&n.forEach(t=>{if(p(t)){t.forEach(e=>m(r,e));return}if(typeof t!="object"){const e=document.createTextNode(t);r.appendChild(e);return}r.appendChild(t)}),r}const j=x.bind(C);let l=null,a=o=>(l=o,o()),y=o=>{let s=new Set,n=()=>{l!==null&&(s.add(l),l=null)},r=()=>{s.forEach(e=>e())},t=typeof o=="object"?Object.fromEntries(Object.entries(o).map(([e,c])=>[e,typeof c=="object"?y(c):c])):typeof o=="function"?{val:a(()=>o)}:{val:o};return new Proxy(t,{get(e,c){return n(),typeof e[c]=="function"?e[c]():e[c]},set(e,c,i){return e[c]=i,r(),!0}})};f.defineComponent=E,f.derive=a,f.html=j,f.stream=y,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
