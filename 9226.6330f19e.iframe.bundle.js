"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[9226],{"./packages/components/src/context/constants.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{_3:function(){return CONNECTED_NAMESPACE},cT:function(){return COMPONENT_NAMESPACE},rE:function(){return CONNECT_STATIC_NAMESPACE}});const COMPONENT_NAMESPACE="data-wp-component",CONNECTED_NAMESPACE="data-wp-c16t",CONNECT_STATIC_NAMESPACE="__contextSystemKey__"},"./packages/components/src/context/context-connect.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{H:function(){return hasConnectNamespace},Iq:function(){return contextConnect},Kc:function(){return contextConnectWithoutRef}});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_warning__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/warning/build-module/index.js"),_constants__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/context/constants.js"),_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/context/get-styled-class-name-from-key.ts");function contextConnect(Component,namespace){return _contextConnect(Component,namespace,{forwardsRef:!0})}function contextConnectWithoutRef(Component,namespace){return _contextConnect(Component,namespace)}function _contextConnect(Component,namespace,options){const WrappedComponent=options?.forwardsRef?(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Component):Component;void 0===namespace&&"undefined"!=typeof SCRIPT_DEBUG&&!0===SCRIPT_DEBUG&&(0,_wordpress_warning__WEBPACK_IMPORTED_MODULE_1__.Z)("contextConnect: Please provide a namespace");let mergedNamespace=WrappedComponent[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]||[namespace];return Array.isArray(namespace)&&(mergedNamespace=[...mergedNamespace,...namespace]),"string"==typeof namespace&&(mergedNamespace=[...mergedNamespace,namespace]),Object.assign(WrappedComponent,{[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]:[...new Set(mergedNamespace)],displayName:namespace,selector:`.${(0,_get_styled_class_name_from_key__WEBPACK_IMPORTED_MODULE_3__.l)(namespace)}`})}function getConnectNamespace(Component){if(!Component)return[];let namespaces=[];return Component[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]&&(namespaces=Component[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]),Component.type&&Component.type[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]&&(namespaces=Component.type[_constants__WEBPACK_IMPORTED_MODULE_2__.rE]),namespaces}function hasConnectNamespace(Component,match){return!!Component&&("string"==typeof match?getConnectNamespace(Component).includes(match):!!Array.isArray(match)&&match.some((result=>getConnectNamespace(Component).includes(result))))}},"./packages/components/src/context/context-system-provider.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{G8:function(){return ContextSystemProvider},eb:function(){return useComponentsContext}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),deepmerge__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/deepmerge/dist/cjs.js"),deepmerge__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_1__),fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/fast-deep-equal/es6/index.js"),fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_2__),is_plain_object__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/is-plain-object/dist/is-plain-object.mjs"),_wordpress_warning__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/warning/build-module/index.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/utils/hooks/use-update-effect.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ComponentsContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({}),useComponentsContext=()=>(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ComponentsContext);const BaseContextSystemProvider=({children:children,value:value})=>{const contextValue=function useContextSystemBridge({value:value}){const parentContext=useComponentsContext(),valueRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);return(0,_utils__WEBPACK_IMPORTED_MODULE_4__.Z)((()=>{fast_deep_equal_es6__WEBPACK_IMPORTED_MODULE_2___default()(valueRef.current,value)&&valueRef.current!==value&&"undefined"!=typeof SCRIPT_DEBUG&&!0===SCRIPT_DEBUG&&(0,_wordpress_warning__WEBPACK_IMPORTED_MODULE_5__.Z)(`Please memoize your context: ${JSON.stringify(value)}`)}),[value]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>deepmerge__WEBPACK_IMPORTED_MODULE_1___default()(null!=parentContext?parentContext:{},null!=value?value:{},{isMergeableObject:is_plain_object__WEBPACK_IMPORTED_MODULE_6__.P})),[parentContext,value])}({value:value});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(ComponentsContext.Provider,{value:contextValue,children:children})};BaseContextSystemProvider.displayName="BaseContextSystemProvider";const ContextSystemProvider=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(BaseContextSystemProvider);BaseContextSystemProvider.__docgenInfo={description:"A Provider component that can modify props for connected components within\nthe Context system.\n\n@example\n```jsx\n<ContextSystemProvider value={{ Button: { size: 'small' }}}>\n  <Button>...</Button>\n</ContextSystemProvider>\n```\n\n@template {Record<string, any>} T\n@param {Object}                    options\n@param {import('react').ReactNode} options.children Children to render.\n@param {T}                         options.value    Props to render into connected components.\n@return {JSX.Element} A Provider wrapped component.",methods:[],displayName:"BaseContextSystemProvider"}},"./packages/components/src/context/get-styled-class-name-from-key.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{l:function(){return getStyledClassNameFromKey}});var change_case__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/param-case/dist.es2015/index.js");const getStyledClassNameFromKey=(0,__webpack_require__("./node_modules/memize/dist/index.js").Z)((function getStyledClassName(namespace){return`components-${(0,change_case__WEBPACK_IMPORTED_MODULE_0__.o)(namespace)}`}))},"./packages/components/src/context/use-context-system.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{y:function(){return useContextSystem}});var build_module=__webpack_require__("./packages/warning/build-module/index.js"),context_system_provider=__webpack_require__("./packages/components/src/context/context-system-provider.js"),constants=__webpack_require__("./packages/components/src/context/constants.js");var get_styled_class_name_from_key=__webpack_require__("./packages/components/src/context/get-styled-class-name-from-key.ts"),use_cx=__webpack_require__("./packages/components/src/utils/hooks/use-cx.ts");function useContextSystem(props,namespace){const contextSystemProps=(0,context_system_provider.eb)();void 0===namespace&&"undefined"!=typeof SCRIPT_DEBUG&&!0===SCRIPT_DEBUG&&(0,build_module.Z)("useContextSystem: Please provide a namespace");const contextProps=contextSystemProps?.[namespace]||{},finalComponentProps={[constants._3]:!0,...(componentName=namespace,{[constants.cT]:componentName})};var componentName;const{_overrides:overrideProps,...otherContextProps}=contextProps,initialMergedProps=Object.entries(otherContextProps).length?Object.assign({},otherContextProps,props):props,classes=(0,use_cx.I)()((0,get_styled_class_name_from_key.l)(namespace),props.className),rendered="function"==typeof initialMergedProps.renderChildren?initialMergedProps.renderChildren(initialMergedProps):initialMergedProps.children;for(const key in initialMergedProps)finalComponentProps[key]=initialMergedProps[key];for(const key in overrideProps)finalComponentProps[key]=overrideProps[key];return void 0!==rendered&&(finalComponentProps.children=rendered),finalComponentProps.className=classes,finalComponentProps}},"./packages/components/src/popover/utils.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{CK:function(){return getReferenceElement},KF:function(){return positionToPlacement},d9:function(){return placementToMotionAnimationProps},sw:function(){return computePopoverPosition}});const POSITION_TO_PLACEMENT={bottom:"bottom",top:"top","middle left":"left","middle right":"right","bottom left":"bottom-end","bottom center":"bottom","bottom right":"bottom-start","top left":"top-end","top center":"top","top right":"top-start","middle left left":"left","middle left right":"left","middle left bottom":"left-end","middle left top":"left-start","middle right left":"right","middle right right":"right","middle right bottom":"right-end","middle right top":"right-start","bottom left left":"bottom-end","bottom left right":"bottom-end","bottom left bottom":"bottom-end","bottom left top":"bottom-end","bottom center left":"bottom","bottom center right":"bottom","bottom center bottom":"bottom","bottom center top":"bottom","bottom right left":"bottom-start","bottom right right":"bottom-start","bottom right bottom":"bottom-start","bottom right top":"bottom-start","top left left":"top-end","top left right":"top-end","top left bottom":"top-end","top left top":"top-end","top center left":"top","top center right":"top","top center bottom":"top","top center top":"top","top right left":"top-start","top right right":"top-start","top right bottom":"top-start","top right top":"top-start",middle:"bottom","middle center":"bottom","middle center bottom":"bottom","middle center left":"bottom","middle center right":"bottom","middle center top":"bottom"},positionToPlacement=position=>{var _POSITION_TO_PLACEMEN;return null!==(_POSITION_TO_PLACEMEN=POSITION_TO_PLACEMENT[position])&&void 0!==_POSITION_TO_PLACEMEN?_POSITION_TO_PLACEMEN:"bottom"},PLACEMENT_TO_ANIMATION_ORIGIN={top:{originX:.5,originY:1},"top-start":{originX:0,originY:1},"top-end":{originX:1,originY:1},right:{originX:0,originY:.5},"right-start":{originX:0,originY:0},"right-end":{originX:0,originY:1},bottom:{originX:.5,originY:0},"bottom-start":{originX:0,originY:0},"bottom-end":{originX:1,originY:0},left:{originX:1,originY:.5},"left-start":{originX:1,originY:0},"left-end":{originX:1,originY:1},overlay:{originX:.5,originY:.5}},placementToMotionAnimationProps=placement=>{const translateProp=placement.startsWith("top")||placement.startsWith("bottom")?"translateY":"translateX",translateDirection=placement.startsWith("top")||placement.startsWith("left")?1:-1;return{style:PLACEMENT_TO_ANIMATION_ORIGIN[placement],initial:{opacity:0,scale:0,[translateProp]:2*translateDirection+"em"},animate:{opacity:1,scale:1,[translateProp]:0},transition:{duration:.1,ease:[0,0,.2,1]}}};const getReferenceElement=({anchor:anchor,anchorRef:anchorRef,anchorRect:anchorRect,getAnchorRect:getAnchorRect,fallbackReferenceElement:fallbackReferenceElement})=>{var _referenceElement;let referenceElement=null;return anchor?referenceElement=anchor:!function isTopBottom(anchorRef){return!!anchorRef?.top}(anchorRef)?!function isRef(anchorRef){return!!anchorRef?.current}(anchorRef)?anchorRef?referenceElement=anchorRef:anchorRect?referenceElement={getBoundingClientRect(){return anchorRect}}:getAnchorRect?referenceElement={getBoundingClientRect(){var _rect$x,_rect$y,_rect$width,_rect$height;const rect=getAnchorRect(fallbackReferenceElement);return new window.DOMRect(null!==(_rect$x=rect.x)&&void 0!==_rect$x?_rect$x:rect.left,null!==(_rect$y=rect.y)&&void 0!==_rect$y?_rect$y:rect.top,null!==(_rect$width=rect.width)&&void 0!==_rect$width?_rect$width:rect.right-rect.left,null!==(_rect$height=rect.height)&&void 0!==_rect$height?_rect$height:rect.bottom-rect.top)}}:fallbackReferenceElement&&(referenceElement=fallbackReferenceElement.parentElement):referenceElement=anchorRef.current:referenceElement={getBoundingClientRect(){const topRect=anchorRef.top.getBoundingClientRect(),bottomRect=anchorRef.bottom.getBoundingClientRect();return new window.DOMRect(topRect.x,topRect.y,topRect.width,bottomRect.bottom-topRect.top)}},null!==(_referenceElement=referenceElement)&&void 0!==_referenceElement?_referenceElement:null},computePopoverPosition=c=>null===c||Number.isNaN(c)?void 0:Math.round(c)},"./packages/components/src/shortcut/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");function Shortcut(props){const{shortcut:shortcut,className:className}=props;if(!shortcut)return null;let displayText,ariaLabel;return"string"==typeof shortcut&&(displayText=shortcut),null!==shortcut&&"object"==typeof shortcut&&(displayText=shortcut.display,ariaLabel=shortcut.ariaLabel),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{className:className,"aria-label":ariaLabel,children:displayText})}Shortcut.displayName="Shortcut",__webpack_exports__.Z=Shortcut;try{Shortcut.displayName="Shortcut",Shortcut.__docgenInfo={description:"Shortcut component is used to display keyboard shortcuts, and it can be customized with a custom display and aria label if needed.\n\n```jsx\nimport { Shortcut } from '@wordpress/components';\n\nconst MyShortcut = () => {\n\treturn (\n\t\t<Shortcut shortcut={{ display: 'Ctrl + S', ariaLabel: 'Save' }} />\n\t);\n};\n```",displayName:"Shortcut",props:{className:{defaultValue:null,description:"Classname to apply to the shortcut.",name:"className",required:!1,type:{name:"string"}},shortcut:{defaultValue:null,description:"Shortcut configuration",name:"shortcut",required:!1,type:{name:"string | { display: string; ariaLabel: string; }"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/shortcut/index.tsx#Shortcut"]={docgenInfo:Shortcut.__docgenInfo,name:"Shortcut",path:"packages/components/src/shortcut/index.tsx#Shortcut"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/tooltip/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_ariakit_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@ariakit/react-core/esm/__chunks/2QMN5E6B.js"),_ariakit_react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ariakit/react-core/esm/__chunks/FSFPRQFR.js"),_ariakit_react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@ariakit/react-core/esm/tooltip/tooltip-anchor.js"),_ariakit_react__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@ariakit/react-core/esm/tooltip/tooltip.js"),_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/compose/build-module/hooks/use-instance-id/index.js"),_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/deprecated/build-module/index.js"),_shortcut__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./packages/components/src/shortcut/index.tsx"),_popover_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/src/popover/utils.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const TooltipInternalContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({isNestedInTooltip:!1}),TOOLTIP_DELAY=700,CONTEXT_VALUE={isNestedInTooltip:!0};function UnforwardedTooltip(props,ref){const{children:children,delay:delay=TOOLTIP_DELAY,hideOnClick:hideOnClick=!0,placement:placement,position:position,shortcut:shortcut,text:text,...restProps}=props,{isNestedInTooltip:isNestedInTooltip}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(TooltipInternalContext),baseId=(0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.Z)(Tooltip,"tooltip"),describedById=text||shortcut?baseId:void 0,isOnlyChild=1===react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children);let computedPlacement;void 0!==placement?computedPlacement=placement:void 0!==position&&(computedPlacement=(0,_popover_utils__WEBPACK_IMPORTED_MODULE_3__.KF)(position),(0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_4__.Z)("`position` prop in wp.components.tooltip",{since:"6.4",alternative:"`placement` prop"})),computedPlacement=computedPlacement||"bottom";const tooltipStore=(0,_ariakit_react__WEBPACK_IMPORTED_MODULE_5__._)({placement:computedPlacement,showTimeout:delay});return isNestedInTooltip?isOnlyChild?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ariakit_react__WEBPACK_IMPORTED_MODULE_6__.u,{...restProps,render:children}):children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(TooltipInternalContext.Provider,{value:CONTEXT_VALUE,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ariakit_react__WEBPACK_IMPORTED_MODULE_7__.e,{onClick:hideOnClick?tooltipStore.hide:void 0,store:tooltipStore,render:isOnlyChild?children:void 0,ref:ref,children:isOnlyChild?void 0:children}),isOnlyChild&&(text||shortcut)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_ariakit_react__WEBPACK_IMPORTED_MODULE_8__.u,{...restProps,className:"components-tooltip",unmountOnHide:!0,gutter:4,id:describedById,overflowPadding:.5,store:tooltipStore,children:[text,shortcut&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shortcut__WEBPACK_IMPORTED_MODULE_9__.Z,{className:text?"components-tooltip__shortcut":"",shortcut:shortcut})]})]})}UnforwardedTooltip.displayName="UnforwardedTooltip";const Tooltip=(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(UnforwardedTooltip);__webpack_exports__.ZP=Tooltip;try{TOOLTIP_DELAY.displayName="TOOLTIP_DELAY",TOOLTIP_DELAY.__docgenInfo={description:"Time over anchor to wait before showing tooltip",displayName:"TOOLTIP_DELAY",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tooltip/index.tsx#TOOLTIP_DELAY"]={docgenInfo:TOOLTIP_DELAY.__docgenInfo,name:"TOOLTIP_DELAY",path:"packages/components/src/tooltip/index.tsx#TOOLTIP_DELAY"})}catch(__react_docgen_typescript_loader_error){}try{Tooltip.displayName="Tooltip",Tooltip.__docgenInfo={description:"",displayName:"Tooltip",props:{children:{defaultValue:null,description:"The anchor for the tooltip.\n\n**Note**: Accepts only one child element.",name:"children",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},hideOnClick:{defaultValue:{value:"true"},description:"Option to hide the tooltip when the anchor is clicked.",name:"hideOnClick",required:!1,type:{name:"boolean"}},delay:{defaultValue:{value:"700"},description:"The amount of time in milliseconds to wait before showing the tooltip.",name:"delay",required:!1,type:{name:"number"}},placement:{defaultValue:{value:"bottom"},description:"Where the tooltip should be positioned relative to its parent.",name:"placement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'},{value:'"left-end"'},{value:'"left-start"'},{value:'"right-end"'},{value:'"right-start"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"top-end"'},{value:'"top-start"'}]}},position:{defaultValue:{value:"bottom"},description:'_Note: this prop is deprecated. Please use the `placement` prop instead._\n\nLegacy way of specifying the tooltip\'s position relative to its parent.\n\nSpecify y- and x-axis as a space-separated string. Supports `"top"`,\n`"bottom"` y axis, and `"left"`, `"center"`, `"right"` x axis.\n@deprecated',name:"position",required:!1,type:{name:"enum",value:[{value:'"middle"'},{value:'"bottom"'},{value:'"top"'},{value:'"middle left"'},{value:'"middle center"'},{value:'"middle right"'},{value:'"bottom left"'},{value:'"bottom center"'},{value:'"bottom right"'},{value:'"top left"'},{value:'"top center"'},{value:'"top right"'},{value:'"middle left left"'},{value:'"middle left right"'},{value:'"middle left bottom"'},{value:'"middle left top"'},{value:'"middle center left"'},{value:'"middle center right"'},{value:'"middle center bottom"'},{value:'"middle center top"'},{value:'"middle right left"'},{value:'"middle right right"'},{value:'"middle right bottom"'},{value:'"middle right top"'},{value:'"bottom left left"'},{value:'"bottom left right"'},{value:'"bottom left bottom"'},{value:'"bottom left top"'},{value:'"bottom center left"'},{value:'"bottom center right"'},{value:'"bottom center bottom"'},{value:'"bottom center top"'},{value:'"bottom right left"'},{value:'"bottom right right"'},{value:'"bottom right bottom"'},{value:'"bottom right top"'},{value:'"top left left"'},{value:'"top left right"'},{value:'"top left bottom"'},{value:'"top left top"'},{value:'"top center left"'},{value:'"top center right"'},{value:'"top center bottom"'},{value:'"top center top"'},{value:'"top right left"'},{value:'"top right right"'},{value:'"top right bottom"'},{value:'"top right top"'}]}},shortcut:{defaultValue:null,description:"An option for adding accessible keyboard shortcuts.\n\nIf shortcut is a string, it is expecting the display text. If shortcut is an\nobject, it will accept the properties of `display` (string) and `ariaLabel`\n(string).",name:"shortcut",required:!1,type:{name:"string | { display: string; ariaLabel: string; }"}},text:{defaultValue:null,description:"The text shown in the tooltip when anchor element is focused or hovered.",name:"text",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tooltip/index.tsx#Tooltip"]={docgenInfo:Tooltip.__docgenInfo,name:"Tooltip",path:"packages/components/src/tooltip/index.tsx#Tooltip"})}catch(__react_docgen_typescript_loader_error){}try{tooltip.displayName="tooltip",tooltip.__docgenInfo={description:"",displayName:"tooltip",props:{children:{defaultValue:null,description:"The anchor for the tooltip.\n\n**Note**: Accepts only one child element.",name:"children",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},hideOnClick:{defaultValue:{value:"true"},description:"Option to hide the tooltip when the anchor is clicked.",name:"hideOnClick",required:!1,type:{name:"boolean"}},delay:{defaultValue:{value:"700"},description:"The amount of time in milliseconds to wait before showing the tooltip.",name:"delay",required:!1,type:{name:"number"}},placement:{defaultValue:{value:"bottom"},description:"Where the tooltip should be positioned relative to its parent.",name:"placement",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'},{value:'"left-end"'},{value:'"left-start"'},{value:'"right-end"'},{value:'"right-start"'},{value:'"bottom-end"'},{value:'"bottom-start"'},{value:'"top-end"'},{value:'"top-start"'}]}},position:{defaultValue:{value:"bottom"},description:'_Note: this prop is deprecated. Please use the `placement` prop instead._\n\nLegacy way of specifying the tooltip\'s position relative to its parent.\n\nSpecify y- and x-axis as a space-separated string. Supports `"top"`,\n`"bottom"` y axis, and `"left"`, `"center"`, `"right"` x axis.\n@deprecated',name:"position",required:!1,type:{name:"enum",value:[{value:'"middle"'},{value:'"bottom"'},{value:'"top"'},{value:'"middle left"'},{value:'"middle center"'},{value:'"middle right"'},{value:'"bottom left"'},{value:'"bottom center"'},{value:'"bottom right"'},{value:'"top left"'},{value:'"top center"'},{value:'"top right"'},{value:'"middle left left"'},{value:'"middle left right"'},{value:'"middle left bottom"'},{value:'"middle left top"'},{value:'"middle center left"'},{value:'"middle center right"'},{value:'"middle center bottom"'},{value:'"middle center top"'},{value:'"middle right left"'},{value:'"middle right right"'},{value:'"middle right bottom"'},{value:'"middle right top"'},{value:'"bottom left left"'},{value:'"bottom left right"'},{value:'"bottom left bottom"'},{value:'"bottom left top"'},{value:'"bottom center left"'},{value:'"bottom center right"'},{value:'"bottom center bottom"'},{value:'"bottom center top"'},{value:'"bottom right left"'},{value:'"bottom right right"'},{value:'"bottom right bottom"'},{value:'"bottom right top"'},{value:'"top left left"'},{value:'"top left right"'},{value:'"top left bottom"'},{value:'"top left top"'},{value:'"top center left"'},{value:'"top center right"'},{value:'"top center bottom"'},{value:'"top center top"'},{value:'"top right left"'},{value:'"top right right"'},{value:'"top right bottom"'},{value:'"top right top"'}]}},shortcut:{defaultValue:null,description:"An option for adding accessible keyboard shortcuts.\n\nIf shortcut is a string, it is expecting the display text. If shortcut is an\nobject, it will accept the properties of `display` (string) and `ariaLabel`\n(string).",name:"shortcut",required:!1,type:{name:"string | { display: string; ariaLabel: string; }"}},text:{defaultValue:null,description:"The text shown in the tooltip when anchor element is focused or hovered.",name:"text",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/tooltip/index.tsx#tooltip"]={docgenInfo:tooltip.__docgenInfo,name:"tooltip",path:"packages/components/src/tooltip/index.tsx#tooltip"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/utils/hooks/use-update-effect.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");__webpack_exports__.Z=function useUpdateEffect(effect,deps){const mounted=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1);(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(mounted.current)return effect();mounted.current=!0}),deps)}},"./packages/components/src/view/component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){const View=(0,__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js").Z)("div",{target:"e19lxcc00"})("");View.selector=".components-view",View.displayName="View",__webpack_exports__.Z=View;try{View.displayName="View",View.__docgenInfo={description:"`View` is a core component that renders everything in the library.\nIt is the principle component in the entire library.\n\n```jsx\nimport { View } from `@wordpress/components`;\n\nfunction Example() {\n\treturn (\n\t\t<View>\n\t\t\t Code is Poetry\n\t\t</View>\n\t);\n}\n```",displayName:"View",props:{as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | ComponentClass<any, any> | FunctionComponent<any> | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | ... 515 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/view/component.tsx#View"]={docgenInfo:View.__docgenInfo,name:"View",path:"packages/components/src/view/component.tsx#View"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/visually-hidden/component.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return visually_hidden_component}});__webpack_require__("./node_modules/react/index.js");var use_context_system=__webpack_require__("./packages/components/src/context/use-context-system.js"),context_connect=__webpack_require__("./packages/components/src/context/context-connect.ts");const visuallyHidden={border:0,clip:"rect(1px, 1px, 1px, 1px)",WebkitClipPath:"inset( 50% )",clipPath:"inset( 50% )",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px",wordWrap:"normal"};var component=__webpack_require__("./packages/components/src/view/component.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedVisuallyHidden(props,forwardedRef){const{style:styleProp,...contextProps}=(0,use_context_system.y)(props,"VisuallyHidden");return(0,jsx_runtime.jsx)(component.Z,{ref:forwardedRef,...contextProps,style:{...visuallyHidden,...styleProp||{}}})}UnconnectedVisuallyHidden.displayName="UnconnectedVisuallyHidden";const VisuallyHidden=(0,context_connect.Iq)(UnconnectedVisuallyHidden,"VisuallyHidden");var visually_hidden_component=VisuallyHidden;try{VisuallyHidden.displayName="VisuallyHidden",VisuallyHidden.__docgenInfo={description:"`VisuallyHidden` is a component used to render text intended to be visually\nhidden, but will show for alternate devices, for example a screen reader.\n\n```jsx\nimport { VisuallyHidden } from `@wordpress/components`;\n\nfunction Example() {\n  return (\n    <VisuallyHidden>\n      <label>Code is Poetry</label>\n    </VisuallyHidden>\n  );\n}\n```",displayName:"VisuallyHidden",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!0,type:{name:"ReactNode"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | ComponentClass<any, any> | FunctionComponent<any> | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | ... 515 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/visually-hidden/component.tsx#VisuallyHidden"]={docgenInfo:VisuallyHidden.__docgenInfo,name:"VisuallyHidden",path:"packages/components/src/visually-hidden/component.tsx#VisuallyHidden"})}catch(__react_docgen_typescript_loader_error){}},"./packages/compose/build-module/hooks/use-instance-id/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const instanceMap=new WeakMap;__webpack_exports__.Z=function useInstanceId(object,prefix,preferredId){return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{if(preferredId)return preferredId;const id=function createId(object){const instances=instanceMap.get(object)||0;return instanceMap.set(object,instances+1),instances}(object);return prefix?`${prefix}-${id}`:id}),[object,preferredId,prefix])}},"./packages/deprecated/build-module/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return deprecated}});var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/hooks/build-module/index.js");const logged=Object.create(null);function deprecated(feature,options={}){const{since:since,version:version,alternative:alternative,plugin:plugin,link:link,hint:hint}=options,message=`${feature} is deprecated${since?` since version ${since}`:""}${version?` and will be removed${plugin?` from ${plugin}`:""} in version ${version}`:""}.${alternative?` Please use ${alternative} instead.`:""}${link?` See: ${link}`:""}${hint?` Note: ${hint}`:""}`;message in logged||((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.Kw)("deprecated",feature,options,message),console.warn(message),logged[message]=!0)}}}]);