(function(e){function n(n){for(var c,a,s=n[0],o=n[1],f=n[2],i=0,d=[];i<s.length;i++)a=s[i],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&d.push(u[a][0]),u[a]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(e[c]=o[c]);l&&l(n);while(d.length)d.shift()();return r.push.apply(r,f||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],c=!0,a=1;a<t.length;a++){var s=t[a];0!==u[s]&&(c=!1)}c&&(r.splice(n--,1),e=o(o.s=t[0]))}return e}var c={},a={app:0},u={app:0},r=[];function s(e){return o.p+"js/"+({about:"about"}[e]||e)+"."+{about:"ebe6a0b3","chunk-33aa518e":"2a245ee6","chunk-3678d61e":"012c3020","chunk-3aae4ac1":"bc25a80c","chunk-0c4096f2":"fd55e919","chunk-e41fc7e4":"67c13be1","chunk-e44b67e2":"a660bcf8","chunk-56e6296e":"e85eba94","chunk-1933116c":"44243a06","chunk-594ddb6c":"0a9ad68c","chunk-7510dfdc":"cf79400b","chunk-dd520cfe":"baa434fe","chunk-09cca77d":"6a194efc","chunk-2d0a467b":"ac004748","chunk-4ccf5af7":"e4766a89","chunk-5725cfe9":"79676987","chunk-9d810f5a":"c3b15f60","chunk-b7c24d7e":"3ab1d050","chunk-cf729f4e":"e4149430","chunk-01a9576f":"09652f5a","chunk-320aeec2":"3eea5622","chunk-c5eb819a":"be9f4bdd","chunk-fba68760":"256e14e4"}[e]+".js"}function o(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.e=function(e){var n=[],t={"chunk-33aa518e":1,"chunk-3678d61e":1,"chunk-3aae4ac1":1,"chunk-0c4096f2":1,"chunk-56e6296e":1,"chunk-1933116c":1,"chunk-594ddb6c":1,"chunk-7510dfdc":1,"chunk-dd520cfe":1,"chunk-09cca77d":1,"chunk-4ccf5af7":1,"chunk-5725cfe9":1,"chunk-9d810f5a":1,"chunk-cf729f4e":1,"chunk-01a9576f":1,"chunk-320aeec2":1,"chunk-c5eb819a":1,"chunk-fba68760":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var c="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-33aa518e":"1bbdaac2","chunk-3678d61e":"b8eb9f94","chunk-3aae4ac1":"7900e214","chunk-0c4096f2":"7071dfaf","chunk-e41fc7e4":"31d6cfe0","chunk-e44b67e2":"31d6cfe0","chunk-56e6296e":"692dc0c5","chunk-1933116c":"9deb4d24","chunk-594ddb6c":"0f7d2e45","chunk-7510dfdc":"e4096707","chunk-dd520cfe":"9ab3fc7b","chunk-09cca77d":"70016dd4","chunk-2d0a467b":"31d6cfe0","chunk-4ccf5af7":"2a68da82","chunk-5725cfe9":"635f5560","chunk-9d810f5a":"a3ff32de","chunk-b7c24d7e":"31d6cfe0","chunk-cf729f4e":"50d3ec55","chunk-01a9576f":"579543f4","chunk-320aeec2":"072733d1","chunk-c5eb819a":"c880b8ce","chunk-fba68760":"7812669d"}[e]+".css",u=o.p+c,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var f=r[s],i=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(i===c||i===u))return n()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){f=d[s],i=f.getAttribute("data-href");if(i===c||i===u)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var c=n&&n.target&&n.target.src||u,r=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=c,delete a[e],l.parentNode.removeChild(l),t(r)},l.href=u;var h=document.getElementsByTagName("head")[0];h.appendChild(l)})).then((function(){a[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var r=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=r);var f,i=document.createElement("script");i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.src=s(e);var d=new Error;f=function(n){i.onerror=i.onload=null,clearTimeout(l);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+c+": "+a+")",d.name="ChunkLoadError",d.type=c,d.request=a,t[1](d)}u[e]=void 0}};var l=setTimeout((function(){f({type:"timeout",target:i})}),12e4);i.onerror=i.onload=f,document.head.appendChild(i)}return Promise.all(n)},o.m=e,o.c=c,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)o.d(t,c,function(n){return e[n]}.bind(null,c));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/",o.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],i=f.push.bind(f);f.push=n,f=f.slice();for(var d=0;d<f.length;d++)n(f[d]);var l=i;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},4678:function(e,n,t){var c={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var n=u(e);return t(n)}function u(e){if(!t.o(c,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return c[e]}a.keys=function(){return Object.keys(c)},a.resolve=u,e.exports=a,a.id="4678"},"5c0b":function(e,n,t){"use strict";var c=t("9c0c"),a=t.n(c);a.a},"9c0c":function(e,n,t){},cd49:function(e,n,t){"use strict";t.r(n);t("4de4"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("2b0e"),a=t("2f62"),u=t("0e44"),r=t("bc3a"),s=t.n(r);c["default"].use(a["a"]);var o=function(){return{token:"",user:{}}},f=new a["a"].Store({state:o(),getters:{isLoggedIn:function(e){var n;return(null===(n=e.user)||void 0===n?void 0:n.id)>0},getUser:function(e){return e.user},isAdmin:function(e){var n;return"admin"===(null===(n=e.user)||void 0===n?void 0:n.role)}},mutations:{SET_TOKEN:function(e,n){e.token=n},SET_USER:function(e,n){e.user=n},RESET:function(e){Object.assign(e,o())}},actions:{login:function(e,n){var t=e.commit,c=n.token,a=n.user;t("SET_TOKEN",c),t("SET_USER",a)},logout:function(e){var n=e.commit;n("RESET","")},checkStatus:function(e){var n=e.commit;s.a.get("/api/user/status").then((function(e){e.data.data?n("SET_USER",e.data.data):n("RESET","")}))}},plugins:[Object(u["a"])()]}),i=f,d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",{attrs:{id:"inspire"}},[t("v-app-bar",{attrs:{app:"",color:"white",flat:""}},[t("v-container",{staticClass:"py-0 fill-height"},[e._l(e.links,(function(n){return t("span",{key:n.name},[n.show||e.admin&&!n.show?t("v-btn",{attrs:{text:""},on:{click:function(t){return e.$router.push(n.route)}}},[e._v(" "+e._s(n.name)+" ")]):e._e()],1)})),t("v-spacer"),e.loggedIn?t("v-responsive",{attrs:{"max-width":"260"},on:{click:e.logOut}},[t("v-menu",{attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(n){var c=n.on,a=n.attrs;return[t("v-btn",e._g(e._b({attrs:{color:"primary",dark:""}},"v-btn",a,!1),c),[e._v(" Profile ")])]}}],null,!1,3993161897)},[t("v-list",[t("v-list-item",[t("v-list-item-title",{on:{click:e.editProfile}},[e._v("Profile ändern")])],1),t("v-list-item",[t("v-list-item-title",{on:{click:e.logOut}},[e._v("Logout")])],1)],1)],1)],1):t("v-responsive",{attrs:{"max-width":"260"}},[t("router-link",{attrs:{to:"/login"}},[e._v(" Login ")])],1)],2)],1),t("v-main",{staticClass:"grey lighten-4"},[t("v-container",{staticClass:"maincontent"},[t("router-view")],1)],1)],1)},l=[],h=t("d4ec"),b=t("bee2"),k=t("262e"),m=t("2caf"),p=t("9ab4"),j=(t("bf40"),t("60a3")),g=function(e){Object(k["a"])(t,e);var n=Object(m["a"])(t);function t(){var e;return Object(h["a"])(this,t),e=n.apply(this,arguments),e.links=[{name:"Dashboard",route:"/",show:!0},{name:"Testfälle",route:"/test",show:!0},{name:"Testreihen",route:"/testgroup",show:!0},{name:"Korpus",route:"/publishers",show:!0},{name:"Benutzer",route:"/user",show:!1},{name:"Kontroll",route:"/controlpanel",show:!1}],e}return Object(b["a"])(t,[{key:"logOut",value:function(){var e=this;s.a.get("/api/user/logout").then((function(){e.$store.dispatch("logout"),e.$router.push("/")}))}},{key:"editProfile",value:function(){this.$router.push("/user/edit/".concat(this.$store.getters.getUser.id))}},{key:"onRouteChange",value:function(){this.$store.dispatch("checkStatus")}},{key:"loggedIn",get:function(){return this.$store.getters.isLoggedIn}},{key:"admin",get:function(){return this.$store.getters.isAdmin}}]),t}(c["default"]);Object(p["a"])([Object(j["d"])("$route")],g.prototype,"onRouteChange",null),g=Object(p["a"])([Object(j["a"])({components:{}})],g);var v=g,w=v,y=(t("5c0b"),t("2877")),P=t("6544"),O=t.n(P),_=t("7496"),E=t("40dc"),z=t("8336"),S=t("a523"),T=t("8860"),M=t("da13"),x=t("5d23"),C=t("f6c4"),L=t("e449"),A=t("6b53"),V=t("2fa4"),$=Object(y["a"])(w,d,l,!1,null,null,null),N=$.exports;O()($,{VApp:_["a"],VAppBar:E["a"],VBtn:z["a"],VContainer:S["a"],VList:T["a"],VListItem:M["a"],VListItemTitle:x["c"],VMain:C["a"],VMenu:L["a"],VResponsive:A["a"],VSpacer:V["a"]});t("d3b7");var R=t("8c4f");c["default"].use(R["a"]);var U=[{path:"/",name:"Dashboard",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-4ccf5af7")]).then(t.bind(null,"7277"))}},{path:"/about",name:"About",component:function(){return t.e("about").then(t.bind(null,"f820"))}},{path:"/publishers",name:"Publishers",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-9d810f5a")]).then(t.bind(null,"c827"))}},{path:"/publisher/:id",name:"Publisher",component:function(){return Promise.all([t.e("chunk-dd520cfe"),t.e("chunk-c5eb819a")]).then(t.bind(null,"4f6d"))}},{path:"/test/new",name:"test/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-7510dfdc")]).then(t.bind(null,"b803"))}},{path:"/test/new/manuell",name:"test/new/manuell",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-7510dfdc")]).then(t.bind(null,"b803"))},props:{manuell:!0}},{path:"/test/edit/:id",name:"test/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-7510dfdc")]).then(t.bind(null,"b803"))}},{path:"/test/",name:"tests",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-2d0a467b")]).then(t.bind(null,"05ff"))}},{path:"/test/manuell",name:"tests/manuell",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-2d0a467b")]).then(t.bind(null,"05ff"))},props:{manuell:!0}},{path:"/test/:id",name:"test/show",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-b7c24d7e")]).then(t.bind(null,"9744"))}},{path:"/testgroup/new",name:"testgroup/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-e44b67e2"),t.e("chunk-cf729f4e")]).then(t.bind(null,"1a97"))}},{path:"/testgroup/edit/:id",name:"testgroup/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-e44b67e2"),t.e("chunk-cf729f4e")]).then(t.bind(null,"1a97"))}},{path:"/testgroup",name:"testgroup",component:function(){return Promise.all([t.e("chunk-dd520cfe"),t.e("chunk-320aeec2")]).then(t.bind(null,"8658"))}},{path:"/testgroup/show/:id",name:"testgroup/show",component:function(){return Promise.all([t.e("chunk-dd520cfe"),t.e("chunk-01a9576f")]).then(t.bind(null,"64cc"))}},{path:"/news/new",name:"news/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-594ddb6c")]).then(t.bind(null,"6baf"))}},{path:"/news/edit/:id",name:"news/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-594ddb6c")]).then(t.bind(null,"6baf"))}},{path:"/news",name:"news",component:function(){return t.e("chunk-3678d61e").then(t.bind(null,"b313"))}},{path:"/login",name:"login",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-1933116c")]).then(t.bind(null,"a55b"))}},{path:"/publishers/new",name:"publishers/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-5725cfe9")]).then(t.bind(null,"236e"))}},{path:"/source/new",name:"source/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-0c4096f2"),t.e("chunk-e44b67e2"),t.e("chunk-56e6296e")]).then(t.bind(null,"9f4f"))}},{path:"/source/new/:publisherid",name:"source/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-0c4096f2"),t.e("chunk-e44b67e2"),t.e("chunk-56e6296e")]).then(t.bind(null,"9f4f"))}},{path:"/source/edit/:id",name:"source/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-0c4096f2"),t.e("chunk-e44b67e2"),t.e("chunk-56e6296e")]).then(t.bind(null,"9f4f"))}},{path:"/user/new",name:"user/new",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-0c4096f2"),t.e("chunk-e41fc7e4")]).then(t.bind(null,"bf80"))}},{path:"/user/edit/:id",name:"user/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-0c4096f2"),t.e("chunk-e41fc7e4")]).then(t.bind(null,"bf80"))}},{path:"/publisher/edit/:id",name:"publisher/edit",component:function(){return Promise.all([t.e("chunk-3aae4ac1"),t.e("chunk-dd520cfe"),t.e("chunk-0c4096f2"),t.e("chunk-09cca77d"),t.e("chunk-5725cfe9")]).then(t.bind(null,"236e"))}},{path:"/user",name:"user",component:function(){return t.e("chunk-fba68760").then(t.bind(null,"9b05"))}},{path:"/controlpanel",name:"controlpanel",component:function(){return t.e("chunk-33aa518e").then(t.bind(null,"992e"))}}],D=new R["a"]({base:"/",mode:"history",routes:U}),I=D,B=t("ce5b"),Y=t.n(B);c["default"].use(Y.a);var F=new Y.a({}),K=t("c1df"),q=t.n(K),H=t("0e54"),J=t.n(H),G={dateFormat:function(e){return console.log(e),q()(e).format("D-M-Y HH:mm:ss")},dateMonth:function(e){return console.log(e),console.log("YO"),q()(e).format("MMMM YYYY")},formatMarked:function(e){return J()(e)}},Q=G;c["default"].config.productionTip=!1,c["default"].filter("dateFormat",Q.dateFormat),c["default"].filter("dateMonth",Q.dateMonth),c["default"].filter("formatMarked",Q.formatMarked),new c["default"]({router:I,vuetify:F,store:i,render:function(e){return e(N)}}).$mount("#app")}});
//# sourceMappingURL=app.7b329972.js.map