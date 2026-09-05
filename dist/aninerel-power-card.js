function e(e,t,i,r){var a,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,i,n):a(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,_=globalThis,u=_.trustedTypes,y=u?u.emptyScript:"",m=_.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=r;const o=a.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const o=this.constructor;if(!1===r&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,A=$.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+S,M=`<${N}>`,P=document,O=()=>P.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,B="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,L=/>/g,I=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,D=/"/g,H=/^(?:script|style|textarea|title)$/i,V=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=V(1),j=V(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,K=P.createTreeWalker(P,129);function Z(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,r=[];let a,o=2===t?"<svg>":3===t?"<math>":"",n=R;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===R?"!--"===l[1]?n=F:void 0!==l[1]?n=L:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=a??R,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?I:'"'===l[3]?D:U):n===D||n===U?n=I:n===F||n===L?n=R:(n=I,a=void 0);const p=n===I&&e[t+1].startsWith("/>")?" ":"";o+=n===R?i+M:c>=0?(r.push(s),i.slice(0,c)+E+i.slice(c)+S+p):i+S+(-2===c?t:p)}return[Z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class X{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,o=0;const n=e.length-1,s=this.parts,[l,c]=J(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(E)){const t=c[o++],i=r.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?re:"?"===n[1]?ae:"@"===n[1]?oe:ie}),r.removeAttribute(e)}else e.startsWith(S)&&(s.push({type:6,index:a}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(S),t=e.length-1;if(t>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],O()),K.nextNode(),s.push({type:2,index:++a});r.append(e[t],O())}}}else if(8===r.nodeType)if(r.data===N)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(S,e+1));)s.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,r){if(t===q)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=z(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??P).importNode(t,!0);K.currentNode=r;let a=K.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new ne(a,this,e)),this._$AV.push(t),s=i[++n]}o!==s?.index&&(a=K.nextNode(),o++)}return K.currentNode=P,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),z(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new te(this.O(O()),this.O(O()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const a=this.strings;let o=!1;if(void 0===a)e=Q(this,e,t,0),o=!z(e)||e!==this._$AH&&e!==q,o&&(this._$AH=e);else{const r=e;let n,s;for(e=a[0],n=0;n<a.length-1;n++)s=Q(this,r[i+n],t,n),s===q&&(s=this._$AH[n]),o||=!z(s)||s!==this._$AH[n],s===G?e=G:e!==G&&(e+=(s??"")+a[n+1]),this._$AH[n]=s}o&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class oe extends ie{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===q)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=$.litHtmlPolyfillSupport;se?.(X,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new te(t.insertBefore(O(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},ge=(e=he,t,i)=>{const{kind:r,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function _e(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return _e({...e,state:!0,attribute:!1})}const ye="aninerel-power-card",me={title:"Aninerel ANL 4200T",max_power:4200,inverter_capacity:4200,min_flow_rate:.75,max_flow_rate:6,use_log_flow_model:!0,show_header:!0,show_flow:!0,show_params:!0,show_bms:!0,show_controls:!0,show_energy:!0,show_alerts:!0,compact_mode:!1},be="var(--energy-solar-color, #F59E0B)",fe="var(--energy-battery-in-color, #10B981)",ve="var(--energy-battery-out-color, #FF9800)",xe="var(--energy-grid-consumption-color, #4285F4)",we="var(--energy-grid-return-color, #2ecc71)",$e="var(--primary-text-color, #E0E0E0)",ke={type:"custom:aninerel-power-card",title:"Aninerel ANL 4200T",entities:{solar_power:"sensor.aninerel_anl_4200t_24l_w_pro_pv_power",battery_power:"sensor.aninerel_anl_4200t_24l_w_pro_battery_power",grid_power:"sensor.aninerel_anl_4200t_24l_w_pro_grid_power",load_power:"sensor.aninerel_anl_4200t_24l_w_pro_load_power"},battery_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage",battery_current_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_current",grid_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage",operating_mode_entity:"sensor.aninerel_anl_4200t_24l_w_pro_operating_mode",charging_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active",inverter_temperature_entity:"sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature",bms:{soc_entity:"sensor.redodo_battery_state_of_charge",cell_count:8,cell_voltage_prefix:"sensor.redodo_battery_cell_voltage_"},controls:{charge_source_entity:"select.aninerel_anl_4200t_24l_w_pro_charge_source_priority",output_priority_entity:"select.aninerel_anl_4200t_24l_w_pro_output_source_priority",max_charge_current_entity:"number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current",bulk_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage",float_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage",equalization_entity:"switch.aninerel_anl_4200t_24l_w_pro_battery_equalization"},safety:{fault_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active",fault_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_fault_code",warnings_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active",warning_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_code"},daily_energy:{load_energy_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today",grid_import_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today",battery_charge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today",battery_discharge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today"}},Ae=n`
  :host {
    display: block;
    box-sizing: border-box;
    container-type: inline-size;
    --card-bg: var(--ha-card-background, var(--card-background-color, #1a1a2e));
    --primary-text: var(--primary-text-color, #ffffff);
    --secondary-text: var(--secondary-text-color, #9ca3af);
    --divider: var(--divider-color, rgba(255, 255, 255, 0.08));
    --solar-color: var(--energy-solar-color, #f59e0b);
    --battery-charge-color: var(--energy-battery-in-color, #10b981);
    --battery-discharge-color: var(--energy-battery-out-color, #ff9800);
    --grid-import-color: var(--energy-grid-consumption-color, #4285f4);
    --grid-export-color: var(--energy-grid-return-color, #2ecc71);
    --home-color: var(--primary-text-color, #ffffff);
    --inverter-color: #3b82f6;
  }

  ha-card {
    background: var(--card-bg);
    color: var(--primary-text);
    border-radius: var(--ha-card-border-radius, 16px);
    padding: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.3));
    border: 1px solid var(--divider);
    position: relative;
  }

  /* ============================================================
     HEADER BAR SECTION
     ============================================================ */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-icon-box ha-icon {
    --mdc-icon-size: 24px;
    color: var(--solar-color);
  }

  .header-title-box {
    display: flex;
    flex-direction: column;
  }

  .header-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.2;
  }

  .header-subtitle {
    font-size: 0.72rem;
    color: var(--secondary-text);
  }

  .header-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 9999px;
    font-size: 0.73rem;
    font-weight: 600;
    color: var(--chip-color, #10b981);
    background: color-mix(in srgb, var(--chip-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--chip-color, #10b981) 35%, transparent);
    cursor: pointer;
    border-style: solid;
    outline: none;
    font-family: inherit;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .status-chip:hover {
    transform: scale(1.04);
    filter: brightness(1.15);
  }

  .status-chip ha-icon {
    --mdc-icon-size: 14px;
  }

  .pulse-chip {
    animation: pulse-glow 2s infinite ease-in-out;
  }

  .pulse-chip-danger {
    animation: pulse-danger 1.2s infinite ease-in-out;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 4px rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.9);
    }
  }

  @keyframes pulse-danger {
    0%, 100% {
      box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
    }
    50% {
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.9);
    }
  }

  .chip-ok {
    color: #10b981;
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    cursor: default;
  }

  /* ============================================================
     POWER FLOW VISUALIZATION SECTION
     ============================================================ */
  .power-flow-container {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    aspect-ratio: 500 / 360;
    user-select: none;
  }

  svg.flow-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  .pipe-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.07);
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  .flow-line {
    fill: none;
    stroke-dasharray: 4 10;
    stroke-linecap: round;
    animation: flow-dash var(--flow-duration, 2.5s) linear infinite;
    will-change: stroke-dashoffset;
    filter: drop-shadow(0 0 4px currentColor);
  }

  .flow-line.reverse {
    animation-direction: reverse;
  }

  @keyframes flow-dash {
    from {
      stroke-dashoffset: 28;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .flow-nodes-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .flow-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .flow-node:hover {
    transform: translate(-50%, -50%) scale(1.05);
    filter: brightness(1.1);
  }

  .node-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(20, 24, 38, 0.88);
    border: 2px solid var(--node-border, rgba(255, 255, 255, 0.15));
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .node-value {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin-top: 4px;
    white-space: nowrap;
  }

  .node-label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .node-solar { --node-border: var(--solar-color); }
  .node-solar .node-badge { width: 66px; height: 66px; }
  .node-solar ha-icon { --mdc-icon-size: 30px; color: var(--solar-color); }
  .node-solar .node-value { color: var(--solar-color); }

  .node-inverter { --node-border: var(--inverter-color); }
  .node-inverter .node-badge {
    width: 64px;
    height: 64px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(20, 24, 38, 0.95) 80%);
    border: 2px solid rgba(59, 130, 246, 0.5);
  }
  .node-inverter ha-icon { --mdc-icon-size: 30px; color: var(--inverter-color); }
  .inverter-status-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    border: 2px solid #1a1a2e;
    box-shadow: 0 0 6px #10b981;
  }

  .node-battery { --node-border: transparent; }
  .node-battery .node-badge {
    width: 78px;
    height: 78px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .battery-gauge-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .battery-gauge-bg {
    fill: rgba(20, 24, 38, 0.85);
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 5;
  }
  .battery-gauge-fill {
    fill: none;
    stroke-width: 5.5;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
  }
  .battery-gauge-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .battery-gauge-center ha-icon { --mdc-icon-size: 20px; }
  .battery-soc-text {
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 2px;
  }

  .node-home { --node-border: rgba(255, 255, 255, 0.3); }
  .node-home .node-badge { width: 70px; height: 70px; }
  .node-home ha-icon { --mdc-icon-size: 32px; color: var(--home-color); }
  .node-home .node-value { color: var(--home-color); }

  .node-grid { --node-border: var(--grid-import-color); }
  .node-grid .node-badge { width: 66px; height: 66px; }
  .node-grid ha-icon { --mdc-icon-size: 30px; color: var(--grid-import-color); }
  .node-grid .node-value { color: var(--grid-import-color); }

  /* ============================================================
     ELECTRICAL PARAMETERS SECTION
     ============================================================ */
  .params-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .param-tile {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .param-tile:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  .param-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .param-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .param-title {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .param-badge {
    font-size: 0.62rem;
    padding: 1px 5px;
    border-radius: 4px;
    font-weight: 600;
  }

  .param-main-value {
    font-size: 1.08rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .param-slash {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
  }

  .param-chart-box {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .sparkline-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .sparkline-placeholder {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
  }

  .param-kpi-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .kpi-val {
    font-size: 1.3rem;
  }

  .arc-gauge-wrapper {
    width: 44px;
    height: 26px;
  }

  .arc-gauge-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* ============================================================
     BMS REDODO SECTION
     ============================================================ */
  .bms-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bms-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .bms-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #10b981;
  }

  .bms-soc-badge {
    font-size: 0.72rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 2px 7px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .bms-delta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--delta-color, #10b981);
    background: color-mix(in srgb, var(--delta-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--delta-color, #10b981) 30%, transparent);
    padding: 2px 8px;
    border-radius: 9999px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-delta-pill:hover {
    transform: scale(1.05);
  }

  .bms-delta-pill ha-icon {
    --mdc-icon-size: 14px;
  }

  .bms-body {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .cells-grid {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    flex-grow: 1;
    height: 76px;
    padding-bottom: 2px;
  }

  .cell-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    height: 100%;
    transition: transform 0.15s ease;
  }

  .cell-col:hover {
    transform: translateY(-2px);
  }

  .cell-bar-track {
    width: 100%;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .cell-bar-fill {
    width: 100%;
    border-radius: 3px;
    transition: height 0.4s ease, background-color 0.3s ease;
  }

  .cell-max {
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  }

  .cell-min {
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
  }

  .cell-voltage {
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.1;
    white-space: nowrap;
  }

  .cell-id {
    font-size: 0.64rem;
    color: var(--secondary-text);
    line-height: 1;
  }

  .bms-telemetry-panel {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-left: 1px solid var(--divider);
    padding-left: 12px;
    min-width: 85px;
  }

  .bms-stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-stat-item:hover {
    transform: translateX(2px);
  }

  .bms-stat-item ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .bms-stat-text {
    display: flex;
    flex-direction: column;
  }

  .bms-stat-val {
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .bms-stat-lbl {
    font-size: 0.6rem;
    color: var(--secondary-text);
    text-transform: uppercase;
  }

  /* ============================================================
     CONTROLS SECTION
     ============================================================ */
  .controls-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .controls-card-section.expanded {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }

  .controls-header:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .controls-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: var(--inverter-color);
  }

  .controls-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .controls-quick-summary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  .chevron-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text);
    transition: transform 0.25s ease;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .controls-body {
    padding: 4px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid var(--divider);
  }

  .controls-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .control-box {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .control-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .control-box-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .control-box-header label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .control-label-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .control-live-val {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--inverter-color);
  }

  /* Pill Buttons Selector */
  .pill-selector {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px;
    border-radius: 8px;
    gap: 4px;
  }

  .pill-btn {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--secondary-text);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 6px 4px;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-align: center;
    font-family: inherit;
  }

  .pill-btn:hover {
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.05);
  }

  .pill-btn.active {
    background: var(--inverter-color);
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  }

  /* Slider Styling */
  .slider-box {
    padding: 10px 14px;
  }

  .slider-input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .slider-boundary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
  }

  .control-range {
    flex-grow: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--inverter-color);
    cursor: pointer;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
    transition: transform 0.15s ease;
  }

  .control-range::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  /* Mini Voltage Steppers */
  .voltage-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 2px 4px;
  }

  .stepper-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: var(--primary-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background 0.15s ease;
  }

  .stepper-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper-btn:active {
    transform: scale(0.92);
  }

  .stepper-val {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  /* Danger Zone: Equalization */
  .danger-switch-row {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .danger-switch-row.danger-active {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
    animation: pulse-danger 1.5s infinite ease-in-out;
  }

  .danger-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .danger-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: #ef4444;
  }

  .danger-title ha-icon {
    --mdc-icon-size: 16px;
  }

  .danger-desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.2;
  }

  .toggle-switch-btn {
    min-width: 52px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .switch-off {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text);
  }

  .switch-on {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  }

  /* ============================================================
     DAILY ENERGY SECTION
     ============================================================ */
  .energy-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .energy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .energy-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .energy-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
  }

  .energy-total-pill {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 8px;
    border-radius: 9999px;
  }

  .energy-bars-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .energy-row {
    display: grid;
    grid-template-columns: 140px 1fr 85px;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 6px;
    transition: background 0.15s ease;
  }

  .energy-row:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .energy-row-info {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .energy-row-info ha-icon {
    --mdc-icon-size: 18px;
  }

  .energy-row-label {
    font-size: 0.73rem;
    font-weight: 500;
    color: var(--secondary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .energy-track-wrapper {
    width: 100%;
    height: 8px;
    display: flex;
    align-items: center;
  }

  .energy-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .energy-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .energy-row-val {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .energy-kwh small {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--secondary-text);
  }

  .energy-pct {
    font-size: 0.65rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  /* ============================================================
     ALERT & DIAGNOSTICS SECTION
     ============================================================ */
  .alert-section-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .alert-box {
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .alert-box:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .alert-critical {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid #ef4444;
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.3);
    animation: pulse-danger 1.8s infinite ease-in-out;
  }

  .alert-critical .alert-icon-col ha-icon {
    --mdc-icon-size: 26px;
    color: #ef4444;
  }

  .alert-critical .alert-badge {
    background: #ef4444;
    color: #ffffff;
  }

  .alert-warn {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.4);
  }

  .alert-warn .alert-icon-col ha-icon {
    --mdc-icon-size: 24px;
    color: #f59e0b;
  }

  .alert-warn .alert-badge {
    background: #f59e0b;
    color: #000000;
  }

  .alert-content-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }

  .alert-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .alert-badge {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.3px;
  }

  .alert-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .alert-desc {
    margin: 0;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  .alert-rec {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fcd34d;
  }

  .alert-rec ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ============================================================
     RESPONSIVE BREAKPOINTS
     ============================================================ */
  @container (max-width: 440px) {
    .header-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .params-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .controls-grid-2 {
      grid-template-columns: 1fr;
    }
    .energy-row {
      grid-template-columns: 100px 1fr 70px;
    }
    .bms-body {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .bms-telemetry-panel {
      border-left: none;
      border-top: 1px solid var(--divider);
      padding-left: 0;
      padding-top: 8px;
      flex-direction: row;
      justify-content: space-around;
    }
    .node-solar .node-badge,
    .node-grid .node-badge {
      width: 56px;
      height: 56px;
    }
    .node-battery .node-badge {
      width: 68px;
      height: 68px;
    }
    .node-home .node-badge {
      width: 60px;
      height: 60px;
    }
    .node-inverter .node-badge {
      width: 54px;
      height: 54px;
    }
    .node-value {
      font-size: 0.82rem;
    }
    .node-label {
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-line {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 0.8;
    }
    .flow-node, .status-chip, .cell-col, .bms-stat-item, .pill-btn, .stepper-btn, .alert-box {
      transition: none !important;
      animation: none !important;
    }
  }
`;const Ce={solar:{x:250,y:44},inverter:{x:250,y:175},battery:{x:74,y:175},home:{x:426,y:175},grid:{x:250,y:308}};function Ee(e,t=1){return Math.abs(e)>=1e3?`${(e/1e3).toFixed(t)} kW`:`${Math.round(e)} W`}function Se(e){const{config:t,solarWatts:i,batteryWatts:r,gridWatts:a,loadWatts:o,batterySoc:n,operatingMode:s,isFault:l,onNodeClick:c}=e,d=t.max_power||4200,p=!1!==t.use_log_flow_model,h=t.min_flow_rate||.75,g=t.max_flow_rate||5,_=function(e,t,i,r,a){const o=[],n=a?.solar||be,s=a?.battery_charge||fe,l=a?.battery_discharge||ve,c=a?.grid_import||xe,d=a?.grid_export||we,p=a?.home||$e,h=Math.max(0,e);h>=5&&o.push({id:"flow-solar-inverter",d:"M 250 82 L 250 140",watts:h,color:n,reversed:!1});const g=Math.max(0,r);g>=5&&o.push({id:"flow-inverter-home",d:"M 284 175 L 388 175",watts:g,color:p,reversed:!1});const _=Math.abs(t);if(_>=5){const e=t>0;o.push({id:"flow-battery-inverter",d:"M 116 175 L 216 175",watts:_,color:e?s:l,reversed:e})}const u=Math.abs(i);if(u>=5){const e=i>0;o.push({id:"flow-grid-inverter",d:"M 250 210 L 250 274",watts:u,color:e?c:d,reversed:e})}return o}(i,r,a,o,t.colors),{solar:u,inverter:y,battery:m,home:b,grid:f}=Ce,v=Math.max(0,Math.min(100,isNaN(n)?0:n)),x=2*Math.PI*32,w=x*(1-v/100),$=v>50?"#10b981":v>20?"#f59e0b":"#ef4444",k=r>20?"Charge":r<-20?"Discharge":"Standby";return W`
    <div class="power-flow-container">
      <!-- 1. Background Pipelines and Animated Energy Flows -->
      <svg class="flow-svg" viewBox="0 0 500 360" preserveAspectRatio="xMidYMid meet">
        <!-- Static background wire tracks with clean clearance -->
        <path class="pipe-track" d="M 250 82 L 250 140" />
        <path class="pipe-track" d="M 116 175 L 216 175" />
        <path class="pipe-track" d="M 284 175 L 388 175" />
        <path class="pipe-track" d="M 250 210 L 250 274" />

        <!-- Active animated flow lines -->
        ${_.map(e=>{const t=function(e,t=4200,i=.75,r=5,a=!0){const o=Math.abs(e);if(o<5)return 0;const n=Math.min(o,t);let s;s=a?Math.log10(n+1)/Math.log10(t+1):n/t;const l=r-s*(r-i);return Math.max(i,Math.min(r,Number(l.toFixed(2))))}(e.watts,d,h,g,p),i=function(e,t=4200){const i=Math.min(Math.abs(e)/t,1);return Number((2.8+2.7*i).toFixed(1))}(e.watts,d);return j`
            <path
              id="${e.id}"
              class="flow-line ${e.reversed?"reverse":""}"
              d="${e.d}"
              stroke="${e.color}"
              stroke-width="${i}"
              style="--flow-duration: ${t}s; color: ${e.color};"
            />
          `})}
      </svg>

      <!-- 2. Interactive Badges Layer -->
      <div class="flow-nodes-layer">
        <!-- SOLAR NODE (Top) -->
        <div
          class="flow-node node-solar"
          style="left: ${u.x/500*100}%; top: ${u.y/360*100}%;"
          @click=${()=>c(t.entities.solar_power)}
          title="Солнечная генерация"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:solar-power-variant"></ha-icon>
          </div>
          <span class="node-value">${Ee(i)}</span>
          <span class="node-label">Solar</span>
        </div>

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${m.x/500*100}%; top: ${m.y/360*100}%;"
          @click=${()=>c(t.bms?.soc_entity||t.entities.battery_power)}
          title="Аккумуляторная батарея"
        >
          <div class="node-badge">
            <svg class="battery-gauge-svg" viewBox="0 0 80 80">
              <circle
                class="battery-gauge-bg"
                cx="40"
                cy="40"
                r="${32}"
              />
              <circle
                class="battery-gauge-fill"
                cx="40"
                cy="40"
                r="${32}"
                stroke="${$}"
                stroke-dasharray="${x}"
                stroke-dashoffset="${w}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${r>20?"mdi:battery-charging":v>80?"mdi:battery-high":v>30?"mdi:battery-medium":"mdi:battery-low"}"
                style="color: ${$};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${$};">
                ${v}%
              </span>
            </div>
          </div>
          <span class="node-value" style="color: ${$};">
            ${Ee(Math.abs(r))}
          </span>
          <span class="node-label">${k}</span>
        </div>

        <!-- CENTRAL INVERTER NODE -->
        <div
          class="flow-node node-inverter"
          style="left: ${y.x/500*100}%; top: ${y.y/360*100}%;"
          @click=${()=>c(t.operating_mode_entity)}
          title="Статус инвертора"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span
              class="inverter-status-dot"
              style="background: ${l?"#ef4444":"#10b981"}; box-shadow: 0 0 6px ${l?"#ef4444":"#10b981"};"
            ></span>
          </div>
          <span class="node-value">${s||"Inverter"}</span>
          <span class="node-label">4.2 kW</span>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${b.x/500*100}%; top: ${b.y/360*100}%;"
          @click=${()=>c(t.entities.load_power)}
          title="Потребление дома"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <span class="node-value">${Ee(o)}</span>
          <span class="node-label">Home</span>
        </div>

        <!-- GRID NODE (Bottom) -->
        <div
          class="flow-node node-grid"
          style="left: ${f.x/500*100}%; top: ${f.y/360*100}%;"
          @click=${()=>c(t.entities.grid_power)}
          title="Электросеть"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
          </div>
          <span class="node-value">${Ee(Math.abs(a))}</span>
          <span class="node-label">
            ${a>20?"Import":a<-20?"Export":"Grid"}
          </span>
        </div>
      </div>
    </div>
  `}function Ne(e,t){if(!e||e.length<2)return W`<div class="sparkline-placeholder"></div>`;const i=Math.min(...e),r=Math.max(...e)-i||1,a=e.map((t,a)=>{const o=a/(e.length-1)*110,n=26-(t-i)/r*20-3;return`${o.toFixed(1)},${n.toFixed(1)}`}).join(" ");return j`
    <svg class="sparkline-svg" viewBox="0 0 ${110} ${26}" preserveAspectRatio="none">
      <polyline
        points="${a}"
        fill="none"
        stroke="${t}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `}function Me(e){const{config:t,batteryVoltage:i,batteryCurrent:r,gridVoltage:a,gridImportEnergyToday:o,loadEnergyToday:n,historyMap:s,onParamClick:l}=e;let c="#10b981";null===i||isNaN(i)||(i<24||i>29?c="#ef4444":i<25.6&&(c="#f59e0b"));let d="#4285f4",p="Normal";null===a||isNaN(a)||(a<190||a>255?(d="#ef4444",p=a<190?"Low (Sag)":"High (Surge)"):(a<210||a>245)&&(d="#f59e0b",p="Deviated"));let h=100;if(null!==n&&n>0){const e=null!==o?Math.max(0,o):0;h=Math.max(0,Math.min(100,Math.round(100*(1-e/n))))}const g=h>=75?"#10b981":h>=40?"#f59e0b":"#ef4444",_=s.get("battery_voltage")||[],u=s.get("grid_voltage")||[];return W`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>l(t.battery_voltage_entity)}
        title="Параметры аккумулятора"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">Battery DC</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${c}">
            ${null===i||isNaN(i)?"N/A":`${i.toFixed(1)}V`}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${r&&r>0?"#10b981":"#f59e0b"}">
            ${null===r||isNaN(r)?"N/A":`${r>0?"+":""}${r.toFixed(1)}A`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Ne(_,c)}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>l(t.grid_voltage_entity)}
        title="Сетевое напряжение"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">Grid AC</span>
          <span class="param-badge" style="background: ${d}22; color: ${d}">
            ${p}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${d}">
            ${null===a||isNaN(a)?"N/A":`${Math.round(a)}V`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Ne(u,d)}
        </div>
      </div>

      <!-- TILE 3: KPI SELF-SUFFICIENCY (АВТОНОМНОСТЬ) -->
      <div
        class="param-tile"
        @click=${()=>l(t.daily_energy?.grid_import_entity)}
        title="Дневная автономность"
      >
        <div class="param-header">
          <ha-icon icon="mdi:shield-sun"></ha-icon>
          <span class="param-title">Self-Sufficiency</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${g}">
            ${h}%
          </div>
          <div class="arc-gauge-wrapper">
            ${function(e,t){const i=19.75*Math.PI,r=Math.max(0,Math.min(100,e));return j`
    <svg class="arc-gauge-svg" viewBox="0 0 50 30">
      <!-- Background track -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-width="${4.5}"
        stroke-linecap="round"
      />
      <!-- Active gauge arc -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="${t}"
        stroke-width="${4.5}"
        stroke-linecap="round"
        stroke-dasharray="${i}"
        stroke-dashoffset="${i*(1-r/100)}"
      />
    </svg>
  `}(h,g)}
          </div>
        </div>
      </div>
    </div>
  `}function Pe(e){const{dailyConfig:t,loadEnergy:i,gridImportEnergy:r,batteryChargeEnergy:a,batteryDischargeEnergy:o,onEnergyClick:n}=e,s=null!==i?Math.max(0,i):0,l=null!==r?Math.max(0,r):0,c=null!==a?Math.max(0,a):0,d=null!==o?Math.max(0,o):0,p=Math.max(s,l,c,d,.1),h=[{id:t.load_energy_entity,label:"Потребление дома",value:s,color:"#e2e8f0",icon:"mdi:home-lightning-bolt",pct:s>0?100:0},{id:t.grid_import_entity,label:"Импорт из сети",value:l,color:"#4285f4",icon:"mdi:transmission-tower",pct:s>0?Math.round(l/s*100):0},{id:t.battery_charge_entity,label:"Закачано в АКБ",value:c,color:"#10b981",icon:"mdi:battery-plus-variant",pct:s>0?Math.round(c/s*100):0},{id:t.battery_discharge_entity,label:"Отдано батареей",value:d,color:"#f59e0b",icon:"mdi:battery-minus-variant",pct:s>0?Math.round(d/s*100):0}];return W`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>Суточный баланс энергии</span>
        </div>
        <span class="energy-total-pill">Итого: ${function(e,t=1){return null==e||isNaN(e)?"0.0 kWh":`${e.toFixed(t)} kWh`}(s)}</span>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${h.map(e=>{const t=Math.max(3,Math.min(100,Math.round(e.value/p*100)));return W`
            <div
              class="energy-row"
              @click=${()=>n(e.id)}
              title="${e.label}: ${e.value.toFixed(2)} кВт·ч"
            >
              <!-- Icon and Label -->
              <div class="energy-row-info">
                <ha-icon icon="${e.icon}" style="color: ${e.color}"></ha-icon>
                <span class="energy-row-label">${e.label}</span>
              </div>

              <!-- Bar Track -->
              <div class="energy-track-wrapper">
                <div class="energy-track">
                  <div
                    class="energy-fill"
                    style="width: ${t}%; background-color: ${e.color};"
                  ></div>
                </div>
              </div>

              <!-- Numeric Value & Percentage -->
              <div class="energy-row-val">
                <span class="energy-kwh" style="color: ${e.color}">
                  ${e.value.toFixed(1)} <small>kWh</small>
                </span>
                ${e.pct>0&&100!==e.pct?W`<span class="energy-pct">(${e.pct}%)</span>`:""}
              </div>
            </div>
          `})}
      </div>
    </div>
  `}const Oe={0:{code:0,title:"Норма",description:"Ошибок в работе инвертора не обнаружено.",recommendation:"Система функционирует штатно.",severity:"info"},1:{code:1,title:"Вентилятор заблокирован",description:"Вентилятор охлаждения остановлен или заблокирован посторонним предметом.",recommendation:"Проверьте решетки охлаждения, очистите вентиляторы от пыли.",severity:"critical"},2:{code:2,title:"Перегрев инвертора",description:"Внутренняя температура радиатора силовых ключей превысила допустимый предел.",recommendation:"Обеспечьте циркуляцию воздуха, снизьте нагрузку на инвертор.",severity:"critical"},3:{code:3,title:"Перенапряжение батареи",description:"Напряжение на клеммах аккумулятора превысило максимальный порог безопасности.",recommendation:"Проверьте настройки Bulk/Float и параметры заряда на BMS.",severity:"critical"},4:{code:4,title:"Низкое напряжение батареи",description:"Аккумулятор полностью разряжен ниже минимального защитного порога.",recommendation:"Подключите сетевое питание или дождитесь солнечной генерации.",severity:"warning"},5:{code:5,title:"Короткое замыкание на выходе",description:"Обнаружено короткое замыкание в цепи потребителей 230В дома.",recommendation:"Немедленно отключите автоматические выключатели нагрузок и найдите КЗ.",severity:"critical"},6:{code:6,title:"Выходное напряжение завышено",description:"Выходное переменное напряжение инвертора превысило допустимую норму 260В.",recommendation:"Отключите чувствительную бытовую технику, перезапустите инвертор.",severity:"critical"},7:{code:7,title:"Таймаут перегрузки",description:"Суммарная нагрузка превышала 4200 Вт дольше допустимого лимита времени.",recommendation:"Отключите мощные электроприборы (бойлер, чайник, обогреватель).",severity:"warning"},8:{code:8,title:"Перенапряжение шины DC",description:"Внутренняя постоянная шина высокого напряжения инвертора превысила норму.",recommendation:"Перезагрузите инвертор. При повторении обратитесь в сервис.",severity:"critical"},9:{code:9,title:"Ошибка софт-старта шины",description:"Сбой плавного пуска силовой части инвертора при включении.",recommendation:"Проверьте входные напряжения PV и аккумулятора.",severity:"critical"},51:{code:51,title:"Токовая перегрузка инвертора",description:"Резкий скачок пускового тока или аппаратная перегрузка силовых транзисторов.",recommendation:"Исключите одновременный пуск двигателей и насосов.",severity:"critical"},52:{code:52,title:"Просадка напряжения шины DC",description:"Напряжение высоковольтной шины упало ниже минимального уровня преобразования.",recommendation:"Проверьте состояние батареи под нагрузкой.",severity:"warning"},53:{code:53,title:"Ошибка самотестирования инвертора",description:"Внутренний диагностический тест DCDC или инверторного моста не пройден.",recommendation:"Перезапустите устройство тумблером питания.",severity:"critical"},58:{code:58,title:"Выходное напряжение занижено",description:"Инвертор не может удержать 230В на выходе из-за перегрузки.",recommendation:"Снизьте нагрузку на дом.",severity:"warning"}},ze={0:{title:"Нет предупреждений",description:"Предупреждения отсутствуют."},1:{title:"Вентилятор замедлен",description:"Вентилятор работает на пониженных оборотах или запылен."},2:{title:"Высокая температура",description:"Температура блока повышена, вентиляторы включены на максимум."},3:{title:"Батарея перезаряжена",description:"Напряжение АКБ близко к верхнему порогу отсечки."},4:{title:"Низкий заряд АКБ",description:"Напряжение батареи ниже порога предупреждения."},7:{title:"Перегрузка нагрузки",description:"Потребление дома приближается к максимуму 4.2 кВт."},10:{title:"Дерайтинг мощности",description:"Инвертор автоматически снижает мощность из-за нагрева."},15:{title:"Низкое напряжение PV",description:"Напряжение солнечных панелей ниже рабочего диапазона MPPT (пасмурно/вечер)."},20:{title:"Сбой связи с BMS",description:"Потеряна связь с протоколом BMS аккумулятора."},32:{title:"Связь с платой связи",description:"Предупреждение внутренней шины коммуникации."},61:{title:"Превышение тока разряда",description:"Ток разряда аккумулятора превышает номинал."},62:{title:"Превышение тока заряда",description:"Суммарный ток заряда батареи выше допустимого."},63:{title:"Перегрев аккумулятора",description:"Температура батареи превысила защитный порог."},64:{title:"Низкий заряд батареи (Low Battery)",description:"Напряжение АКБ опустилось до установленного порога предупреждения инвертора (рекомендуется зарядка)."},65:{title:"Низкая температура АКБ",description:"Температура аккумулятора слишком низкая для заряда."}};console.info("%c  ANINEREL-POWER-CARD  %c  Version 1.0.2  ","color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;","color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;");let Te=class extends ce{constructor(){super(...arguments),this._controlsExpanded=!1,this._historyMap=new Map,this._maxHistoryPoints=16}static{this.styles=[Ae]}setConfig(e){if(!e)throw new Error("Некорректная конфигурация карточки");if(!e.entities)throw new Error('Обязательный блок "entities" не задан в конфигурации');if(!e.entities.solar_power||!e.entities.load_power)throw new Error("Необходимо указать как минимум entities.solar_power и entities.load_power");this._config={...me,...e,entities:{...e.entities},bms:e.bms?{...e.bms}:void 0,controls:e.controls?{...e.controls}:void 0,safety:e.safety?{...e.safety}:void 0,daily_energy:e.daily_energy?{...e.daily_energy}:void 0,colors:e.colors?{...e.colors}:void 0}}set hass(e){const t=this._hass;this._hass=e,t&&!this._hasRelevantEntitiesChanged(t,e)||(this._updateHistoryBuffers(),this.requestUpdate())}get hass(){return this._hass}getCardSize(){return 14}getLayoutOptions(){return{grid_rows:14,grid_columns:4,grid_min_rows:8,grid_min_columns:2}}static getStubConfig(){return ke}static async getConfigElement(){return await Promise.resolve().then(function(){return Le}),document.createElement("aninerel-power-card-editor")}_updateHistoryBuffers(){if(this._config&&this._hass){if(this._config.battery_voltage_entity){const e=this._getNumber(this._config.battery_voltage_entity);null===e||isNaN(e)||this._pushHistory("battery_voltage",e)}if(this._config.grid_voltage_entity){const e=this._getNumber(this._config.grid_voltage_entity);null===e||isNaN(e)||this._pushHistory("grid_voltage",e)}}}_pushHistory(e,t){const i=this._historyMap.get(e)||[];0!==i.length&&i[i.length-1]===t||(i.push(t),i.length>this._maxHistoryPoints&&i.shift(),this._historyMap.set(e,i))}_hasRelevantEntitiesChanged(e,t){if(!this._config)return!0;const i=this._getMonitoredEntityIds();for(const r of i)if(e.states[r]!==t.states[r])return!0;return!1}_getMonitoredEntityIds(){const e=[];if(!this._config)return e;const{entities:t,bms:i,controls:r,safety:a,daily_energy:o}=this._config;if(t&&(t.solar_power&&e.push(t.solar_power),t.battery_power&&e.push(t.battery_power),t.grid_power&&e.push(t.grid_power),t.load_power&&e.push(t.load_power)),this._config.battery_voltage_entity&&e.push(this._config.battery_voltage_entity),this._config.battery_current_entity&&e.push(this._config.battery_current_entity),this._config.grid_voltage_entity&&e.push(this._config.grid_voltage_entity),this._config.operating_mode_entity&&e.push(this._config.operating_mode_entity),this._config.charging_active_entity&&e.push(this._config.charging_active_entity),this._config.inverter_temperature_entity&&e.push(this._config.inverter_temperature_entity),i){i.soc_entity&&e.push(i.soc_entity),i.voltage_entity&&e.push(i.voltage_entity),i.current_entity&&e.push(i.current_entity),i.temperature_entity&&e.push(i.temperature_entity),i.temperature_2_entity&&e.push(i.temperature_2_entity),i.cycle_count_entity&&e.push(i.cycle_count_entity),i.cell_delta_entity&&e.push(i.cell_delta_entity),i.remaining_capacity_entity&&e.push(i.remaining_capacity_entity),i.full_capacity_entity&&e.push(i.full_capacity_entity);const t=i.cell_count||8,r=i.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=t;i++)e.push(`${r}${i}`)}return r&&(r.charge_source_entity&&e.push(r.charge_source_entity),r.output_priority_entity&&e.push(r.output_priority_entity),r.max_charge_current_entity&&e.push(r.max_charge_current_entity),r.bulk_voltage_entity&&e.push(r.bulk_voltage_entity),r.float_voltage_entity&&e.push(r.float_voltage_entity),r.equalization_entity&&e.push(r.equalization_entity)),a&&(a.fault_active_entity&&e.push(a.fault_active_entity),a.fault_code_entity&&e.push(a.fault_code_entity),a.warnings_active_entity&&e.push(a.warnings_active_entity),a.warning_code_entity&&e.push(a.warning_code_entity)),o&&(o.load_energy_entity&&e.push(o.load_energy_entity),o.grid_import_entity&&e.push(o.grid_import_entity),o.battery_charge_entity&&e.push(o.battery_charge_entity),o.battery_discharge_entity&&e.push(o.battery_discharge_entity)),e.filter(Boolean)}_getState(e){return e&&this._hass&&this._hass.states[e]?this._hass.states[e].state:"N/A"}_getNumber(e){if(!e||!this._hass||!this._hass.states[e])return 0;const t=parseFloat(this._hass.states[e].state);return isNaN(t)?0:t}_getOptions(e){return e&&this._hass&&this._hass.states[e]&&this._hass.states[e].attributes?.options||[]}_handleEntityClick(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}async _handleSelectOption(e,t){if(this._hass)try{await this._hass.callService("select","select_option",{entity_id:e,option:t})}catch(e){console.error("Failed to set option:",e)}}async _handleSetNumber(e,t){if(this._hass)try{await this._hass.callService("number","set_value",{entity_id:e,value:t})}catch(e){console.error("Failed to set number value:",e)}}async _handleToggleSwitch(e,t){if(this._hass)try{await this._hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e})}catch(e){console.error("Failed to toggle switch:",e)}}render(){if(!this._config)return W``;const e=this._getNumber(this._config.entities.solar_power),t=this._getNumber(this._config.entities.battery_power),i=this._getNumber(this._config.entities.grid_power),r=this._getNumber(this._config.entities.load_power),a=this._config.battery_voltage_entity?this._getNumber(this._config.battery_voltage_entity):null,o=this._config.battery_current_entity?this._getNumber(this._config.battery_current_entity):null,n=this._config.grid_voltage_entity?this._getNumber(this._config.grid_voltage_entity):null;let s=this._config.bms?.soc_entity?this._getNumber(this._config.bms.soc_entity):0;(s<=0||isNaN(s))&&a&&a>=20?s=a>=27.2?100:a>=26.8?Math.round(80+(a-26.8)/.4*20):a>=26.4?Math.round(50+(a-26.4)/.4*30):a>=26?Math.round(20+(a-26)/.4*30):a>=24?Math.max(5,Math.round((a-24)/2*20)):5:s<=0&&(!a||a<20)&&(s=80);const l=this._getState(this._config.operating_mode_entity),c=this._config.inverter_temperature_entity?this._getNumber(this._config.inverter_temperature_entity):null,d="on"===this._getState(this._config.charging_active_entity),p="on"===this._getState(this._config.safety?.fault_active_entity),h=this._config.safety?.fault_code_entity?parseInt(this._getState(this._config.safety.fault_code_entity),10):null,g="on"===this._getState(this._config.safety?.warnings_active_entity),_=this._config.safety?.warning_code_entity?parseInt(this._getState(this._config.safety.warning_code_entity),10):null,u=this._config.daily_energy?.grid_import_entity?this._getNumber(this._config.daily_energy.grid_import_entity):null,y=this._config.daily_energy?.load_energy_entity?this._getNumber(this._config.daily_energy.load_energy_entity):null,m=this._config.daily_energy?.battery_charge_entity?this._getNumber(this._config.daily_energy.battery_charge_entity):null,b=this._config.daily_energy?.battery_discharge_entity?this._getNumber(this._config.daily_energy.battery_discharge_entity):null,f=this._config.bms;let v=[];if(f){const e=f.cell_count||8,t=f.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=e;i++){const r=`${t}${i}`;let o=this._getNumber(r);o>100&&(o/=1e3),o<=0&&a&&a>0&&(o=Number((a/e).toFixed(3))),v.push({index:i,voltage:o>0?o:3.33,rawEntityId:r})}}const x=this._config.controls,w=this._config.safety,$=this._config.daily_energy;return W`
      <ha-card>
        <!-- 1. Header Bar with live status chips -->
        ${!1!==this._config.show_header?function(e){const{config:t,operatingMode:i,temperature:r,isCharging:a,isFault:o,faultCode:n,isWarning:s,warningCode:l,onChipClick:c}=e,d=i?i.toLowerCase():"";let p="#10b981",h="mdi:battery-charging-60";d.includes("mains")||d.includes("line")||d.includes("grid")?(p="#3b82f6",h="mdi:transmission-tower"):d.includes("bypass")?(p="#ef4444",h="mdi:transit-connection-variant"):d.includes("battery")&&(p="#10b981",h="mdi:battery-outline");let g="#10b981";return null===r||isNaN(r)||(r>55?g="#ef4444":r>42&&(g="#f59e0b")),W`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="mdi:solar-power-variant-outline"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${t.title||"Aninerel ANL 4200T"}</span>
          <span class="header-subtitle">Hybrid 24V 4.2kW Inverter</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${i&&"N/A"!==i?W`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${p}"
                @click=${()=>c(t.operating_mode_entity)}
                title="Режим работы инвертора"
              >
                <ha-icon .icon=${h}></ha-icon>
                <span>${i}</span>
              </button>
            `:""}

        <!-- Inverter Temperature Chip -->
        ${null===r||isNaN(r)?"":W`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${g}"
                @click=${()=>c(t.inverter_temperature_entity)}
                title="Температура силового блока"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(r)}°C</span>
              </button>
            `}

        <!-- Charging Active Flag -->
        ${a?W`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${()=>c(t.charging_active_entity)}
                title="Зарядка активна"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>CHG</span>
              </button>
            `:""}

        <!-- Fault Active Chip -->
        ${o?W`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>c(t.safety?.fault_code_entity||t.safety?.fault_active_entity)}
                title="Аварийное состояние инвертора"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${n?`F${n}`:"FAULT"}</span>
              </button>
            `:""}

        <!-- Warnings Active Chip -->
        ${s&&!o?W`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${()=>c(t.safety?.warning_code_entity||t.safety?.warnings_active_entity)}
                title="Предупреждение инвертора"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${l?`W${l}`:"WARN"}</span>
              </button>
            `:""}

        <!-- System Normal Chip -->
        ${o||s?"":W`
              <div class="status-chip chip-ok" title="Система в норме">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>OK</span>
              </div>
            `}
      </div>
    </div>
  `}({config:this._config,operatingMode:l,temperature:c,isCharging:d,isFault:p,faultCode:h,isWarning:g,warningCode:_,onChipClick:e=>this._handleEntityClick(e)}):""}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if any faults/warnings) -->
        ${!1!==this._config.show_alerts&&w?function(e){const{safetyConfig:t,isFault:i,faultCode:r,isWarning:a,warningCode:o,onAlertClick:n}=e;if(!i&&!a)return W``;const s=r??0,l=Oe[s]||{title:`Код сбоя F${s}`,description:"Обнаружена аппаратная или программная ошибка инвертора.",recommendation:"Проверьте сообщения на дисплее инвертора и документацию."},c=o??0,d=ze[c]||{title:`Предупреждение W${c}`,description:"Инвертор зафиксировал отклонение параметров от нормы."};return W`
    <div class="alert-section-wrapper">
      <!-- Critical Inverter Fault Banner -->
      ${i?W`
            <div
              class="alert-box alert-critical"
              @click=${()=>n(t.fault_code_entity||t.fault_active_entity)}
              title="Нажмите для открытия подробностей"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">АВАРИЯ F${s}</span>
                  <span class="alert-title">${l.title}</span>
                </div>
                <p class="alert-desc">${l.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${l.recommendation}</span>
                </div>
              </div>
            </div>
          `:""}

      <!-- Inverter Warning Banner -->
      ${a&&!i?W`
            <div
              class="alert-box alert-warn"
              @click=${()=>n(t.warning_code_entity||t.warnings_active_entity)}
              title="Нажмите для открытия подробностей"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">ПРЕДУПРЕЖДЕНИЕ W${c}</span>
                  <span class="alert-title">${d.title}</span>
                </div>
                <p class="alert-desc">${d.description}</p>
              </div>
            </div>
          `:""}
    </div>
  `}({safetyConfig:w,isFault:p,faultCode:h,isWarning:g,warningCode:_,onAlertClick:e=>this._handleEntityClick(e)}):""}

        <!-- 3. Power Flow Animated Diagram -->
        ${!1!==this._config.show_flow?Se({hass:this._hass,config:this._config,solarWatts:e,batteryWatts:t,gridWatts:i,loadWatts:r,batterySoc:s,operatingMode:"N/A"!==l?l:"Inverter",isFault:p,onNodeClick:e=>this._handleEntityClick(e)}):""}

        <!-- 4. Electrical Telemetry & Self-Sufficiency KPI -->
        ${!1!==this._config.show_params?Me({config:this._config,batteryVoltage:a,batteryCurrent:o,gridVoltage:n,gridImportEnergyToday:u,loadEnergyToday:y,historyMap:this._historyMap,onParamClick:e=>this._handleEntityClick(e)}):""}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing -->
        ${!1!==this._config.show_bms&&f?function(e){const{bmsConfig:t,soc:i,temperature:r,cycleCount:a,remainingCapacity:o,fullCapacity:n,cellDelta:s,cells:l,onBmsClick:c}=e,d=l.map(e=>e.voltage).filter(e=>e>0),p=d.length>0?Math.min(...d):3,h=d.length>0?Math.max(...d):3.65,g=null===s||isNaN(s)?d.length>0?Math.round(1e3*(h-p)):0:s;let _="#10b981",u="Balanced";g>50?(_="#ef4444",u="Imbalance Alert"):g>20&&(_="#f59e0b",u="Normal Drift");const y=3.65-3;return W`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>BMS Redodo LiFePO4</span>
          ${null===i||isNaN(i)?"":W`<span class="bms-soc-badge">${Math.round(i)}% SOC</span>`}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${_}"
            @click=${()=>c(t.cell_delta_entity)}
            title="Разница между максимальной и минимальной ячейкой: ${u}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${g} mV</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- 8-Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${l.map(e=>{const t=e.voltage===p&&d.length>1,i=e.voltage===h&&d.length>1,r=Math.max(15,Math.min(100,Math.round((e.voltage-3)/y*100))),a=i?"#10b981":t?"#3b82f6":"#0ea5e9";return W`
              <div
                class="cell-col"
                @click=${()=>c(e.rawEntityId)}
                title="Ячейка #${e.index}: ${e.voltage.toFixed(3)} V ${i?"(MAX)":t?"(MIN)":""}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${i?"cell-max":""} ${t?"cell-min":""}"
                    style="height: ${r}%; background-color: ${a};"
                  ></div>
                </div>
                <span class="cell-voltage">${e.voltage>0?e.voltage.toFixed(2):"-"}V</span>
                <span class="cell-id">#${e.index}</span>
              </div>
            `})}
        </div>

        <!-- Right Side: BMS Telemetry Columns -->
        <div class="bms-telemetry-panel">
          <!-- Battery Temperature -->
          ${null===r||isNaN(r)?"":W`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.temperature_entity)}
                  title="Температура датчика BMS"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${r.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">Temp</span>
                  </div>
                </div>
              `}

          <!-- Cycles Count -->
          ${null===a||isNaN(a)?"":W`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.cycle_count_entity)}
                  title="Количество циклов заряда/разряда"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${a}</span>
                    <span class="bms-stat-lbl">Cycles</span>
                  </div>
                </div>
              `}

          <!-- Capacity (Remaining / Full Ah) -->
          ${null===o||isNaN(o)?"":W`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.remaining_capacity_entity)}
                  title="Остаточная емкость аккумулятора"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(o)}${n?`/${Math.round(n)}`:""}Ah
                    </span>
                    <span class="bms-stat-lbl">Capacity</span>
                  </div>
                </div>
              `}
        </div>
      </div>
    </div>
  `}({bmsConfig:f,soc:s,temperature:f.temperature_entity?this._getNumber(f.temperature_entity):null,temperature2:f.temperature_2_entity?this._getNumber(f.temperature_2_entity):null,cycleCount:f.cycle_count_entity?this._getNumber(f.cycle_count_entity):null,remainingCapacity:f.remaining_capacity_entity?this._getNumber(f.remaining_capacity_entity):null,fullCapacity:f.full_capacity_entity?this._getNumber(f.full_capacity_entity):null,cellDelta:f.cell_delta_entity?this._getNumber(f.cell_delta_entity):null,cells:v,onBmsClick:e=>this._handleEntityClick(e)}):""}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${!1!==this._config.show_controls&&x?function(e){const{controlsConfig:t,expanded:i,onToggleExpand:r,chargeSource:a,chargeSourceOptions:o,outputPriority:n,outputPriorityOptions:s,maxChargeCurrent:l,bulkVoltage:c,floatVoltage:d,isEqualization:p,onSelectOption:h,onSetNumber:g,onToggleSwitch:_}=e;return W`
    <div class="controls-card-section ${i?"expanded":""}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${r}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>Инвертор: Управление и автоматизации</span>
        </div>
        <div class="controls-header-right">
          <span class="controls-quick-summary">
            ${n||"SBU"} • ${l?`${l}A`:"15A"}
          </span>
          <ha-icon
            class="chevron-icon ${i?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${i?W`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority (SNU / Only Solar) -->
                ${t.charge_source_entity?W`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>Источник заряда</label>
                        </div>
                        <div class="pill-selector">
                          ${(o.length>0?o:["Solar First","Solar and Utility","Only Solar"]).map(e=>W`
                              <button
                                type="button"
                                class="pill-btn ${a===e?"active":""}"
                                @click=${()=>h(t.charge_source_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}

                <!-- Select 2: Output Source Priority (SUB, SBU, USB) -->
                ${t.output_priority_entity?W`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:power-plug-outline"></ha-icon>
                          <label>Приоритет питания дома</label>
                        </div>
                        <div class="pill-selector">
                          ${(s.length>0?s:["SUB","SBU","USB"]).map(e=>W`
                              <button
                                type="button"
                                class="pill-btn ${n===e?"active":""}"
                                @click=${()=>h(t.output_priority_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- Slider: Max AC Charging Current (2 to 30 A) -->
              ${t.max_charge_current_entity?W`
                    <div class="control-box slider-box">
                      <div class="control-box-header">
                        <div class="control-label-wrap">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <label>Макс. ток сетевого заряда</label>
                        </div>
                        <span class="control-live-val">${l??15} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">2A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="2"
                          max="30"
                          step="1"
                          .value=${String(l??15)}
                          @change=${e=>{const i=parseFloat(e.target.value);g(t.max_charge_current_entity,i)}}
                        />
                        <span class="slider-boundary">30A</span>
                      </div>
                    </div>
                  `:""}

              <!-- Dual Voltage Inputs: Bulk & Float -->
              <div class="controls-grid-2">
                <!-- Bulk Voltage -->
                ${t.bulk_voltage_entity?W`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-up-bold-box-outline"></ha-icon>
                          <label>Напряжение Bulk</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((c??28.2)-.1).toFixed(1));g(t.bulk_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${c?.toFixed(1)??"28.2"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((c??28.2)+.1).toFixed(1));g(t.bulk_voltage_entity,e)}}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `:""}

                <!-- Float Voltage -->
                ${t.float_voltage_entity?W`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-down-bold-box-outline"></ha-icon>
                          <label>Напряжение Float</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((d??27)-.1).toFixed(1));g(t.float_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${d?.toFixed(1)??"27.0"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((d??27)+.1).toFixed(1));g(t.float_voltage_entity,e)}}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- DANGER ZONE: Equalization Switch -->
              ${t.equalization_entity?W`
                    <div class="danger-switch-row ${p?"danger-active":""}">
                      <div class="danger-info">
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>Режим Equalization (Выравнивание)</span>
                        </div>
                        <span class="danger-desc">
                          ⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${p?"switch-on":"switch-off"}"
                        @click=${()=>{(p||confirm("ВНИМАНИЕ!\nРежим выравнивания (Equalization) категорически не рекомендуется для LiFePO4 аккумуляторов (Redodo) и может привести к повреждению ячеек!\n\nВы действительно уверены, что хотите включить?"))&&_(t.equalization_entity,p)}}
                      >
                        ${p?"ON":"OFF"}
                      </button>
                    </div>
                  `:""}
            </div>
          `:""}
    </div>
  `}({controlsConfig:x,hass:this._hass,expanded:this._controlsExpanded,onToggleExpand:()=>{this._controlsExpanded=!this._controlsExpanded},chargeSource:x.charge_source_entity?this._getState(x.charge_source_entity):void 0,chargeSourceOptions:this._getOptions(x.charge_source_entity),outputPriority:x.output_priority_entity?this._getState(x.output_priority_entity):void 0,outputPriorityOptions:this._getOptions(x.output_priority_entity),maxChargeCurrent:x.max_charge_current_entity?this._getNumber(x.max_charge_current_entity):void 0,bulkVoltage:x.bulk_voltage_entity?this._getNumber(x.bulk_voltage_entity):void 0,floatVoltage:x.float_voltage_entity?this._getNumber(x.float_voltage_entity):void 0,isEqualization:!!x.equalization_entity&&"on"===this._getState(x.equalization_entity),onSelectOption:(e,t)=>this._handleSelectOption(e,t),onSetNumber:(e,t)=>this._handleSetNumber(e,t),onToggleSwitch:(e,t)=>this._handleToggleSwitch(e,t)}):""}

        <!-- 7. Daily Energy Statistics (Today's Production & Consumption) -->
        ${!1!==this._config.show_energy&&$?Pe({dailyConfig:$,loadEnergy:y,gridImportEnergy:u,batteryChargeEnergy:m,batteryDischargeEnergy:b,onEnergyClick:e=>this._handleEntityClick(e)}):""}
      </ha-card>
    `}};e([ue()],Te.prototype,"_config",void 0),e([ue()],Te.prototype,"_hass",void 0),e([ue()],Te.prototype,"_controlsExpanded",void 0),Te=e([pe(ye)],Te),window.customCards=window.customCards||[],window.customCards.push({type:ye,name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo",preview:!0,documentationURL:"https://github.com/custom-cards/aninerel-power-card"});const Be={en:{common:{version:"Version",name:"Aninerel Power Card",description:"Ultimate card for Aninerel ANL 4200T inverter + Redodo BMS"},mode:{battery:"Battery",mains:"Mains",bypass:"Bypass",line:"Line",grid:"Grid"},nodes:{solar:"Solar",battery:"Battery",inverter:"Inverter",home:"Home",grid:"Grid"},flow:{charge:"Charge",discharge:"Discharge",standby:"Standby",import:"Import",export:"Export"},params:{battery:"Battery DC",grid:"Grid AC",self_sufficiency:"Self-Sufficiency",normal:"Normal",deviated:"Deviated",sag:"Low (Sag)",surge:"High (Surge)"},bms:{title:"BMS Redodo LiFePO4",temp:"Temp",cycles:"Cycles",capacity:"Capacity",balanced:"Balanced",drift:"Normal Drift",imbalance:"Imbalance Alert"},controls:{title:"Inverter: Controls & Automations",charge_source:"Charge Source Priority",output_priority:"Home Output Priority",max_charge_current:"Max AC Charging Current",bulk_voltage:"Bulk Voltage",float_voltage:"Float Voltage",equalization:"Equalization Mode",equalization_warning:"⚠️ For LiFePO4 MUST ALWAYS BE OFF to prevent cell damage!"},energy:{title:"Daily Energy Balance",total:"Total",load:"Home Consumption",grid_import:"Grid Import",bat_charge:"Battery Charge",bat_discharge:"Battery Discharge"},editor:{title:"Card Title",entities_group:"⚡ Real-time Power Entities (Required)",params_group:"📊 Electrical Parameters & Telemetry",bms_group:"🔋 BMS Redodo LiFePO4 Telemetry",controls_group:"🎛️ Inverter Controls & Settings",safety_group:"🛡️ Safety & Diagnostics",energy_group:"📈 Daily Energy Counters",display_group:"🎨 Layout & Visualization Toggles"}},ru:{common:{version:"Версия",name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo"},mode:{battery:"Батарея",mains:"Сеть",bypass:"Байпас",line:"Сеть",grid:"Сеть"},nodes:{solar:"Солнце",battery:"АКБ",inverter:"Инвертор",home:"Дом",grid:"Сеть"},flow:{charge:"Заряд",discharge:"Разряд",standby:"Ожидание",import:"Импорт",export:"Экспорт"},params:{battery:"Батарея DC",grid:"Сеть AC",self_sufficiency:"Автономность",normal:"Норма",deviated:"Отклонение",sag:"Просадка",surge:"Перенапряжение"},bms:{title:"BMS Redodo LiFePO4",temp:"Темп.",cycles:"Циклы",capacity:"Емкость",balanced:"Сбалансировано",drift:"Естественный дрейф",imbalance:"Алерт разбаланса"},controls:{title:"Инвертор: Управление и автоматизации",charge_source:"Источник заряда",output_priority:"Приоритет питания дома",max_charge_current:"Макс. ток сетевого заряда",bulk_voltage:"Напряжение Bulk",float_voltage:"Напряжение Float",equalization:"Режим Equalization (Выравнивание)",equalization_warning:"⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!"},energy:{title:"Суточный баланс энергии",total:"Итого",load:"Потребление дома",grid_import:"Импорт из сети",bat_charge:"Закачано в АКБ",bat_discharge:"Отдано батареей"},editor:{title:"Заголовок карточки",entities_group:"⚡ Мощности реального времени (Обязательно)",params_group:"📊 Электрические параметры и телеметрия",bms_group:"🔋 Телеметрия BMS Redodo LiFePO4",controls_group:"🎛️ Управление инвертором и настройки",safety_group:"🛡️ Безопасность и диагностика сбоев",energy_group:"📈 Суточные счетчики электроэнергии",display_group:"🎨 Настройки отображения и видимости секций"}}};function Re(e,t,i,r){const a=(t?.locale?.language||t?.language||navigator.language||"ru").toLowerCase().split("-")[0],o=Be[a]?a:"ru";let n;try{n=e.split(".").reduce((e,t)=>e?.[t],Be[o])}catch(e){n=void 0}if(void 0===n)try{n=e.split(".").reduce((e,t)=>e?.[t],Be.ru)}catch(e){n=void 0}if(void 0===n)try{n=e.split(".").reduce((e,t)=>e?.[t],Be.en)}catch(e){n=void 0}return void 0!==n&&"string"==typeof n||(n=e),n}let Fe=class extends ce{setConfig(e){this._config=e}_computeLabel(e){return e.label?e.label:Re(`editor.${e.name}`,this.hass)||e.name}_valueChanged(e){const t=e.detail.value,i=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_getSchema(){return[{name:"title",label:Re("editor.title",this.hass),selector:{text:{}}},{name:"entities",type:"expandable",title:Re("editor.entities_group",this.hass),schema:[{name:"solar_power",label:"Солнечная генерация (PV Power)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"battery_power",label:"Мощность батареи (+заряд / -разряд)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"grid_power",label:"Сетевая мощность (Grid Power)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"load_power",label:"Потребление дома (Load Power)",required:!0,selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Re("editor.params_group",this.hass),schema:[{name:"battery_voltage_entity",label:"Напряжение АКБ (Battery Voltage)",selector:{entity:{domain:"sensor"}}},{name:"battery_current_entity",label:"Ток АКБ (Battery Current)",selector:{entity:{domain:"sensor"}}},{name:"grid_voltage_entity",label:"Напряжение сети (Grid Voltage)",selector:{entity:{domain:"sensor"}}},{name:"operating_mode_entity",label:"Режим работы инвертора (Operating Mode)",selector:{entity:{domain:"sensor"}}},{name:"inverter_temperature_entity",label:"Температура инвертора (Temperature °C)",selector:{entity:{domain:"sensor"}}},{name:"charging_active_entity",label:"Флаг зарядки (Charging Active)",selector:{entity:{domain:"binary_sensor"}}}]},{name:"bms",type:"expandable",title:Re("editor.bms_group",this.hass),schema:[{name:"soc_entity",label:"Уровень заряда АКБ (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"voltage_entity",label:"Напряжение батареи по BMS",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"Температура ячеек BMS (°C)",selector:{entity:{domain:"sensor"}}},{name:"cell_delta_entity",label:"Разбаланс ячеек (Cell Delta mV)",selector:{entity:{domain:"sensor"}}},{name:"cycle_count_entity",label:"Счетчик циклов АКБ",selector:{entity:{domain:"sensor"}}},{name:"remaining_capacity_entity",label:"Остаточная емкость (Ah)",selector:{entity:{domain:"sensor"}}},{name:"cell_count",label:"Количество ячеек (для 24В = 8)",selector:{number:{min:4,max:16,step:1,mode:"box"}}},{name:"cell_voltage_prefix",label:"Префикс сенсоров ячеек (напр. sensor.redodo_battery_cell_voltage_)",selector:{text:{}}}]},{name:"controls",type:"expandable",title:Re("editor.controls_group",this.hass),schema:[{name:"charge_source_entity",label:"Приоритет источника заряда (Select)",selector:{entity:{domain:"select"}}},{name:"output_priority_entity",label:"Приоритет выхода потребителей (Select)",selector:{entity:{domain:"select"}}},{name:"max_charge_current_entity",label:"Макс. ток сетевого заряда (Number)",selector:{entity:{domain:"number"}}},{name:"bulk_voltage_entity",label:"Порог напряжения Bulk (Number)",selector:{entity:{domain:"number"}}},{name:"float_voltage_entity",label:"Порог напряжения Float (Number)",selector:{entity:{domain:"number"}}},{name:"equalization_entity",label:"Режим Equalization (Switch)",selector:{entity:{domain:"switch"}}}]},{name:"safety",type:"expandable",title:Re("editor.safety_group",this.hass),schema:[{name:"fault_active_entity",label:"Флаг аварии (Fault Active)",selector:{entity:{domain:"binary_sensor"}}},{name:"fault_code_entity",label:"Код ошибки (Fault Code)",selector:{entity:{domain:"sensor"}}},{name:"warnings_active_entity",label:"Флаг предупреждения (Warnings Active)",selector:{entity:{domain:"binary_sensor"}}},{name:"warning_code_entity",label:"Код предупреждения (Warning Code)",selector:{entity:{domain:"sensor"}}}]},{name:"daily_energy",type:"expandable",title:Re("editor.energy_group",this.hass),schema:[{name:"load_energy_entity",label:"Суточное потребление дома (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_import_entity",label:"Суточный импорт из сети (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_charge_entity",label:"Суточный заряд АКБ (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_entity",label:"Суточный разряд АКБ (kWh)",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Re("editor.display_group",this.hass),schema:[{name:"max_power",label:"Номинальная мощность шкалы (Вт)",selector:{number:{min:1e3,max:2e4,step:200,mode:"box"}}},{name:"use_log_flow_model",label:"Логарифмическая модель скорости анимации потоков",selector:{boolean:{}}},{name:"show_header",label:"Отображать верхнюю шапку со статусами",selector:{boolean:{}}},{name:"show_flow",label:"Отображать анимацию потоков энергии",selector:{boolean:{}}},{name:"show_params",label:"Отображать электрические параметры",selector:{boolean:{}}},{name:"show_bms",label:"Отображать секцию BMS Redodo",selector:{boolean:{}}},{name:"show_controls",label:"Отображать блок управления инвертором",selector:{boolean:{}}},{name:"show_energy",label:"Отображать суточные счетчики энергии",selector:{boolean:{}}},{name:"show_alerts",label:"Отображать предупреждения и аварии",selector:{boolean:{}}}]}]}static{this.styles=n`
    ha-form {
      display: block;
      padding: 12px 0;
    }
  `}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${e=>this._computeLabel(e)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W``}};e([_e({attribute:!1})],Fe.prototype,"hass",void 0),e([ue()],Fe.prototype,"_config",void 0),Fe=e([pe("aninerel-power-card-editor")],Fe);var Le=Object.freeze({__proto__:null,get AninerelPowerCardEditor(){return Fe}});export{Te as AninerelPowerCard};
