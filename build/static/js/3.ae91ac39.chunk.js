(this.webpackJsonpdemo1=this.webpackJsonpdemo1||[]).push([[3],{447:function(e,t,s){"use strict";s.r(t);var c=s(7),n=s(10),a=s(2),r=s(1),l=s(5),i=s(101),o=s(4),d=s(0),h=function(e){var t=e.item,s=e.index;return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{className:"w-25px",children:Object(d.jsx)("span",{className:"text-muted fw-bold text-muted d-block text-sm",children:s+1})}),Object(d.jsx)("td",{children:Object(d.jsx)("div",{className:"d-flex align-items-center",children:Object(d.jsx)("div",{className:"d-flex justify-content-start flex-column",children:Object(d.jsxs)("div",{className:"text-dark fw-bolder text-hover-primary fs-6",children:[0!=t.vps.substring(t.vps.lastIndexOf("-")+1,t.vps.length).length&&Object(d.jsx)("span",{style:{marginRight:2,backgroundColor:"#26695c"},className:"badge badge-dark",children:Object(d.jsx)("text",{style:{fontSize:11},children:t.vps.substring(t.vps.lastIndexOf("-")+1,t.vps.length)})}),Object(d.jsx)("span",{style:{marginRight:2,backgroundColor:"#c0e1ce"},className:"badge badge-danger",children:Object(d.jsx)("text",{style:{fontSize:11,color:"black"},children:t.vps.substring(0,t.vps.lastIndexOf("-"))})}),Object(d.jsx)("span",{style:{marginRight:2,backgroundColor:t.time<5?"#50CD89":"#e57624"},className:"badge badge-danger",children:Object(d.jsxs)("text",{style:{fontSize:11,color:"white"},children:[t.time,"m"]})})]})})})}),Object(d.jsx)("td",{children:Object(d.jsx)("span",{className:"text-muted fw-bold text-muted d-block text-sm",children:t.total})})]})};t.default=function(e){for(var t=e.className,s=Object(l.d)(),b="http://125.212.231.69/",j=Object(r.useState)(""),m=Object(a.a)(j,2),u=m[0],x=m[1],p=Object(r.useState)(0),f=Object(a.a)(p,2),O=f[0],g=f[1],v=Object(r.useState)(0),w=Object(a.a)(v,2),N=w[0],y=(w[1],Object(r.useState)("")),k=Object(a.a)(y,2),S=k[0],C=k[1],T=Object(l.e)((function(e){return e.histories.computers}),l.c)||[],z=0,_=0;_<T.length;_++)T[_].time>=5&&(z+=1);function B(e){return D.apply(this,arguments)}function D(){return D=Object(n.a)(Object(c.a)().mark((function e(t){var s,n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=b+"proxy/delipv4?ipv4="+t,e.next=3,fetch(s,{method:"get",headers:new Headers({Authorization:"1","Content-Type":"application/x-www-form-urlencoded"})});case 3:return n=e.sent,e.next=6,n.json();case 6:return a=e.sent,r=a.status,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)}))),D.apply(this,arguments)}function I(e){return R.apply(this,arguments)}function R(){return R=Object(n.a)(Object(c.a)().mark((function e(t){var s,n,a,r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=b+"proxy/addipv4?ipv4="+t,e.next=3,fetch(s,{method:"get",headers:new Headers({Authorization:"1","Content-Type":"application/x-www-form-urlencoded"})});case 3:return n=e.sent,e.next=6,n.json();case 6:return a=e.sent,r=a.status,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)}))),R.apply(this,arguments)}Object(r.useEffect)((function(){s(i.a.requestComputers()),x(""),g(0)}),[S]);return Object(d.jsxs)("div",{className:"card ".concat(t),children:[Object(d.jsxs)("div",{className:"page-header",style:{backgroundColor:"#c0e1ce"},children:[Object(d.jsx)("div",{className:"page-header__content",children:Object(d.jsx)("div",{className:"align-items-center row",style:{margin:10},children:Object(d.jsxs)("div",{className:"col-lg-6 col-sm-12 c-order__header",children:[Object(d.jsx)("span",{className:"fw-bolder fs-3 mb-1",children:"Danh s\xe1ch VPS"}),Object(d.jsxs)("span",{className:"ml-2 fw-bold fs-7",children:["(T\u1ed5ng: ",T.length," | Die: ",z," | Live: ",T.length-z,")"]})]})})}),1==O&&Object(d.jsx)("div",{className:"page-header__content",children:Object(d.jsx)("div",{className:"align-items-center row",style:{backgroundColor:"white"},children:Object(d.jsxs)("div",{children:[Object(d.jsx)(o.c,{style:{height:500,width:"100%",float:"left"},id:"list_id",name:"list_id",className:"form-control form-control-solid",placeholder:"1 ipv4 m\u1ed9t d\xf2ng!",value:u,type:"textarea",onChange:function(e){return x(e.target.value)}}),0==N&&Object(d.jsx)("button",{style:{maxWidth:120,color:"white",height:40,marginTop:10,float:"right",marginBottom:20},onClick:function(){!function(){var e=u.split("\n");if(1==window.confirm("B\u1ea1n ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a "+e.length+" \u0111\u01a1n!")){for(var t=0;t<e.length;t++)B(e[t]);C("true")}}()},className:"btn btn-success",children:"X\xf3a"}),1==N&&Object(d.jsx)("button",{style:{maxWidth:140,color:"white",height:40,marginTop:10,float:"right",marginBottom:20},onClick:function(){!function(){for(var e=u.split("\n"),t=0;t<e.length;t++)I(e[t]);C("true")}()},className:"btn btn-success",children:"Th\xeam"})]})})})]}),0==O&&Object(d.jsx)("div",{className:"card-body py-3",children:Object(d.jsx)("div",{className:"table-responsive",children:Object(d.jsxs)("table",{className:"table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{className:"fw-bolder text-muted",children:[Object(d.jsx)("th",{className:"min-w-10px",children:Object(d.jsx)("span",{style:{fontSize:12,color:"black"},className:"text-sm",children:"STT"})}),Object(d.jsx)("th",{className:"min-w-50px",children:Object(d.jsx)("span",{style:{fontSize:12,color:"black"},className:"text-sm",children:"VPS Name"})}),Object(d.jsx)("th",{className:"min-w-50px",children:Object(d.jsx)("span",{style:{fontSize:12,color:"black"},className:"text-sm",children:"Threads"})})]})}),Object(d.jsx)("tbody",{children:T&&(null===T||void 0===T?void 0:T.map((function(e,t){return Object(d.jsx)(h,{item:e,index:t},"ipv4-"+t)})))})]})})})]})}}}]);
//# sourceMappingURL=3.ae91ac39.chunk.js.map