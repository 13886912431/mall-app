(function(e){function t(t){for(var r,a,s=t[0],u=t[1],c=t[2],d=0,f=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d0cbe62":"2eb217ab","chunk-2d212ba9":"b6427e5b","chunk-2d21a3d2":"dac2f030","chunk-4fd77c9c":"8473dcfb"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-4fd77c9c":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0cbe62":"31d6cfe0","chunk-2d212ba9":"31d6cfe0","chunk-2d21a3d2":"31d6cfe0","chunk-4fd77c9c":"adde373a"}[e]+".css",o=u.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===r||d===o))return t()}var f=document.getElementsByTagName("style");for(s=0;s<f.length;s++){c=f[s],d=c.getAttribute("data-href");if(d===r||d===o)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],l.parentNode.removeChild(l),n(i)},l.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(l)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=s(e);var f=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="https://sereinlyl.gitee.io/mall-app/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var l=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"3d39":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("van-tabbar",{model:{value:e.active2,callback:function(t){e.active2=t},expression:"active2"}},[n("van-tabbar-item",{attrs:{icon:"home-o",to:"/"}},[e._v("首页")]),n("van-tabbar-item",{attrs:{icon:"apps-o",to:"/classify"}},[e._v("分类")]),n("van-tabbar-item",{attrs:{icon:"shopping-cart-o",to:"/shopping"}},[e._v("购物车")]),n("van-tabbar-item",{attrs:{icon:"user-o",to:"/my"}},[e._v("我的")])],1)},a=[],o={name:"Tabbar",props:["active"],computed:{active2:{get:function(){return this.active},set:function(){}}}},i=o,s=n("2877"),u=Object(s["a"])(i,r,a,!1,null,null,null);t["default"]=u.exports},"4ee2":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("d81d"),n("d3b7"),n("ac1f"),n("1276"),n("ddb0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"app"},s=i,u=(n("7c55"),n("2877")),c=Object(u["a"])(s,a,o,!1,null,null,null),d=c.exports,f=n("8c4f"),l=function(){return n.e("chunk-2d21a3d2").then(n.bind(null,"bb51"))},p=function(){return n.e("chunk-4fd77c9c").then(n.bind(null,"ce6a"))},m=function(){return n.e("chunk-2d212ba9").then(n.bind(null,"aa3f"))},h=function(){return n.e("chunk-2d0cbe62").then(n.bind(null,"4c41"))},b=[{path:"/",name:"Home",component:l},{path:"/classify",name:"Classify",component:p},{path:"/shopping",name:"Shopping",component:m},{path:"/my",name:"My",component:h}];r["a"].use(f["a"]);var v=new f["a"]({mode:"hash",routes:b,scrollBehavior:function(e,t,n){return n||{x:0,y:0}}}),g=v,y=n("2f62"),L=(n("99af"),n("96cf"),n("1da1")),w=n("2909"),k=n("bc3a"),S=n.n(k),O="https://mallapi.duyiedu.com/goods/",j="serein_1608558115171",_=S.a.create({baseURL:O,params:{appkey:j},timeout:1e4});_.interceptors.response.use((function(e){return 200===e.status?e.data:e}),(function(e){return Promise.reject(e)}));var x=_,T={getSideList:function(e){return x.get("/getsidebar",{params:{type:e}})},getGoodsList:function(e){return x.get("/getGoodsList",{params:e})}},E=function(){var e=Object(L["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:1500,e.next=3,new Promise((function(e){setTimeout((function(){e()}),t)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P={namespaced:!0,state:{sideList:[],goodsList:[],loadingSide:!1,type:null,limit:10,sort:"all"},mutations:{setSideList:function(e,t){e.sideList=t},setGoodsList:function(e,t){e.goodsList=[].concat(Object(w["a"])(e.goodsList),Object(w["a"])(t))},resetGoodsList:function(e){e.goodsList=[]},setLoadSideStatus:function(e,t){e.loadingSide=t},setGoodsListType:function(e,t){e.type=t},setGoodsListSort:function(e,t){e.sort=t}},actions:{getSideList:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,r("setLoadSideStatus",!0),n.next=4,T.getSideList(t);case 4:return a=n.sent,r("setSideList",a),n.next=8,E(500);case 8:r("setLoadSideStatus",!1);case 9:case"end":return n.stop()}}),n)})))()},getGoodsList:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a,o,i,s,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,a=e.state,o=t.type,i=t.page,s=t.sort,o=o||a.type,s=s||a.sort,n.next=6,T.getGoodsList({size:a.limit,page:i,type:o,sort:s});case 6:return u=n.sent,console.log(u),r("setGoodsList",u.list),r("setGoodsListType",o),r("setGoodsListSort",s),n.abrupt("return",u.list);case 12:case"end":return n.stop()}}),n)})))()}}};r["a"].use(y["a"]);var G=new y["a"].Store({state:{},mutations:{},actions:{},modules:{goods:P}}),C=(n("66b9"),n("b650")),N=(n("537a"),n("ac28")),R=(n("a52c"),n("2ed4")),A=(n("c3a6"),n("ad06")),M=(n("4056"),n("44bf")),B=(n("ac1e"),n("543e")),D=(n("66cf"),n("343b")),U=(n("91d5"),n("f0ca")),$=(n("ab71"),n("58e6")),q=(n("2994"),n("2bdd")),F=(n("f06a"),n("20fb"));r["a"].use(C["a"]).use(N["a"]).use(R["a"]).use(A["a"]).use(M["a"]).use(B["a"]).use(D["a"]).use(U["a"]).use($["a"]).use(q["a"]).use(F["a"]);n("499a"),n("adf6"),n("4ee2");var H=n("ffe0");H.keys().map((function(e){return r["a"].component(e.split("/").pop().split(".")[0],H(e).default)})),r["a"].config.productionTip=!1,new r["a"]({router:g,store:G,render:function(e){return e(d)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";n("2395")},adf6:function(e,t,n){},ffe0:function(e,t,n){var r={"./Tabbar.vue":"3d39"};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="ffe0"}});