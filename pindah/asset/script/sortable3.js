/*! Sortable 1.8.4 - MIT | git://github.com/SortableJS/Sortable.git */

!function(t){"use strict";"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&void 0!==module.exports?module.exports=t():window.Sortable=t()}(function(){"use strict";if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var U,V,f,u,q,G,h,X,Y,A,K,n,Z,Q,l,s,c,p,k,J,$,tt,et,ot,g,nt,I=[],B=!1,v=!1,it=!1,d=[],rt=!1,at=!1,m=[],i=/\s+/g,lt="Sortable"+(new Date).getTime(),b=window,st=b.document,w=b.parseInt,ct=b.setTimeout,e=b.jQuery||b.Zepto,o=b.Polymer,r={capture:!1,passive:!1},dt=!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),_=!!navigator.userAgent.match(/Edge/i),y=!!navigator.userAgent.match(/firefox/i),D=!(!navigator.userAgent.match(/safari/i)||navigator.userAgent.match(/chrome/i)||navigator.userAgent.match(/android/i)),S=!!navigator.userAgent.match(/iP(ad|od|hone)/i),T=_||dt?"cssFloat":"float",a="draggable3"in st.createElement("div"),C=function(){if(dt)return!1;var t=st.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}(),ht=!1,E=!1,ut=Math.abs,x=Math.min,N=Math.max,M=[],P=function(t,e){var o=Dt(t),n=w(o.width)-w(o.paddingLeft)-w(o.paddingRight)-w(o.borderLeftWidth)-w(o.borderRightWidth),i=Mt(t,0,e),r=Mt(t,1,e),a=i&&Dt(i),l=r&&Dt(r),s=a&&w(a.marginLeft)+w(a.marginRight)+Lt(i).width,c=l&&w(l.marginLeft)+w(l.marginRight)+Lt(r).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?"vertical":"horizontal";if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(i&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==l.clear&&l.clear!==d?"horizontal":"vertical"}return i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||n<=s&&"none"===o[T]||r&&"none"===o[T]&&n<s+c)?"vertical":"horizontal"},O=function(t,e){if(!t||!t.getBoundingClientRect)return H();var o=t,n=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=Dt(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===st.body)return H();if(n||e)return o;n=!0}}}while(o=o.parentNode);return H()},H=function(){return dt?st.documentElement:st.scrollingElement},ft=function(t,e,o){t.scrollLeft+=e,t.scrollTop+=o},R=It(function(o,t,e,n){if(t.scroll){var i=e?e[lt]:window,r=t.scrollSensitivity,a=t.scrollSpeed,l=o.clientX,s=o.clientY,c=H(),d=!1;Y!==e&&(L(),X=t.scroll,A=t.scrollFn,!0===X&&(X=O(e,!0),Y=X));var h=0,u=X;do{var f,p,g,v,m,b,w,_,y,D=u,S=Lt(D),T=S.top,C=S.bottom,E=S.left,x=S.right,N=S.width,M=S.height;if(f=D.scrollWidth,p=D.scrollHeight,g=Dt(D),_=D.scrollLeft,y=D.scrollTop,w=D===c?(b=N<f&&("auto"===g.overflowX||"scroll"===g.overflowX||"visible"===g.overflowX),M<p&&("auto"===g.overflowY||"scroll"===g.overflowY||"visible"===g.overflowY)):(b=N<f&&("auto"===g.overflowX||"scroll"===g.overflowX),M<p&&("auto"===g.overflowY||"scroll"===g.overflowY)),v=b&&(ut(x-l)<=r&&_+N<f)-(ut(E-l)<=r&&!!_),m=w&&(ut(C-s)<=r&&y+M<p)-(ut(T-s)<=r&&!!y),!I[h])for(var P=0;P<=h;P++)I[P]||(I[P]={});I[h].vx==v&&I[h].vy==m&&I[h].el===D||(I[h].el=D,I[h].vx=v,I[h].vy=m,clearInterval(I[h].pid),!D||0==v&&0==m||(d=!0,I[h].pid=setInterval(function(){n&&0===this.layer&&(mt.active._emulateDragOver(!0),mt.active._onTouchMove(k,!0));var t=I[this.layer].vy?I[this.layer].vy*a:0,e=I[this.layer].vx?I[this.layer].vx*a:0;"function"==typeof A&&"continue"!==A.call(i,e,t,o,k,I[this.layer].el)||ft(I[this.layer].el,e,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&u!==c&&(u=O(u,!1)));B=d}},30),L=function(){I.forEach(function(t){clearInterval(t.pid)}),I=[]},W=function(t){function s(a,l){return function(t,e,o,n){var i=t.options.group.name&&e.options.group.name&&t.options.group.name===e.options.group.name;if(null==a&&(l||i))return!0;if(null==a||!1===a)return!1;if(l&&"clone"===a)return a;if("function"==typeof a)return s(a(t,e,o,n),l)(t,e,o,n);var r=(l?t:e).options.group.name;return!0===a||"string"==typeof a&&a===r||a.join&&-1<a.indexOf(r)}}var e={},o=t.group;o&&"object"==typeof o||(o={name:o}),e.name=o.name,e.checkPull=s(o.pull,!0),e.checkPut=s(o.put),e.revertClone=o.revertClone,t.group=e},F=function(t){U&&U.parentNode&&U.parentNode[lt]&&U.parentNode[lt]._computeIsAligned(t)},pt=function(t,e){for(var o=e;!o[lt];)o=o.parentNode;return t===o},gt=function(t,e,o){for(var n=t.parentNode;n&&!n[lt];)n=n.parentNode;n&&n[lt][o](Bt(e,{artificialBubble:!0}))},z=function(){!C&&f&&Dt(f,"display","none")},j=function(){!C&&f&&Dt(f,"display","")};st.addEventListener("click",function(t){if(it)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),it=!1},!0);var vt,t=function(t){if(t=t.touches?t.touches[0]:t,U){var e=function(t,e){for(var o=0;o<d.length;o++)if(!Pt(d[o])){var n=Lt(d[o]),i=d[o][lt].options.emptyInsertThreshold,r=t>=n.left-i&&t<=n.right+i,a=e>=n.top-i&&e<=n.bottom+i;if(r&&a)return d[o]}}(t.clientX,t.clientY);e&&e[lt]._onDragOver({clientX:t.clientX,clientY:t.clientY,target:e,rootEl:e})}};function mt(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(t);this.el=t,this.options=e=Bt({},e),t[lt]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable3:/[uo]l/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return P(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,touchStartThreshold:w(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==mt.supportPointer&&("PointerEvent"in window||window.navigator&&"msPointerEnabled"in window.navigator),emptyInsertThreshold:5};for(var n in o)!(n in e)&&(e[n]=o[n]);for(var i in W(e),this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&a,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?wt(t,"pointerdown",this._onTapStart):(wt(t,"mousedown",this._onTapStart),wt(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(wt(t,"dragover",this),wt(t,"dragenter",this)),d.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[])}function bt(t,e,o,n){if(t){o=o||st;do{if(null!=e&&(">"===e[0]&&t.parentNode===o&&kt(t,e.substring(1))||kt(t,e))||n&&t===o)return t;if(t===o)break}while(t=(i=t).host&&i!==st&&i.host.nodeType?i.host:i.parentNode)}var i;return null}function wt(t,e,o){t.addEventListener(e,o,r)}function _t(t,e,o){t.removeEventListener(e,o,r)}function yt(t,e,o){if(t&&e)if(t.classList)t.classList[o?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(i," ").replace(" "+e+" "," ");t.className=(n+(o?" "+e:"")).replace(i," ")}}function Dt(t,e,o){var n=t&&t.style;if(n){if(void 0===o)return st.defaultView&&st.defaultView.getComputedStyle?o=st.defaultView.getComputedStyle(t,""):t.currentStyle&&(o=t.currentStyle),void 0===e?o:o[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=o+("string"==typeof o?"":"px")}}function St(t){var e="";do{var o=Dt(t,"transform");o&&"none"!==o&&(e=o+" "+e)}while(t=t.parentNode);return window.DOMMatrix?new DOMMatrix(e):window.WebKitCSSMatrix?new WebKitCSSMatrix(e):window.CSSMatrix?new CSSMatrix(e):void 0}function Tt(t,e,o){if(t){var n=t.getElementsByTagName(e),i=0,r=n.length;if(o)for(;i<r;i++)o(n[i],i);return n}return[]}function Ct(t,e,o,n,i,r,a,l,s){var c,d=(t=t||e[lt]).options,h="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||dt||_?(c=st.createEvent("Event")).initEvent(o,!0,!0):c=new CustomEvent(o,{bubbles:!0,cancelable:!0}),c.to=i||e,c.from=r||e,c.item=n||e,c.clone=u,c.oldIndex=a,c.newIndex=l,c.originalEvent=s,c.pullMode=Q?Q.lastPutMode:void 0,e&&e.dispatchEvent(c),d[h]&&d[h].call(t,c)}function Et(t,e,o,n,i,r,a,l){var s,c,d=t[lt],h=d.options.onMove;return!window.CustomEvent||dt||_?(s=st.createEvent("Event")).initEvent("move",!0,!0):s=new CustomEvent("move",{bubbles:!0,cancelable:!0}),s.to=e,s.from=t,s.dragged=o,s.draggedRect=n,s.related=i||e,s.relatedRect=r||Lt(e),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function xt(t){t.draggable3=!1}function Nt(){ht=!1}function Mt(t,e,o){for(var n=0,i=0,r=t.children;i<r.length;){if("none"!==r[i].style.display&&r[i]!==f&&r[i]!==U&&bt(r[i],o.draggable3,t,!1)){if(n===e)return r[i];n++}i++}return null}function Pt(t){for(var e=t.lastElementChild;e&&(e===f||"none"===e.style.display);)e=e.previousElementSibling;return e||null}function Xt(t){return At(U)<At(t)?1:-1}function Yt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,o=e.length,n=0;o--;)n+=e.charCodeAt(o);return n.toString(36)}function At(t,e){var o=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"!==t.nodeName.toUpperCase()&&t!==u&&o++;return o}function kt(t,e){if(t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}function It(o,n){return function(){if(!vt){var t=arguments,e=this;vt=ct(function(){1===t.length?o.call(e,t[0]):o.apply(e,t),vt=void 0},n)}}}function Bt(t,e){if(t&&e)for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}function Ot(t){return o&&o.dom?o.dom(t).cloneNode(!0):e?e(t).clone(!0)[0]:t.cloneNode(!0)}function Ht(t){return ct(t,0)}function Rt(t){return clearTimeout(t)}function Lt(t,e,o,n){if(t.getBoundingClientRect||t===b){var i,r,a,l,s,c,d;if(d=t!==b&&t!==H()?(r=(i=t.getBoundingClientRect()).top,a=i.left,l=i.bottom,s=i.right,c=i.height,i.width):(a=r=0,l=window.innerHeight,s=window.innerWidth,c=window.innerHeight,window.innerWidth),n&&t!==b&&(o=o||t.parentNode,!dt))do{if(o&&o.getBoundingClientRect&&"none"!==Dt(o,"transform")){var h=o.getBoundingClientRect();r-=h.top+w(Dt(o,"border-top-width")),a-=h.left+w(Dt(o,"border-left-width")),l=r+i.height,s=a+i.width;break}}while(o=o.parentNode);if(e&&t!==b){var u=St(o||t),f=u&&u.a,p=u&&u.d;u&&(l=(r/=p)+(c/=p),s=(a/=f)+(d/=f))}return{top:r,left:a,bottom:l,right:s,width:d,height:c}}}function Wt(t,e){for(var o=O(t,!0),n=Lt(t)[e];o;){var i=Lt(o)[e];if(!("top"===e||"left"===e?i<=n:n<=i))return o;if(o===H())break;o=O(o,!1)}return!1}function Ft(t){var e=0,o=0,n=H();if(t)do{var i=St(t),r=i.a,a=i.d;e+=t.scrollLeft*r,o+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,o]}return wt(st,"dragover",t),wt(st,"mousemove",t),wt(st,"touchmove",t),mt.prototype={constructor:mt,_computeIsAligned:function(t){var e;if(f&&!C?(z(),e=st.elementFromPoint(t.clientX,t.clientY),j()):e=t.target,e=bt(e,this.options.draggable3,this.el,!1),!E&&U&&U.parentNode===this.el){for(var o,n,i,r,a,l,s,c,d=this.el.children,h=0;h<d.length;h++)bt(d[h],this.options.draggable3,this.el,!1)&&d[h]!==e&&(d[h].sortableMouseAligned=(o=t.clientX,n=t.clientY,i=d[h],r=this._getDirection(t,null),this.options,void 0,a=Lt(i),l="vertical"===r?a.left:a.top,s="vertical"===r?a.right:a.bottom,l<(c="vertical"===r?o:n)&&c<s));bt(e,this.options.draggable3,this.el,!0)||($=null),E=!0,ct(function(){E=!1},30)}},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,U):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e,o=this,n=this.el,i=this.options,r=i.preventOnFilter,a=t.type,l=t.touches&&t.touches[0],s=(l||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,d=i.filter;if(function(t){M.length=0;var e=t.getElementsByTagName("input"),o=e.length;for(;o--;){var n=e[o];n.checked&&M.push(n)}}(n),(!dt||t.artificialBubble||pt(n,s))&&!U&&!(/mousedown|pointerdown/.test(a)&&0!==t.button||i.disabled||c.isContentEditable))if(s=bt(s,i.draggable3,n,!1)){if(h!==s){if(e=At(s,i.draggable3),"function"==typeof d){if(d.call(this,t,s,this))return Ct(o,c,"filter",s,n,n,e),void(r&&t.cancelable&&t.preventDefault())}else if(d&&(d=d.split(",").some(function(t){if(t=bt(c,t.trim(),n,!1))return Ct(o,t,"filter",s,n,n,e),!0})))return void(r&&t.cancelable&&t.preventDefault());i.handle&&!bt(c,i.handle,n,!1)||this._prepareDragStart(t,l,s,e)}}else dt&&gt(n,t,"_onTapStart")}},_handleAutoScroll:function(e,o){if(U&&this.options.scroll){var n=e.clientX,i=e.clientY,t=st.elementFromPoint(n,i),r=this;if(o||_||dt||D){R(e,r.options,t,o);var a=O(t,!0);!B||l&&n===s&&i===c||(l&&clearInterval(l),l=setInterval(function(){if(U){var t=O(st.elementFromPoint(n,i),!0);t!==a&&(a=t,L(),R(e,r.options,a,o))}},10),s=n,c=i)}else{if(!r.options.bubbleScroll||O(t,!0)===H())return void L();R(e,r.options,O(t,!1),!1)}}},_prepareDragStart:function(t,e,o,n){var i,r=this,a=r.el,l=r.options,s=a.ownerDocument;o&&!U&&o.parentNode===a&&(q=a,V=(U=o).parentNode,G=U.nextSibling,h=o,Z=l.group,K=n,p={target:U,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,U.style["will-change"]="all",U.style.transition="",U.style.transform="",i=function(){r._disableDelayedDragEvents(),!y&&r.nativeDraggable&&(U.draggable3=!0),r._triggerDragStart(t,e),Ct(r,q,"choose",U,q,q,K),yt(U,l.chosenClass,!0)},l.ignore.split(",").forEach(function(t){Tt(U,t.trim(),xt)}),l.supportPointer?wt(s,"pointerup",r._onDrop):(wt(s,"mouseup",r._onDrop),wt(s,"touchend",r._onDrop),wt(s,"touchcancel",r._onDrop)),y&&this.nativeDraggable&&(this.options.touchStartThreshold=4,U.draggable3=!0),!l.delay||this.nativeDraggable&&(_||dt)?i():(wt(s,"mouseup",r._disableDelayedDrag),wt(s,"touchend",r._disableDelayedDrag),wt(s,"touchcancel",r._disableDelayedDrag),wt(s,"mousemove",r._delayedDragTouchMoveHandler),wt(s,"touchmove",r._delayedDragTouchMoveHandler),l.supportPointer&&wt(s,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=ct(i,l.delay)))},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;N(ut(e.clientX-this._lastX),ut(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){U&&xt(U),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;_t(t,"mouseup",this._disableDelayedDrag),_t(t,"touchend",this._disableDelayedDrag),_t(t,"touchcancel",this._disableDelayedDrag),_t(t,"mousemove",this._delayedDragTouchMoveHandler),_t(t,"touchmove",this._delayedDragTouchMoveHandler),_t(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||("touch"==t.pointerType?t:null),!this.nativeDraggable||e?this.options.supportPointer?wt(st,"pointermove",this._onTouchMove):wt(st,e?"touchmove":"mousemove",this._onTouchMove):(wt(U,"dragend",this),wt(q,"dragstart",this._onDragStart));try{st.selection?Ht(function(){st.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(v=!1,q&&U){this.nativeDraggable&&(wt(st,"dragover",this._handleAutoScroll),wt(st,"dragover",F));var o=this.options;!t&&yt(U,o.dragClass,!1),yt(U,o.ghostClass,!0),Dt(U,"transform",""),mt.active=this,t&&this._appendGhost(),Ct(this,q,"start",U,q,q,K,void 0,e)}else this._nulling()},_emulateDragOver:function(t){if(k){if(this._lastX===k.clientX&&this._lastY===k.clientY&&!t)return;this._lastX=k.clientX,this._lastY=k.clientY,z();for(var e=st.elementFromPoint(k.clientX,k.clientY),o=e;e&&e.shadowRoot;)o=e=e.shadowRoot.elementFromPoint(k.clientX,k.clientY);if(o)do{if(o[lt])if(o[lt]._onDragOver({clientX:k.clientX,clientY:k.clientY,target:e,rootEl:o})&&!this.options.dragoverBubble)break;e=o}while(o=o.parentNode);U.parentNode[lt]._computeIsAligned(k),j()}},_onTouchMove:function(t,e){if(p){var o=this.options,n=o.fallbackTolerance,i=o.fallbackOffset,r=t.touches?t.touches[0]:t,a=f&&St(f),l=f&&a&&a.a,s=f&&a&&a.d,c=S&&g&&Ft(g),d=(r.clientX-p.clientX+i.x)/(l||1)+(c?c[0]-m[0]:0)/(l||1),h=(r.clientY-p.clientY+i.y)/(s||1)+(c?c[1]-m[1]:0)/(s||1),u=t.touches?"translate3d("+d+"px,"+h+"px,0)":"translate("+d+"px,"+h+"px)";if(!mt.active&&!v){if(n&&x(ut(r.clientX-this._lastX),ut(r.clientY-this._lastY))<n)return;this._onDragStart(t,!0)}!e&&this._handleAutoScroll(r,!0),J=!0,k=r,Dt(f,"webkitTransform",u),Dt(f,"mozTransform",u),Dt(f,"msTransform",u),Dt(f,"transform",u),t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!f){var t=this.options.fallbackOnBody?st.body:q,e=Lt(U,!0,t,!S),o=(Dt(U),this.options);if(S){for(g=t;"static"===Dt(g,"position")&&"none"===Dt(g,"transform")&&g!==st;)g=g.parentNode;if(g!==st){var n=Lt(g,!0);e.top-=n.top,e.left-=n.left}g!==st.body&&g!==st.documentElement?(g===st&&(g=H()),e.top+=g.scrollTop,e.left+=g.scrollLeft):g=H(),m=Ft(g)}yt(f=U.cloneNode(!0),o.ghostClass,!1),yt(f,o.fallbackClass,!0),yt(f,o.dragClass,!0),Dt(f,"box-sizing","border-box"),Dt(f,"margin",0),Dt(f,"top",e.top),Dt(f,"left",e.left),Dt(f,"width",e.width),Dt(f,"height",e.height),Dt(f,"opacity","0.8"),Dt(f,"position",S?"absolute":"fixed"),Dt(f,"zIndex","100000"),Dt(f,"pointerEvents","none"),t.appendChild(f)}},_onDragStart:function(t,e){var o=this,n=t.dataTransfer,i=o.options;(u=Ot(U)).draggable3=!1,u.style["will-change"]="",this._hideClone(),yt(u,o.options.chosenClass,!1),o._cloneId=Ht(function(){o.options.removeCloneOnHide||q.insertBefore(u,U),Ct(o,q,"clone",U)}),!e&&yt(U,i.dragClass,!0),e?(it=!0,o._loopId=setInterval(o._emulateDragOver,50)):(_t(st,"mouseup",o._onDrop),_t(st,"touchend",o._onDrop),_t(st,"touchcancel",o._onDrop),n&&(n.effectAllowed="move",i.setData&&i.setData.call(o,n,U)),wt(st,"drop",o),Dt(U,"transform","translateZ(0)")),v=!0,o._dragStartId=Ht(o._dragStarted.bind(o,e,t)),wt(st,"selectstart",o),D&&Dt(st.body,"user-select","none")},_onDragOver:function(e){var o,n,t,i=this.el,r=e.target,a=this.options,l=a.group,s=mt.active,c=Z===l,d=a.sort,h=this;if(!ht&&(!dt||e.rootEl||e.artificialBubble||pt(i,r))){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),J=!0,r=bt(r,a.draggable3,i,!0),bt(e.target,null,U,!0)||r.animated)return z(!1);if(r!==U&&(it=!1),s&&!a.disabled&&(c?d||(t=!q.contains(U)):Q===this||(this.lastPutMode=Z.checkPull(this,s,U,e))&&l.checkPut(this,s,U,e))){var u=this._getDirection(e,r);if(o=Lt(U),t)return this._hideClone(),V=q,G?q.insertBefore(U,G):q.appendChild(U),z(!0);var f=Pt(i);if(f&&(I=e,B=u,O=Lt(Pt(i)),H="vertical"===B?I.clientY:I.clientX,R="vertical"===B?I.clientX:I.clientY,L="vertical"===B?O.bottom:O.right,W="vertical"===B?O.left:O.top,F="vertical"===B?O.right:O.bottom,!("vertical"===B?F+10<R||R<=F&&L<H&&W<=R:L<H&&W<R||H<=L&&F+10<R)||f.animated)){if(r&&r!==U&&r.parentNode===i){var p,g=0,v=r.sortableMouseAligned,m=U.parentNode!==i,b="vertical"===u?"top":"left",w=Wt(r,"top")||Wt(U,"top"),_=w?w.scrollTop:void 0;if($!==r&&(et=null,p=Lt(r)[b],rt=!1),C=r,E=u,x=(T=U)===U&&nt||Lt(T),N=C===U&&nt||Lt(C),M="vertical"===E?x.left:x.top,P="vertical"===E?x.right:x.bottom,X="vertical"===E?x.width:x.height,Y="vertical"===E?N.left:N.top,A="vertical"===E?N.right:N.bottom,k="vertical"===E?N.width:N.height,et=(M===Y||P===A||M+X/2===Y+k/2)&&v||m||w||a.invertSwap||"insert"===et||"swap"===et?("swap"!==et&&(at=a.invertSwap||m),g=function(t,e,o,n,i,r,a){var l=Lt(e),s="vertical"===o?t.clientY:t.clientX,c="vertical"===o?l.height:l.width,d="vertical"===o?l.top:l.left,h="vertical"===o?l.bottom:l.right,u=Lt(U),f=!1;if(!r)if(a&&ot<c*n)if(!rt&&(1===tt?d+c*i/2<s:s<h-c*i/2)&&(rt=!0),rt)f=!0;else{"vertical"===o?u.top:u.left,"vertical"===o?u.bottom:u.right;if(1===tt?s<d+ot:h-ot<s)return-1*tt}else if(d+c*(1-n)/2<s&&s<h-c*(1-n)/2)return Xt(e);if((f=f||r)&&(s<d+c*i/2||h-c*i/2<s))return d+c/2<s?1:-1;return 0}(e,r,u,a.swapThreshold,null==a.invertedSwapThreshold?a.swapThreshold:a.invertedSwapThreshold,at,$===r),"swap"):(g=Xt(r),"insert"),0===g)return z(!1);nt=null,tt=g,n=Lt($=r);var y=r.nextElementSibling,D=!1,S=Et(q,i,U,o,r,n,e,D=1===g);if(!1!==S)return 1!==S&&-1!==S||(D=1===S),ht=!0,ct(Nt,30),c?s._hideClone():s._showClone(this),D&&!y?i.appendChild(U):r.parentNode.insertBefore(U,D?y:r),w&&ft(w,0,_-w.scrollTop),V=U.parentNode,void 0===p||at||(ot=ut(p-Lt(r)[b])),j(),z(!0)}}else if(f&&i===e.target&&(r=f),r&&(n=Lt(r)),c?s._hideClone():s._showClone(this),!1!==Et(q,i,U,o,r,n,e,!!r))return i.appendChild(U),V=i,nt=null,j(),z(!0);if(i.contains(U))return z(!1)}var T,C,E,x,N,M,P,X,Y,A,k,I,B,O,H,R,L,W,F;return dt&&!e.rootEl&&gt(i,e,"_onDragOver"),!1}function z(t){return t&&(c?s._hideClone():s._showClone(h),s&&(yt(U,Q?Q.options.ghostClass:s.options.ghostClass,!1),yt(U,a.ghostClass,!0)),Q!==h&&h!==mt.active?Q=h:h===mt.active&&(Q=null),o&&h._animate(o,U),r&&n&&h._animate(n,r)),(r===U&&!U.animated||r===i&&!r.animated)&&($=null),a.dragoverBubble||e.rootEl||r===st||(h._handleAutoScroll(e),U.parentNode[lt]._computeIsAligned(e)),!a.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function j(){Ct(h,q,"change",r,i,q,K,At(U,a.draggable3),e)}},_animate:function(t,e){var o=this.options.animation;if(o){var n=Lt(e);if(e===U&&(nt=n),1===t.nodeType&&(t=Lt(t)),t.left+t.width/2!==n.left+n.width/2||t.top+t.height/2!==n.top+n.height/2){var i=St(this.el),r=i&&i.a,a=i&&i.d;Dt(e,"transition","none"),Dt(e,"transform","translate3d("+(t.left-n.left)/(r||1)+"px,"+(t.top-n.top)/(a||1)+"px,0)"),e.offsetWidth,Dt(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),Dt(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=ct(function(){Dt(e,"transition",""),Dt(e,"transform",""),e.animated=!1},o)}},_offUpEvents:function(){var t=this.el.ownerDocument;_t(st,"touchmove",this._onTouchMove),_t(st,"pointermove",this._onTouchMove),_t(t,"mouseup",this._onDrop),_t(t,"touchend",this._onDrop),_t(t,"pointerup",this._onDrop),_t(t,"touchcancel",this._onDrop),_t(st,"selectstart",this)},_onDrop:function(t){var e=this.el,o=this.options;rt=at=B=v=!1,clearInterval(this._loopId),clearInterval(l),L(),clearTimeout(vt),vt=void 0,clearTimeout(this._dragStartTimer),Rt(this._cloneId),Rt(this._dragStartId),_t(st,"mousemove",this._onTouchMove),this.nativeDraggable&&(_t(st,"drop",this),_t(e,"dragstart",this._onDragStart),_t(st,"dragover",this._handleAutoScroll),_t(st,"dragover",F)),D&&Dt(st.body,"user-select",""),this._offUpEvents(),t&&(J&&(t.cancelable&&t.preventDefault(),!o.dropBubble&&t.stopPropagation()),f&&f.parentNode&&f.parentNode.removeChild(f),(q===V||Q&&"clone"!==Q.lastPutMode)&&u&&u.parentNode&&u.parentNode.removeChild(u),U&&(this.nativeDraggable&&_t(U,"dragend",this),xt(U),U.style["will-change"]="",yt(U,Q?Q.options.ghostClass:this.options.ghostClass,!1),yt(U,this.options.chosenClass,!1),Ct(this,q,"unchoose",U,V,q,K,null,t),q!==V?(0<=(n=At(U,o.draggable3))&&(Ct(null,V,"add",U,V,q,K,n,t),Ct(this,q,"remove",U,V,q,K,n,t),Ct(null,V,"sort",U,V,q,K,n,t),Ct(this,q,"sort",U,V,q,K,n,t)),Q&&Q.save()):U.nextSibling!==G&&0<=(n=At(U,o.draggable3))&&(Ct(this,q,"update",U,V,q,K,n,t),Ct(this,q,"sort",U,V,q,K,n,t)),mt.active&&(null!=n&&-1!==n||(n=K),Ct(this,q,"end",U,V,q,K,n,t),this.save()))),this._nulling()},_nulling:function(){q=U=V=f=G=u=h=X=Y=I.length=l=s=c=p=k=J=n=K=$=tt=nt=Q=Z=mt.active=null,M.forEach(function(t){t.checked=!0}),M.length=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":U&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],o=this.el.children,n=0,i=o.length,r=this.options;n<i;n++)bt(t=o[n],r.draggable3,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Yt(t));return e},sort:function(t){var n={},i=this.el;this.toArray().forEach(function(t,e){var o=i.children[e];bt(o,this.options.draggable3,i,!1)&&(n[t]=o)},this),t.forEach(function(t){n[t]&&(i.removeChild(n[t]),i.appendChild(n[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return bt(t,e||this.options.draggable3,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&W(o)},destroy:function(){var t=this.el;t[lt]=null,_t(t,"mousedown",this._onTapStart),_t(t,"touchstart",this._onTapStart),_t(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(_t(t,"dragover",this),_t(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable3]"),function(t){t.removeAttribute("draggable3")}),this._onDrop(),d.splice(d.indexOf(this.el),1),this.el=t=null},_hideClone:function(){u.cloneHidden||(Dt(u,"display","none"),u.cloneHidden=!0,u.parentNode&&this.options.removeCloneOnHide&&u.parentNode.removeChild(u))},_showClone:function(t){"clone"===t.lastPutMode?u.cloneHidden&&(q.contains(U)&&!this.options.group.revertClone?q.insertBefore(u,U):G?q.insertBefore(u,G):q.appendChild(u),this.options.group.revertClone&&this._animate(U,u),Dt(u,"display",""),u.cloneHidden=!1):this._hideClone()}},wt(st,"touchmove",function(t){(mt.active||v)&&t.cancelable&&t.preventDefault()}),mt.utils={on:wt,off:_t,css:Dt,find:Tt,is:function(t,e){return!!bt(t,e,t,!1)},extend:Bt,throttle:It,closest:bt,toggleClass:yt,clone:Ot,index:At,nextTick:Ht,cancelNextTick:Rt,detectDirection:P,getChild:Mt},mt.create=function(t,e){return new mt(t,e)},mt.version="1.8.4",mt});