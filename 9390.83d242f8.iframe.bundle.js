/*! For license information please see 9390.83d242f8.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[9390],{"./node_modules/react-colorful/dist/index.module.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{W3:function(){return ee},W_:function(){return Ce},ef:function(){return ge},gW:function(){return J}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}function c(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r.indexOf(t=a[o])>=0||(n[t]=e[t]);return n}function s(e){var t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(e),o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((function(e){t.current&&t.current(e)}));return t.current=e,o.current}var i=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=1),e>t?t:e<r?r:e},f=function(e){return"touches"in e},v=function(e,r){var t=e.getBoundingClientRect(),o=f(r)?r.touches[0]:r;return{left:i((o.pageX-(t.left+window.pageXOffset))/t.width),top:i((o.pageY-(t.top+window.pageYOffset))/t.height)}},d=function(e){!f(e)&&e.preventDefault()},h=react__WEBPACK_IMPORTED_MODULE_0__.memo((function(n){var a=n.onMove,l=n.onKey,i=c(n,["onMove","onKey"]),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),m=s(a),g=s(l),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){var e=function(e){d(e),(f(e)?e.touches.length>0:e.buttons>0)&&h.current?m(v(h.current,e)):t(!1)},r=function(){return t(!1)};function t(t){var o=p.current,n=t?self.addEventListener:self.removeEventListener;n(o?"touchmove":"mousemove",e),n(o?"touchend":"mouseup",r)}return[function(e){var r=e.nativeEvent,o=h.current;o&&(d(r),!function(e,r){return r&&!f(e)}(r,p.current)&&o&&(p.current=f(r),o.focus(),m(v(o,r)),t(!0)))},function(e){var r=e.which||e.keyCode;r<37||r>40||(e.preventDefault(),g({left:39===r?.05:37===r?-.05:0,top:40===r?.05:38===r?-.05:0}))},t]}),[g,m]),_=b[0],C=b[1],x=b[2];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return x}),[x]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},i,{onTouchStart:_,onMouseDown:_,className:"react-colorful__interactive",ref:h,onKeyDown:C,tabIndex:0,role:"slider"}))})),m=function(e){return e.filter(Boolean).join(" ")},g=function(r){var t=r.color,o=r.left,n=r.top,a=void 0===n?.5:n,l=m(["react-colorful__pointer",r.className]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:l,style:{top:100*a+"%",left:100*o+"%"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:t}}))},p=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=Math.pow(10,r)),Math.round(t*e)/t},b={grad:.9,turn:360,rad:360/(2*Math.PI)},_=function(e){return"#"===e[0]&&(e=e.substr(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:1}:{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:1}},C=function(e,r){return void 0===r&&(r="deg"),Number(e)*(b[r]||1)},x=function(e){var r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?H({h:C(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:void 0===r[5]?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},H=function(e){var r=e.s,t=e.l;return{h:e.h,s:(r*=(t<50?t:100-t)/100)>0?2*r/(t+r)*100:0,v:t+r,a:e.a}},M=function(e){var r=e.s,t=e.v,o=e.a,n=(200-r)*t/100;return{h:p(e.h),s:p(n>0&&n<200?r*t/100/(n<=100?n:200-n)*100:0),l:p(n/2),a:p(o,2)}},N=function(e){var r=M(e);return"hsl("+r.h+", "+r.s+"%, "+r.l+"%)"},w=function(e){var r=M(e);return"hsla("+r.h+", "+r.s+"%, "+r.l+"%, "+r.a+")"},y=function(e){var r=e.h,t=e.s,o=e.v,n=e.a;r=r/360*6,t/=100,o/=100;var a=Math.floor(r),l=o*(1-t),u=o*(1-(r-a)*t),c=o*(1-(1-r+a)*t),s=a%6;return{r:p(255*[o,u,l,l,c,o][s]),g:p(255*[c,o,o,u,l,l][s]),b:p(255*[l,l,c,o,o,u][s]),a:p(n,2)}},O=function(e){var r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?z({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:void 0===r[7]?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},I=O,j=function(e){var r=e.toString(16);return r.length<2?"0"+r:r},z=function(e){var r=e.r,t=e.g,o=e.b,n=e.a,a=Math.max(r,t,o),l=a-Math.min(r,t,o),u=l?a===r?(t-o)/l:a===t?2+(o-r)/l:4+(r-t)/l:0;return{h:p(60*(u<0?u+6:u)),s:p(a?l/a*100:0),v:p(a/255*100),a:n}},K=react__WEBPACK_IMPORTED_MODULE_0__.memo((function(r){var t=r.hue,o=r.onChange,n=m(["react-colorful__hue",r.className]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:n},react__WEBPACK_IMPORTED_MODULE_0__.createElement(h,{onMove:function(e){o({h:360*e.left})},onKey:function(e){o({h:i(t+360*e.left,0,360)})},"aria-label":"Hue","aria-valuetext":p(t)},react__WEBPACK_IMPORTED_MODULE_0__.createElement(g,{className:"react-colorful__hue-pointer",left:t/360,color:N({h:t,s:100,v:100,a:1})})))})),A=react__WEBPACK_IMPORTED_MODULE_0__.memo((function(r){var t=r.hsva,o=r.onChange,n={backgroundColor:N({h:t.h,s:100,v:100,a:1})};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__saturation",style:n},react__WEBPACK_IMPORTED_MODULE_0__.createElement(h,{onMove:function(e){o({s:100*e.left,v:100-100*e.top})},onKey:function(e){o({s:i(t.s+100*e.left,0,100),v:i(t.v-100*e.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+p(t.s)+"%, Brightness "+p(t.v)+"%"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(g,{className:"react-colorful__saturation-pointer",top:1-t.v/100,left:t.s/100,color:N(t)})))})),L=function(e,r){if(e===r)return!0;for(var t in e)if(e[t]!==r[t])return!1;return!0},D=function(e,r){return e.replace(/\s/g,"")===r.replace(/\s/g,"")};function F(e,t,l){var u=s(l),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((function(){return e.toHsva(t)})),i=c[0],f=c[1],v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({color:t,hsva:i});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(!e.equal(t,v.current.color)){var r=e.toHsva(t);v.current={hsva:r,color:t},f(r)}}),[t,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var r;L(i,v.current.hsva)||e.equal(r=e.fromHsva(i),v.current.color)||(v.current={hsva:i,color:r},u(r))}),[i,e,u]);var d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){f((function(r){return Object.assign({},r,e)}))}),[]);return[i,d]}var S,P,T="undefined"!=typeof window?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect,$=function(){T((function(){if("undefined"!=typeof document&&!P){(P=document.createElement("style")).innerHTML='.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}';var e=S||__webpack_require__.nc;e&&P.setAttribute("nonce",e),document.head.appendChild(P)}}),[])},R=function(r){var t=r.className,o=r.colorModel,n=r.color,a=void 0===n?o.defaultColor:n,l=r.onChange,s=c(r,["className","colorModel","color","onChange"]);$();var i=F(o,a,l),f=i[0],v=i[1],d=m(["react-colorful",t]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},s,{className:d}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(A,{hsva:f,onChange:v}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(K,{hue:f.h,onChange:v,className:"react-colorful__last-control"}))},G={defaultColor:"000",toHsva:function(e){return z(_(e))},fromHsva:function(e){return t=(r=y(e)).g,o=r.b,"#"+j(r.r)+j(t)+j(o);var r,t,o},equal:function(e,r){return e.toLowerCase()===r.toLowerCase()||L(_(e),_(r))}},J=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(R,u({},r,{colorModel:G}))},Q=function(r){var t=r.className,o=r.hsva,n=r.onChange,a={backgroundImage:"linear-gradient(90deg, "+w(Object.assign({},o,{a:0}))+", "+w(Object.assign({},o,{a:1}))+")"},l=m(["react-colorful__alpha",t]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:l},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__alpha-gradient",style:a}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(h,{onMove:function(e){n({a:e.left})},onKey:function(e){n({a:i(o.a+e.left)})},"aria-label":"Alpha","aria-valuetext":p(100*o.a)+"%"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(g,{className:"react-colorful__alpha-pointer",left:o.a,color:w(o)})))},U=function(r){var t=r.className,o=r.colorModel,n=r.color,a=void 0===n?o.defaultColor:n,l=r.onChange,s=c(r,["className","colorModel","color","onChange"]);$();var i=F(o,a,l),f=i[0],v=i[1],d=m(["react-colorful",t]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},s,{className:d}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(A,{hsva:f,onChange:v}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(K,{hue:f.h,onChange:v}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(Q,{hsva:f,onChange:v,className:"react-colorful__last-control"}))},Z={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:x,fromHsva:w,equal:D},ee=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:Z}))},me={defaultColor:"rgba(0, 0, 0, 1)",toHsva:O,fromHsva:function(e){var r=y(e);return"rgba("+r.r+", "+r.g+", "+r.b+", "+r.a+")"},equal:D},ge=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:me}))},_e={defaultColor:"rgb(0, 0, 0)",toHsva:I,fromHsva:function(e){var r=y(e);return"rgb("+r.r+", "+r.g+", "+r.b+")"},equal:D},Ce=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(R,u({},r,{colorModel:_e}))}},"./node_modules/use-memo-one/dist/use-memo-one.esm.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Pr:function(){return useMemoOne}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function useMemoOne(getResult,inputs){var initial=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((function(){return{inputs:inputs,result:getResult()}}))[0],committed=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initial),cache=Boolean(inputs&&committed.current.inputs&&function areInputsEqual(newInputs,lastInputs){if(newInputs.length!==lastInputs.length)return!1;for(var i=0;i<newInputs.length;i++)if(newInputs[i]!==lastInputs[i])return!1;return!0}(inputs,committed.current.inputs))?committed.current:{inputs:inputs,result:getResult()};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){committed.current=cache}),[cache]),cache.result}},"./packages/compose/node_modules/clipboard/dist/clipboard.js":function(module){!function webpackUniversalModuleDefinition(root,factory){module.exports=factory()}(0,(function(){return function(){var __webpack_modules__={686:function(__unused_webpack_module,__nested_webpack_exports__,__nested_webpack_require_623__){"use strict";__nested_webpack_require_623__.d(__nested_webpack_exports__,{default:function(){return clipboard}});var tiny_emitter=__nested_webpack_require_623__(279),tiny_emitter_default=__nested_webpack_require_623__.n(tiny_emitter),listen=__nested_webpack_require_623__(370),listen_default=__nested_webpack_require_623__.n(listen),src_select=__nested_webpack_require_623__(817),select_default=__nested_webpack_require_623__.n(src_select);function command(type){try{return document.execCommand(type)}catch(err){return!1}}var actions_cut=function ClipboardActionCut(target){var selectedText=select_default()(target);return command("cut"),selectedText};var fakeCopyAction=function fakeCopyAction(value,options){var fakeElement=function createFakeElement(value){var isRTL="rtl"===document.documentElement.getAttribute("dir"),fakeElement=document.createElement("textarea");fakeElement.style.fontSize="12pt",fakeElement.style.border="0",fakeElement.style.padding="0",fakeElement.style.margin="0",fakeElement.style.position="absolute",fakeElement.style[isRTL?"right":"left"]="-9999px";var yPosition=window.pageYOffset||document.documentElement.scrollTop;return fakeElement.style.top="".concat(yPosition,"px"),fakeElement.setAttribute("readonly",""),fakeElement.value=value,fakeElement}(value);options.container.appendChild(fakeElement);var selectedText=select_default()(fakeElement);return command("copy"),fakeElement.remove(),selectedText},actions_copy=function ClipboardActionCopy(target){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body},selectedText="";return"string"==typeof target?selectedText=fakeCopyAction(target,options):target instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(null==target?void 0:target.type)?selectedText=fakeCopyAction(target.value,options):(selectedText=select_default()(target),command("copy")),selectedText};function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}var actions_default=function ClipboardActionDefault(){var options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},_options$action=options.action,action=void 0===_options$action?"copy":_options$action,container=options.container,target=options.target,text=options.text;if("copy"!==action&&"cut"!==action)throw new Error('Invalid "action" value, use either "copy" or "cut"');if(void 0!==target){if(!target||"object"!==_typeof(target)||1!==target.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===action&&target.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===action&&(target.hasAttribute("readonly")||target.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')}return text?actions_copy(text,{container:container}):target?"cut"===action?actions_cut(target):actions_copy(target,{container:container}):void 0};function clipboard_typeof(obj){return clipboard_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},clipboard_typeof(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return function _possibleConstructorReturn(self,call){if(call&&("object"===clipboard_typeof(call)||"function"==typeof call))return call;return function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self)}(this,result)}}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function getAttributeValue(suffix,element){var attribute="data-clipboard-".concat(suffix);if(element.hasAttribute(attribute))return element.getAttribute(attribute)}var Clipboard=function(_Emitter){!function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(Clipboard,_Emitter);var _super=_createSuper(Clipboard);function Clipboard(trigger,options){var _this;return function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Clipboard),(_this=_super.call(this)).resolveOptions(options),_this.listenClick(trigger),_this}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(Clipboard,[{key:"resolveOptions",value:function resolveOptions(){var options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof options.action?options.action:this.defaultAction,this.target="function"==typeof options.target?options.target:this.defaultTarget,this.text="function"==typeof options.text?options.text:this.defaultText,this.container="object"===clipboard_typeof(options.container)?options.container:document.body}},{key:"listenClick",value:function listenClick(trigger){var _this2=this;this.listener=listen_default()(trigger,"click",(function(e){return _this2.onClick(e)}))}},{key:"onClick",value:function onClick(e){var trigger=e.delegateTarget||e.currentTarget,action=this.action(trigger)||"copy",text=actions_default({action:action,container:this.container,target:this.target(trigger),text:this.text(trigger)});this.emit(text?"success":"error",{action:action,text:text,trigger:trigger,clearSelection:function clearSelection(){trigger&&trigger.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function defaultAction(trigger){return getAttributeValue("action",trigger)}},{key:"defaultTarget",value:function defaultTarget(trigger){var selector=getAttributeValue("target",trigger);if(selector)return document.querySelector(selector)}},{key:"defaultText",value:function defaultText(trigger){return getAttributeValue("text",trigger)}},{key:"destroy",value:function destroy(){this.listener.destroy()}}],[{key:"copy",value:function copy(target){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body};return actions_copy(target,options)}},{key:"cut",value:function cut(target){return actions_cut(target)}},{key:"isSupported",value:function isSupported(){var action=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],actions="string"==typeof action?[action]:action,support=!!document.queryCommandSupported;return actions.forEach((function(action){support=support&&!!document.queryCommandSupported(action)})),support}}]),Clipboard}(tiny_emitter_default()),clipboard=Clipboard},828:function(module){if("undefined"!=typeof Element&&!Element.prototype.matches){var proto=Element.prototype;proto.matches=proto.matchesSelector||proto.mozMatchesSelector||proto.msMatchesSelector||proto.oMatchesSelector||proto.webkitMatchesSelector}module.exports=function closest(element,selector){for(;element&&9!==element.nodeType;){if("function"==typeof element.matches&&element.matches(selector))return element;element=element.parentNode}}},438:function(module,__unused_webpack_exports,__nested_webpack_require_15749__){var closest=__nested_webpack_require_15749__(828);function _delegate(element,selector,type,callback,useCapture){var listenerFn=listener.apply(this,arguments);return element.addEventListener(type,listenerFn,useCapture),{destroy:function(){element.removeEventListener(type,listenerFn,useCapture)}}}function listener(element,selector,type,callback){return function(e){e.delegateTarget=closest(e.target,selector),e.delegateTarget&&callback.call(element,e)}}module.exports=function delegate(elements,selector,type,callback,useCapture){return"function"==typeof elements.addEventListener?_delegate.apply(null,arguments):"function"==typeof type?_delegate.bind(null,document).apply(null,arguments):("string"==typeof elements&&(elements=document.querySelectorAll(elements)),Array.prototype.map.call(elements,(function(element){return _delegate(element,selector,type,callback,useCapture)})))}},879:function(__unused_webpack_module,exports){exports.node=function(value){return void 0!==value&&value instanceof HTMLElement&&1===value.nodeType},exports.nodeList=function(value){var type=Object.prototype.toString.call(value);return void 0!==value&&("[object NodeList]"===type||"[object HTMLCollection]"===type)&&"length"in value&&(0===value.length||exports.node(value[0]))},exports.string=function(value){return"string"==typeof value||value instanceof String},exports.fn=function(value){return"[object Function]"===Object.prototype.toString.call(value)}},370:function(module,__unused_webpack_exports,__nested_webpack_require_19113__){var is=__nested_webpack_require_19113__(879),delegate=__nested_webpack_require_19113__(438);module.exports=function listen(target,type,callback){if(!target&&!type&&!callback)throw new Error("Missing required arguments");if(!is.string(type))throw new TypeError("Second argument must be a String");if(!is.fn(callback))throw new TypeError("Third argument must be a Function");if(is.node(target))return function listenNode(node,type,callback){return node.addEventListener(type,callback),{destroy:function(){node.removeEventListener(type,callback)}}}(target,type,callback);if(is.nodeList(target))return function listenNodeList(nodeList,type,callback){return Array.prototype.forEach.call(nodeList,(function(node){node.addEventListener(type,callback)})),{destroy:function(){Array.prototype.forEach.call(nodeList,(function(node){node.removeEventListener(type,callback)}))}}}(target,type,callback);if(is.string(target))return function listenSelector(selector,type,callback){return delegate(document.body,selector,type,callback)}(target,type,callback);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}},817:function(module){module.exports=function select(element){var selectedText;if("SELECT"===element.nodeName)element.focus(),selectedText=element.value;else if("INPUT"===element.nodeName||"TEXTAREA"===element.nodeName){var isReadOnly=element.hasAttribute("readonly");isReadOnly||element.setAttribute("readonly",""),element.select(),element.setSelectionRange(0,element.value.length),isReadOnly||element.removeAttribute("readonly"),selectedText=element.value}else{element.hasAttribute("contenteditable")&&element.focus();var selection=window.getSelection(),range=document.createRange();range.selectNodeContents(element),selection.removeAllRanges(),selection.addRange(range),selectedText=selection.toString()}return selectedText}},279:function(module){function E(){}E.prototype={on:function(name,callback,ctx){var e=this.e||(this.e={});return(e[name]||(e[name]=[])).push({fn:callback,ctx:ctx}),this},once:function(name,callback,ctx){var self=this;function listener(){self.off(name,listener),callback.apply(ctx,arguments)}return listener._=callback,this.on(name,listener,ctx)},emit:function(name){for(var data=[].slice.call(arguments,1),evtArr=((this.e||(this.e={}))[name]||[]).slice(),i=0,len=evtArr.length;i<len;i++)evtArr[i].fn.apply(evtArr[i].ctx,data);return this},off:function(name,callback){var e=this.e||(this.e={}),evts=e[name],liveEvents=[];if(evts&&callback)for(var i=0,len=evts.length;i<len;i++)evts[i].fn!==callback&&evts[i].fn._!==callback&&liveEvents.push(evts[i]);return liveEvents.length?e[name]=liveEvents:delete e[name],this}},module.exports=E,module.exports.TinyEmitter=E}},__webpack_module_cache__={};function __nested_webpack_require_24495__(moduleId){if(__webpack_module_cache__[moduleId])return __webpack_module_cache__[moduleId].exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__nested_webpack_require_24495__),module.exports}return __nested_webpack_require_24495__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __nested_webpack_require_24495__.d(getter,{a:getter}),getter},__nested_webpack_require_24495__.d=function(exports,definition){for(var key in definition)__nested_webpack_require_24495__.o(definition,key)&&!__nested_webpack_require_24495__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__nested_webpack_require_24495__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)},__nested_webpack_require_24495__(686)}().default}))}}]);