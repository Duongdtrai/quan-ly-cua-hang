"use strict";(self.webpackChunkquan_ly_cua_hang=self.webpackChunkquan_ly_cua_hang||[]).push([[308],{3083:(e,a,l)=>{l.d(a,{w:()=>_});var t=l(942),n=function(e){return t.createElement("svg",Object.assign({viewBox:"0 0 20 20"},e),t.createElement("path",{d:"M16.5 6.26a.75.75 0 0 1-1.5 0v-.51a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0-.75.75v.51a.75.75 0 0 1-1.5 0v-.51a2.25 2.25 0 0 1 2.25-2.25h8.5a2.25 2.25 0 0 1 2.25 2.25v.51Z"}),t.createElement("path",{d:"M10.75 16.01a.75.75 0 0 1-1.5 0v-6.69l-1.72 1.72a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-1.72-1.72v6.69Z"}))};n.displayName="UploadIcon";var r=l(7194),o=l(7865),i=l(6496);function s(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").toLowerCase();return e.charAt(0).toUpperCase()+e.slice(1)}var c=l(7227),d=l(3497),u=l(7152),p=l(5911);const m=["dragover","dragenter","drop"];function g(e,a){return"application/x-moz-file"===e.type||function(e,a){if(e&&a){const l=e.name||"",t=e.type||"",n=t.replace(/\/.*$/,"");return(Array.isArray(a)?a:a.split(",")).some((e=>{const a=e.trim();return a.startsWith(".")?l.toLowerCase().endsWith(a.toLowerCase()):a.endsWith("/*")?n===a.replace(/\/.*$/,""):t===a}))}return!0}(e,a)}function f(e){if(function(e){return m.indexOf(e.type)>0}(e)&&e.dataTransfer){const a=e.dataTransfer;if(a.files&&a.files.length)return Array.from(a.files);if(a.items&&a.items.length)return Array.from(a.items)}else if(function(e){return Object.prototype.hasOwnProperty.call(e,"target")}(e)&&e.target.files)return Array.from(e.target.files);return[]}const b=!0;function v(e){return e?"allowMultiple":"single"}const h=(0,t.createContext)({disabled:!1,focused:!1,size:"extraLarge",type:"file",measuring:!1,allowMultiple:b});var D={DropZone:"Polaris-DropZone",focused:"Polaris-DropZone--focused",noOutline:"Polaris-DropZone--noOutline",hasOutline:"Polaris-DropZone--hasOutline",isDisabled:"Polaris-DropZone--isDisabled",isDragging:"Polaris-DropZone--isDragging",sizeLarge:"Polaris-DropZone--sizeLarge",sizeMedium:"Polaris-DropZone--sizeMedium",sizeSmall:"Polaris-DropZone--sizeSmall",measuring:"Polaris-DropZone--measuring",Container:"Polaris-DropZone__Container",Overlay:"Polaris-DropZone__Overlay",hasError:"Polaris-DropZone--hasError"},E={FileUpload:"Polaris-DropZone-FileUpload",large:"Polaris-DropZone-FileUpload--large",small:"Polaris-DropZone-FileUpload--small",Action:"Polaris-DropZone-FileUpload__Action",disabled:"Polaris-DropZone-FileUpload--disabled",ActionTitle:"Polaris-DropZone-FileUpload__ActionTitle","ActionTitle-disabled":"Polaris-DropZone-FileUpload__ActionTitle--disabled","ActionTitle-focused":"Polaris-DropZone-FileUpload__ActionTitle--focused",UploadIcon:"Polaris-DropZone-FileUpload__UploadIcon"},y=l(2457),P=l(9322),Z=l(8597),C=l(898);var k=l(8439);const _=function(e){let{dropOnPage:a,label:l,labelAction:m,labelHidden:E,children:_,disabled:B=!1,outline:A=!0,accept:M,active:O,overlay:S=!0,allowMultiple:w=b,overlayText:x,errorOverlayText:T,id:I,type:U="file",onClick:N,error:R,openFileDialog:z,variableHeight:L,onFileDialogClose:j,customValidator:W,onDrop:H,onDropAccepted:q,onDropRejected:$,onDragEnter:G,onDragOver:V,onDragLeave:J}=e;const K=(0,t.useRef)(null),Q=(0,t.useRef)(null),X=(0,t.useRef)([]),Y=(0,t.useCallback)((0,o.s)((()=>{if(!K.current)return;if(L)return void de(!1);let e="large";const a=K.current.getBoundingClientRect().width;a<100?e="small":a<160&&(e="medium"),se(e),ce&&de(!1)}),50,{trailing:!0}),[]),[ee,ae]=(0,t.useState)(!1),[le,te]=(0,t.useState)(!1),{value:ne,setTrue:re,setFalse:oe}=(0,u.e)(!1),[ie,se]=(0,t.useState)("large"),[ce,de]=(0,t.useState)(!0),ue=(0,y.s)(),pe=(0,t.useCallback)((e=>{const a=[],l=[];return Array.from(e).forEach((e=>{!g(e,M)||W&&!W(e)?l.push(e):a.push(e)})),w||(a.splice(1,a.length),l.push(...a.slice(1))),{files:e,acceptedFiles:a,rejectedFiles:l}}),[M,w,W]),me=(0,t.useCallback)((e=>{if(F(e),B)return;const a=f(e),{files:l,acceptedFiles:t,rejectedFiles:n}=pe(a);X.current=[],ae(!1),te(n.length>0),H&&H(l,t,n),q&&t.length&&q(t),$&&n.length&&$(n),e.target&&"value"in e.target&&(e.target.value="")}),[B,pe,H,q,$]),ge=(0,t.useCallback)((e=>{if(F(e),B)return;const a=f(e);if(e.target&&!X.current.includes(e.target)&&X.current.push(e.target),ee)return;const{rejectedFiles:l}=pe(a);ae(!0),te(l.length>0),G&&G()}),[B,ee,pe,G]),fe=(0,t.useCallback)((e=>{F(e),B||V&&V()}),[B,V]),be=(0,t.useCallback)((e=>{e.preventDefault(),B||(X.current=X.current.filter((l=>{const t=a&&!c.S?document:K.current;return l!==e.target&&t&&t.contains(l)})),X.current.length>0||(ae(!1),te(!1),J&&J()))}),[a,B,J]),ve=a&&!c.S?document:K.current;(0,p.M)("drop",me,ve),(0,p.M)("dragover",fe,ve),(0,p.M)("dragenter",ge,ve),(0,p.M)("dragleave",be,ve),(0,p.M)("resize",Y,c.S?null:window),(0,d.B)((()=>{Y()}));const he=(0,t.useId)(),De=null!==I&&void 0!==I?I:he,Ee=s(U),ye=v(w),Pe=void 0===x?ue.translate("Polaris.DropZone.".concat(ye,".overlayText").concat(Ee)):x,Ze=void 0===T?ue.translate("Polaris.DropZone.errorOverlayText".concat(Ee)):T,Ce=l||ue.translate("Polaris.DropZone.".concat(ye,".label").concat(Ee)),ke=!l||E,_e=(0,i.xW)(D.DropZone,A&&D.hasOutline,!A&&D.noOutline,ne&&D.focused,(O||ee)&&D.isDragging,B&&D.isDisabled,(le||R)&&D.hasError,!L&&D[(0,i.Ny)("size",ie)],ce&&D.measuring),Fe=(O||ee)&&!le&&!R&&S&&Se(n,Pe),Be=ee&&(le||R)&&Se(r.S,Ze,"critical"),Ae=(0,t.useMemo)((()=>({disabled:B,focused:ne,size:ie,type:U||"file",measuring:ce,allowMultiple:w})),[B,ne,ce,ie,U,w]),Me=(0,t.useCallback)((()=>{Q.current&&Q.current.click()}),[Q]),Oe=(0,t.useCallback)((()=>{Me(),null===j||void 0===j||j()}),[Me,j]);function Se(e,a,l){return t.createElement("div",{className:D.Overlay},t.createElement(Z.a,{gap:"200",inlineAlign:"center"},"small"===ie&&t.createElement(P.I,{source:e,tone:l}),("medium"===ie||"large"===ie)&&t.createElement(C.E,{variant:"bodySm",as:"p",fontWeight:"bold"},a)))}return(0,t.useEffect)((()=>{z&&Oe()}),[z,Oe]),t.createElement(h.Provider,{value:Ae},t.createElement(k.ks,{id:De,label:Ce,action:m,labelHidden:ke},t.createElement("div",{ref:K,className:_e,"aria-disabled":B,onClick:function(e){if(!B)return N?N(e):Me()},onDragStart:F},Fe,Be,t.createElement(C.E,{variant:"bodySm",as:"span",visuallyHidden:!0},t.createElement("input",{id:De,accept:M,disabled:B,multiple:w,onChange:me,onFocus:re,onBlur:oe,type:"file",ref:Q,autoComplete:"off"})),t.createElement("div",{className:D.Container},_))))};function F(e){e.preventDefault(),e.stopPropagation()}_.FileUpload=function(e){const a=(0,y.s)(),{size:l,measuring:r,type:o,disabled:c,allowMultiple:d}=(0,t.useContext)(h),u=s(o),p=v(d),{actionTitle:m=a.translate("Polaris.DropZone.".concat(p,".actionTitle").concat(u)),actionHint:g}=e,f=(0,i.xW)(E.Action,c&&E.disabled),b=t.createElement("div",{className:f},m),D=(0,i.xW)(E.FileUpload,r&&E.measuring,"large"===l&&E.large,"small"===l&&E.small),k=g&&t.createElement(C.E,{variant:"bodySm",as:"p",tone:"subdued"},g);let _;switch(l){case"large":case"medium":_=t.createElement(Z.a,{inlineAlign:"center",gap:"200"},b,k);break;case"small":_=t.createElement("div",{className:(0,i.xW)(E.UploadIcon,c&&E.disabled)},t.createElement(P.I,{source:n}))}return t.createElement("div",{className:D},_)}},4140:(e,a,l)=>{l.d(a,{a:()=>i});var t=l(942),n=l(6496),r={RadioButton:"Polaris-RadioButton",Input:"Polaris-RadioButton__Input",Backdrop:"Polaris-RadioButton__Backdrop",ChoiceLabel:"Polaris-RadioButton__ChoiceLabel",toneMagic:"Polaris-RadioButton--toneMagic"},o=l(1167);function i(e){let{ariaDescribedBy:a,label:l,labelHidden:i,helpText:s,checked:c,disabled:d,onChange:u,onFocus:p,onBlur:m,id:g,name:f,value:b,fill:v,bleed:h,bleedBlockStart:D,bleedBlockEnd:E,bleedInlineStart:y,bleedInlineEnd:P,tone:Z}=e;const C=(0,t.useId)(),k=null!==g&&void 0!==g?g:C,_=f||k,F=(0,t.useRef)(null);const B=[];s&&B.push((0,o.y)(k)),a&&B.push(a);const A=B.length?B.join(" "):void 0,M=(0,n.xW)(r.Input,Z&&r[(0,n.Ny)("tone",Z)]),O={helpText:s,bleed:h,bleedBlockStart:D,bleedBlockEnd:E,bleedInlineStart:y,bleedInlineEnd:P};return t.createElement(o.G,Object.assign({label:l,labelHidden:i,disabled:d,id:k,labelClassName:r.ChoiceLabel,fill:v},O,c?{tone:Z}:{}),t.createElement("span",{className:r.RadioButton},t.createElement("input",{id:k,name:_,value:b,type:"radio",checked:c,disabled:d,className:M,onChange:function(e){let{currentTarget:a}=e;u&&u(a.checked,k)},onFocus:p,onBlur:()=>{m&&m()},"aria-describedby":A,ref:F}),t.createElement("span",{className:r.Backdrop})))}},3175:(e,a,l)=>{l.d(a,{S:()=>n});var t=l(942),n=function(e){return t.createElement("svg",Object.assign({viewBox:"0 0 20 20"},e),t.createElement("path",{d:"M12.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"}),t.createElement("path",{fillRule:"evenodd",d:"M9.018 3.5h1.964c.813 0 1.469 0 2 .043.546.045 1.026.14 1.47.366a3.75 3.75 0 0 1 1.64 1.639c.226.444.32.924.365 1.47.043.531.043 1.187.043 2v1.964c0 .813 0 1.469-.043 2-.045.546-.14 1.026-.366 1.47a3.75 3.75 0 0 1-1.639 1.64c-.444.226-.924.32-1.47.365-.531.043-1.187.043-2 .043h-1.964c-.813 0-1.469 0-2-.043-.546-.045-1.026-.14-1.47-.366a3.75 3.75 0 0 1-1.64-1.639c-.226-.444-.32-.924-.365-1.47-.043-.531-.043-1.187-.043-2v-1.964c0-.813 0-1.469.043-2 .045-.546.14-1.026.366-1.47a3.75 3.75 0 0 1 1.639-1.64c.444-.226.924-.32 1.47-.365.531-.043 1.187-.043 2-.043Zm-1.877 1.538c-.454.037-.715.107-.912.207a2.25 2.25 0 0 0-.984.984c-.1.197-.17.458-.207.912-.037.462-.038 1.057-.038 1.909v1.428l.723-.867a1.75 1.75 0 0 1 2.582-.117l2.695 2.695 1.18-1.18a1.75 1.75 0 0 1 2.604.145l.216.27v-2.374c0-.852 0-1.447-.038-1.91-.037-.453-.107-.714-.207-.911a2.25 2.25 0 0 0-.984-.984c-.197-.1-.458-.17-.912-.207-.462-.037-1.056-.038-1.909-.038h-1.9c-.852 0-1.447 0-1.91.038Zm-2.103 7.821a7.12 7.12 0 0 1-.006-.08.746.746 0 0 0 .044-.049l1.8-2.159a.25.25 0 0 1 .368-.016l3.226 3.225a.75.75 0 0 0 1.06 0l1.71-1.71a.25.25 0 0 1 .372.021l1.213 1.516c-.021.06-.045.114-.07.165-.216.423-.56.767-.984.983-.197.1-.458.17-.912.207-.462.037-1.056.038-1.909.038h-1.9c-.852 0-1.447 0-1.91-.038-.453-.037-.714-.107-.911-.207a2.25 2.25 0 0 1-.984-.984c-.1-.197-.17-.458-.207-.912Z"}))};n.displayName="ImageIcon"}}]);
//# sourceMappingURL=308.15b35176.chunk.js.map