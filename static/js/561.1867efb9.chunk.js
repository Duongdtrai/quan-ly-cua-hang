"use strict";(self.webpackChunkquan_ly_cua_hang=self.webpackChunkquan_ly_cua_hang||[]).push([[561],{7764:(t,e,n)=>{n.d(e,{x:()=>i});let i=function(t){return t.MODAL_EDIT_PRODUCT="MODAL_EDIT_PRODUCT",t.MODAL_DELETE_PRODUCT="MODAL_DELETE_PRODUCT",t.UNSAVE_CHANGE_PRODUCT="UNSAVE_CHANGE_PRODUCT",t.UPLOAD_IMAGE_MODAL="UPLOAD_IMAGE_MODAL",t}({})},2638:(t,e,n)=>{n.d(e,{h:()=>o});var i=n(5043);const l=(t=>{let e=t;const n=new Set;return{getState:()=>e,setState:t=>{e=t(e),n.forEach((t=>t()))},subscribe:t=>(n.add(t),()=>n.delete(t)),resetState:()=>{e=t}}})({}),o=()=>({state:((t,e)=>{const n=(0,i.useSyncExternalStore)(t.subscribe,(()=>JSON.stringify(e(t.getState()))),(()=>JSON.stringify(e(t.getState())))),[l,o]=(0,i.useState)(JSON.parse(n||""));return(0,i.useEffect)((()=>{o(JSON.parse(n||""))}),[n]),l})(l,(t=>t)),openModal:(t,e)=>{t&&l.setState((n=>({...n,[t]:{...e,active:!0}})))},closeModal:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";t&&l.setState((e=>({...e,[t]:{active:!1}})))}})},2561:(t,e,n)=>{n.r(e),n.d(e,{default:()=>L});var i=n(5043),l=n(4198),o=n(7633),d=n(3397),a=n(3888),s=n(6229),r=n(4154),c=n(7154),u=n(6178),p=n.n(u),v=n(6823),h=n(6699),x=n(6345),g=n(6187),m=n(6982),y=n(3529),S=n(7765),j=n(4291),A=n(8270),f=n(6196),C=n(4262),b=n(9090),E=n(579);const T=t=>{var e,n,l,o;let{open:d,setOpen:a,handleUpdateItem:s,data:r}=t;const[u,p]=(0,i.useState)([]),[v,h]=(0,i.useState)(r),[x,m]=(0,i.useState)(null===r||void 0===r?void 0:r.product),[A,f]=(0,i.useState)([]),[C,T]=(0,i.useState)((null===r||void 0===r||null===(e=r.product)||void 0===e||null===(n=e.category)||void 0===n?void 0:n.id.toString())||""),[D,O]=(0,i.useState)(null!==r&&void 0!==r&&r.id?[null===r||void 0===r?void 0:r.product]:[]);(0,i.useEffect)((()=>{(async()=>{var t,e,n,i;const l=await c.A.get("http://54.199.68.197:8081/api/v1/products");p(null===l||void 0===l||null===(t=l.data)||void 0===t||null===(e=t.data)||void 0===e?void 0:e.data);const o=null===l||void 0===l||null===(n=l.data)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.data.filter((t=>t.category.id.toString()===C));O(o),m(o[0]),h({id:r.id,product:o[0],quantity:r.quantity})})()}),[C]),(0,i.useEffect)((()=>{(async()=>{var t,e,n,i;const l=await c.A.get("http://54.199.68.197:8081/api/v1/category",{params:{page:0,size:1e3}});f(null===l||void 0===l||null===(t=l.data)||void 0===t||null===(e=t.data)||void 0===e?void 0:e.data),r||T(null===l||void 0===l||null===(n=l.data)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.data[0].id.toString())})()}),[]);return(0,E.jsx)(g.a,{size:"small",open:d,onClose:()=>a(!1),title:null!==r&&void 0!==r&&r.id?"S\u1eeda th\xf4ng tin m\u1eb7t h\xe0ng":"Th\xeam M\u1eb7t H\xe0ng",primaryAction:{content:null!==r&&void 0!==r&&r.id?"L\u01b0u":"Th\xeam",onAction:()=>s(v,null===r||void 0===r?void 0:r.id)},secondaryActions:[{content:"H\u1ee7y",onAction:()=>a(!1)}],children:(0,E.jsx)(b.l,{onSubmit:()=>s(v,null===r||void 0===r?void 0:r.id),children:(0,E.jsx)(g.a.Section,{children:(0,E.jsxs)(y.H,{children:[(0,E.jsx)(j.l,{id:"select-category",label:"Ch\u1ecdn lo\u1ea1i m\u1eb7t h\xe0ng",options:A.map((t=>({label:t.name,value:t.id.toString()}))),value:C,onChange:t=>(t=>{T(t)})(t),disabled:!(null===r||void 0===r||!r.id)}),(0,E.jsx)(j.l,{id:"select-product",label:"Ch\u1ecdn m\u1eb7t h\xe0ng",options:D.map((t=>({label:t.name,value:t.id?t.id.toString():""}))),value:(null===x||void 0===x||null===(l=x.id)||void 0===l?void 0:l.toString())||"",onChange:t=>(t=>{const e=u.find((e=>e.id===parseInt(t)));e&&(m(e),h({...v,product:e}))})(t),disabled:!(null===r||void 0===r||!r.id)}),(0,E.jsx)(S.A,{id:"quantity",label:"S\u1ed1 L\u01b0\u1ee3ng",type:"number",min:1,value:null!==v&&void 0!==v&&v.quantity?null===v||void 0===v||null===(o=v.quantity)||void 0===o?void 0:o.toString():"",onChange:t=>(t=>{h({...v,quantity:parseInt(t)})})(t),disabled:!C,autoComplete:"off"}),(0,E.jsx)(S.A,{id:"price",label:"Gi\xe1",type:"number",value:null===x||void 0===x?void 0:x.price.toString(),disabled:!0,autoComplete:"off"})]})})})})},D=t=>{var e;let{open:n,setOpen:l,order:o,fetchData:a,setSelectedRows:u}=t;const[b,D]=(0,i.useState)("5"),[O,_]=(0,i.useState)(!1),[M,P]=(0,i.useState)([]),[L,w]=(0,i.useState)(0),[k,R]=(0,i.useState)(!1),[q,U]=(0,i.useState)(),[Y,N]=(0,i.useState)(o||{createdAt:p()().format("YYYY-MM-DD"),status:!1,supplier:{id:0,name:""},orderProducts:[],tax:.05,note:"",code:""}),[H,I]=(0,i.useState)(null===o||void 0===o||null===(e=o.supplier)||void 0===e?void 0:e.id.toString());(0,i.useEffect)((()=>{(async()=>{var t,e;const n=await c.A.get("http://54.199.68.197:8081/api/v1/suppliers",{params:{page:0,size:100}});P(null===n||void 0===n||null===(t=n.data)||void 0===t||null===(e=t.data)||void 0===e?void 0:e.data)})()}),[]),(0,i.useEffect)((()=>{w(G())}),[Y]);const G=()=>{var t;return null===Y||void 0===Y||null===(t=Y.orderProducts)||void 0===t?void 0:t.reduce(((t,e)=>t+e.quantity*e.product.price),0)},$=t=>{Y&&Y.orderProducts&&N({...Y,orderProducts:Y.orderProducts.filter((e=>t.id!==e.id))})},z=t=>{U(t),R(!0)};return(0,E.jsxs)("div",{children:[k&&(0,E.jsx)(T,{handleUpdateItem:(t,e)=>{if(null!==t&&void 0!==t&&t.product&&null!==t&&void 0!==t&&t.quantity){var n;_(!1),R(!1);let i=!1;const l=null===Y||void 0===Y||null===(n=Y.orderProducts)||void 0===n?void 0:n.map((n=>n.product.id===t.product.id||n.id===e?(i=!0,t):n));N({...Y,orderProducts:e||i?l:Y?[...null===Y||void 0===Y?void 0:Y.orderProducts,t]:[t]})}else alert("Vui l\xf2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\xf4ng tin")},data:q,open:k,setOpen:R}),(0,E.jsx)(g.a,{size:"large",title:null!==o&&void 0!==o&&o.id?"S\u1eeda th\xf4ng tin \u0111\u01a1n h\xe0ng":"T\u1ea1o \u0111\u01a1n nh\u1eadp h\xe0ng",open:n,onClose:()=>l(!1),primaryAction:{content:"L\u01b0u",onAction:async()=>{var t,e;if(0===(null===Y||void 0===Y||null===(t=Y.orderProducts)||void 0===t?void 0:t.length))return void _(!0);const n=null===Y||void 0===Y||null===(e=Y.orderProducts)||void 0===e?void 0:e.map((t=>({id:t.product.id,quantity:t.quantity})));if(null!==o&&void 0!==o&&o.id)try{var i;await c.A.put("http://54.199.68.197:8081/api/v1/orders/".concat(o.id),{code:null===Y||void 0===Y?void 0:Y.code,note:null===Y||void 0===Y?void 0:Y.note,taxType:null===Y||void 0===Y?void 0:Y.tax,supplier:{id:null===Y||void 0===Y||null===(i=Y.supplier)||void 0===i?void 0:i.id},products:n},{params:{page:0,size:1e3}}),a(),l(!1),u([])}catch(s){alert(s.response.data.message)}else{const t={...Y,supplier:{id:null===Y||void 0===Y?void 0:Y.supplier.id},products:Y.orderProducts.map((t=>({id:t.product.id,quantity:t.quantity}))),status:!1};try{var d;const e=await c.A.post("http://54.199.68.197:8081/api/v1/orders",t);200===(null===e||void 0===e||null===(d=e.data)||void 0===d?void 0:d.status)&&(a(),l(!1))}catch(s){alert(s.response.data.message)}}}},secondaryActions:[{content:"H\u1ee7y",onAction:()=>l(!1)}],children:(0,E.jsx)(g.a.Section,{children:(0,E.jsxs)(m.x,{children:[(0,E.jsx)(m.x.Cell,{columnSpan:{lg:8,md:4,xs:6},children:(0,E.jsxs)(y.H,{children:[(0,E.jsxs)(m.x,{children:[(0,E.jsx)(m.x.Cell,{columnSpan:{xs:6},children:(0,E.jsx)(S.A,{label:"Ng\xe0y t\u1ea1o \u0111\u01a1n",type:"date",value:p()(null===Y||void 0===Y?void 0:Y.createdAt).format("YYYY-MM-DD"),disabled:!0,autoComplete:"off",id:"order-date"})}),(0,E.jsx)(m.x.Cell,{columnSpan:{xs:6},children:(0,E.jsx)(S.A,{label:"M\xe3 v\u1eadn \u0111\u01a1n",type:"text",value:null===Y||void 0===Y?void 0:Y.code,onChange:t=>N({...Y,code:t}),autoComplete:"off",id:"delivery-code"})})]}),(0,E.jsx)(j.l,{id:"supplier-select",label:"Nh\xe0 cung c\u1ea5p",options:M.map((t=>({label:t.name||"",value:t.id.toString()}))),value:H,onChange:t=>(t=>{I(t),N({...Y,supplier:{id:t,name:""}})})(t),placeholder:"Ch\u1ecdn nh\xe0 cung c\u1ea5p"}),(0,E.jsx)(S.A,{id:"note",label:"Ghi ch\xfa",value:null===Y||void 0===Y?void 0:Y.note,onChange:t=>{t.length<=500&&N({...Y,note:t})},multiline:3,autoComplete:"off",maxLength:200,showCharacterCount:!0})]})}),(0,E.jsxs)(m.x.Cell,{columnSpan:{xs:6,md:2,lg:4},children:[(0,E.jsx)("div",{style:{marginBottom:"15px"},children:(0,E.jsx)(S.A,{id:"total-product-price",label:"T\u1ed5ng ti\u1ec1n h\xe0ng ho\xe1",value:null===L||void 0===L?void 0:L.toString(),disabled:!0,autoComplete:""})}),(0,E.jsx)("div",{style:{marginBottom:"15px"},children:(0,E.jsx)(j.l,{id:"tax-select",label:"Ch\u1ecdn m\u1ee9c thu\u1ebf",value:b,options:[{label:"5%",value:"0.05"},{label:"10%",value:"0.1"}],onChange:t=>D(t)})}),(0,E.jsx)("div",{style:{marginBottom:"15px"},children:(0,E.jsx)(S.A,{id:"tax",label:"Gi\xe1 tr\u1ecb thu\u1ebf",value:L?(parseFloat(b)*L).toString():"0",autoComplete:""})}),(0,E.jsx)(S.A,{id:"total",label:"T\u1ed5ng h\xf3a \u0111\u01a1n",value:L?(parseFloat(b)*L+L).toString():"0",disabled:!0,autoComplete:""})]}),(0,E.jsxs)(m.x.Cell,{columnSpan:{xs:6,md:6,lg:12},children:[(0,E.jsxs)(A.o,{gap:"400",children:[(0,E.jsx)(d.$,{onClick:()=>{R(!0),U(void 0)},id:"add-order-product-btn",children:"Th\xeam m\u1eb7t h\xe0ng"}),O&&(0,E.jsx)(h.E,{tone:"critical",as:"p",children:"Vui l\xf2ng nh\u1eadp s\u1ea3n ph\u1ea9m"})]}),(0,E.jsx)(s.b,{columnContentTypes:["text","numeric","text","numeric","numeric","text"],headings:["T\xean m\u1eb7t h\xe0ng",(0,E.jsx)("div",{style:{textAlign:"center"},children:"S\u1ed1 l\u01b0\u1ee3ng"}),"Lo\u1ea1i","Gi\xe1","T\u1ed5ng ti\u1ec1n","Thao t\xe1c"],rows:(B=Y,B&&B.orderProducts?B.orderProducts.map((t=>[(0,E.jsxs)(v.a,{id:"product-name-and-image",children:[(0,E.jsx)(h.E,{id:"product-name",as:"p",children:t.product.name}),(0,E.jsx)(x.V,{source:t.product.image,alt:"image"})]}),(0,E.jsx)("div",{style:{textAlign:"center"},children:t.quantity}),t.product.category.name,t.product.price,t.product.price*t.quantity,(0,E.jsx)("div",{style:{minWidth:"70px"},children:(0,E.jsxs)(r.e,{children:[(0,E.jsx)(d.$,{icon:f.S,onClick:()=>z(t),id:"edit-order-product-btn"}),(0,E.jsx)(d.$,{icon:C.S,tone:"critical",onClick:()=>$(t),id:"delete-order-product-btn"})]})})])):[])})]})]})})})]});var B};var O=n(3216),_=n(5136),M=n(2638),P=n(7764);const L=()=>{const{openModal:t}=(0,M.h)(),[e,n]=(0,i.useState)(!1),[u,v]=(0,i.useState)([]),[h,x]=(0,i.useState)([]),[g,m]=(0,i.useState)(),[y,S]=(0,i.useState)(0),[j,A]=(0,i.useState)([]),f=(0,O.Zp)(),C=["",(0,E.jsx)("div",{style:{textAlign:"center"},children:"STT"}),(0,E.jsx)("div",{style:{textAlign:"center"},children:"M\xe3 \u0111\u01a1n h\xe0ng"}),(0,E.jsx)("div",{style:{textAlign:"left"},children:"Ng\xe0y t\u1ea1o"}),(0,E.jsx)("div",{style:{textAlign:"left"},children:"Nh\xe0 cung c\u1ea5p"}),(0,E.jsx)("div",{style:{textAlign:"left"},children:"Tr\u1ea1ng th\xe1i"})],b=()=>{c.A.get("http://54.199.68.197:8081/api/v1/orders",{params:{page:0,size:1e4}}).then((t=>{if(200===t.status){var e,n;const i=null===t||void 0===t||null===(e=t.data)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.data;v(i),x(i.slice(0,10))}})).catch((t=>console.error(t)))};(0,i.useEffect)((()=>{b()}),[e,y,j]);const T=t=>{const e=y+t;S(e),x(u.slice(10*e,10*(e+1)))};return(0,E.jsxs)(o.Y,{backAction:{onAction:()=>f("/")},title:"Qu\u1ea3n l\xfd \u0111\u01a1n h\xe0ng",primaryAction:{content:"T\u1ea1o \u0111\u01a1n h\xe0ng",onAction:()=>(m(void 0),void n(!0))},fullWidth:!0,children:[(0,E.jsx)("div",{style:{marginBottom:"20px"},children:(0,E.jsx)(d.$,{onClick:()=>A([]),disabled:!j.length,children:"B\u1ecf ch\u1ecdn"})}),(0,E.jsx)(a.Z,{children:(0,E.jsx)(s.b,{columnContentTypes:["text","text","text","text","text"],headings:C,rows:(L=h,L.map(((t,e)=>[(0,E.jsx)(l.S,{name:"",value:"",label:"",labelHidden:!0,checked:!!j.find((e=>e===t.id)),onChange:e=>{A(e?e=>[...e,t.id]:e=>e.filter((e=>e!==t.id)))}}),(0,E.jsx)("div",{style:{textAlign:"center"},children:10*y+e+1}),(0,E.jsx)("div",{style:{textAlign:"center"},children:t.id}),p()(t.createdAt).format("YYYY-MM-DD"),t.supplier.name,t.status?"\u0110\xe3 thanh to\xe1n":"Ch\u01b0a thanh to\xe1n"]))),truncate:!0})}),(0,E.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"20px"},children:(0,E.jsxs)(r.e,{children:[(0,E.jsx)(d.$,{disabled:0===y,onClick:()=>T(-1),id:"previous-page",children:"Trang tr\u01b0\u1edbc"}),(0,E.jsx)(d.$,{disabled:u.length<10*(y+1),onClick:()=>T(1),id:"next-page",children:"Trang ti\u1ebfp theo"})]})}),j.length>0&&(0,E.jsxs)("div",{style:{position:"absolute",left:"50%",bottom:"15px",background:"#fff",paddingBlock:8,paddingInline:12,borderRadius:8,border:"1px solid #f1f1f1",transform:"translateX(-50%)",display:"flex",gap:"12px"},children:[(0,E.jsx)(d.$,{variant:"primary",disabled:j.length>1,onClick:()=>{const t=u.find((t=>t.id===j[0]));m(t),n(!0)},children:"S\u1eeda \u0111\u01a1n h\xe0ng"}),(0,E.jsx)(d.$,{variant:"primary",tone:"critical",onClick:()=>{t(P.x.MODAL_DELETE_PRODUCT,{data:{selectedRows:j,setSelectedRows:A}})},children:"Xo\xe1 \u0111\u01a1n h\xe0ng"})]}),e&&(0,E.jsx)(D,{order:g,open:e,setOpen:n,fetchData:b,setSelectedRows:A}),(0,E.jsx)(_.A,{selectedRows:j,setSelectedRows:A,type:"orders"})]});var L}},5136:(t,e,n)=>{n.d(e,{A:()=>u});var i=n(6187),l=n(4256),o=n(6699),d=n(2638),a=n(7764),s=n(5043),r=n(7154),c=n(579);const u=t=>{var e;let{selectedRows:n=[],setSelectedRows:u=(()=>{}),type:p}=t;const{state:v,closeModal:h}=(0,d.h)(),[x,g]=(0,s.useState)(!1),m=()=>{h(a.x.MODAL_DELETE_PRODUCT)};return(0,c.jsx)(i.a,{open:null===(e=v[a.x.MODAL_DELETE_PRODUCT])||void 0===e?void 0:e.active,title:"X\xe1c nh\u1eadn xo\xe1 ".concat(n.length," m\u1eb7t h\xe0ng"),onClose:m,primaryAction:{content:"X\xe1c nh\u1eadn",onAction:()=>{g(!0),n.forEach(((t,e)=>{(async t=>{await r.A.delete("http://54.199.68.197:8081/api/v1/".concat(p,"/").concat(t)).then((t=>console.log(t))).catch((t=>console.log(t))),u([])})(t).then((()=>{e===n.length-1&&(g(!1),m())}))}))},loading:x},secondaryActions:[{content:"Hu\u1ef7",onAction:()=>{m()}}],children:(0,c.jsx)(i.a.Section,{children:(0,c.jsxs)(l.a,{gap:"300",children:[(0,c.jsx)(o.E,{as:"p",variant:"bodyMd",children:"M\u1eb7t h\xe0ng \u0111\xe3 xo\xe1 s\u1ebd kh\xf4ng th\u1ec3 kh\xf4i ph\u1ee5c l\u1ea1i."}),(0,c.jsx)(o.E,{as:"p",variant:"bodyMd",children:"Ti\u1ebfp t\u1ee5c xo\xe1?"})]})})})}}}]);
//# sourceMappingURL=561.1867efb9.chunk.js.map