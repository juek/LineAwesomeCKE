﻿/* see ./src/plugin.js for uncompressed version */
"use strict";!function(){var s=15;function t(e){var t,r,i,d,a,s,n,o,l,c,u,f,p,g,h,m;this.editor=e,this.registered={},this.instances={},this.selected=[],this.focused=null,this.widgetHoldingFocusedEditable=null,this._={nextId:0,upcasts:[],upcastCallbacks:[],filters:{}},(o=(a=t=this).editor).on("toHtml",function(e){var t,i,o,d,l,n=(o=[],d=(i=a)._.upcasts,l=i._.upcastCallbacks,{toBeWrapped:o,iterator:function(e){var t,i,n,a,r,s;if("data-cke-widget-wrapper"in e.attributes)return(e=e.getFirst(E.isParserWidgetElement))&&o.push([e]),!1;if("data-widget"in e.attributes)return o.push([e]),!1;if(r=d.length){if(e.attributes["data-cke-widget-upcasted"])return!1;for(a=0,s=l.length;a<s;++a)if(!1===l[a](e))return;for(a=0;a<r;++a)if(t=d[a],n={},i=t[0](e,n))return i instanceof CKEDITOR.htmlParser.element&&(e=i),e.attributes["data-cke-widget-data"]=encodeURIComponent(JSON.stringify(n)),e.attributes["data-cke-widget-upcasted"]=1,o.push([e,t[1]]),!1}}});for(e.data.dataValue.forEach(n.iterator,CKEDITOR.NODE_ELEMENT,!0);t=n.toBeWrapped.pop();)k(t[0]),a.wrapElement(t[0],t[1]);s=e.data.protectedWhitespaces?3==e.data.dataValue.children.length&&E.isParserWidgetWrapper(e.data.dataValue.children[1]):1==e.data.dataValue.children.length&&E.isParserWidgetWrapper(e.data.dataValue.children[0])},null,null,8),o.on("dataReady",function(){n&&function(e,t){for(var i,n,a=t.find(".cke_widget_wrapper"),r=0,s=a.count();r<s;++r)i=a.getItem(r),(n=i.getFirst(E.isDomWidgetElement)).type==CKEDITOR.NODE_ELEMENT&&n.data("widget")?(n.replace(i),e.wrapElement(n)):i.remove()}(a,o.editable()),n=0,a.destroyAll(!0),a.initOnAll()}),o.on("loadSnapshot",function(e){/data-cke-widget/.test(e.data)&&(n=1),a.destroyAll(!0)},null,null,9),o.on("paste",function(e){var t=e.data;if(t.dataValue=t.dataValue.replace(C,D),t.range){var i=E.getNestedEditable(o.editable(),t.range.startContainer);if(i){var n=CKEDITOR.filter.instances[i.data("cke-filter")];n&&o.setActiveFilter(n)}}}),o.on("afterInsertHtml",function(e){e.data.intoRange?a.checkWidgets({initOnlyNew:!0}):(o.fire("lockSnapshot"),a.checkWidgets({initOnlyNew:!0,focusInited:s}),o.fire("unlockSnapshot"))}),i=(r=t).editor,d={},i.on("toDataFormat",function(e){var t=CKEDITOR.tools.getNextNumber(),a=[];e.data.downcastingSessionId=t,d[t]=a,e.data.dataValue.forEach(function(e){var t,i,n=e.attributes;if("data-cke-widget-id"in n)(t=r.instances[n["data-cke-widget-id"]])&&(i=e.getFirst(E.isParserWidgetElement),a.push({wrapper:e,element:i,widget:t,editables:{}}),"1"!=i.attributes["data-cke-widget-keep-attr"]&&delete i.attributes["data-widget"]);else if("data-cke-widget-editable"in n)return a[a.length-1].editables[n["data-cke-widget-editable"]]=e,!1},CKEDITOR.NODE_ELEMENT,!0)},null,null,8),i.on("toDataFormat",function(e){if(e.data.downcastingSessionId)for(var t,i,n,a,r,s,o=d[e.data.downcastingSessionId];t=o.shift();){for(s in i=t.widget,n=t.element,a=i._.downcastFn&&i._.downcastFn.call(i,n),t.editables)delete(r=t.editables[s]).attributes.contenteditable,r.setHtml(i.editables[s].getData());a||(a=n),t.wrapper.replaceWith(a)}},null,null,13),i.on("contentDomUnload",function(){r.destroyAll(!0)}),t.on("checkWidgets",v),t.editor.on("contentDomInvalidated",t.checkWidgets,t),(c=(l=this).editor).on("selectionCheck",function(){l.fire("checkSelection")}),l.on("checkSelection",l.checkSelection,l),c.on("selectionChange",function(e){var t=E.getNestedEditable(c.editable(),e.data.selection.getStartElement()),i=t&&l.getByElement(t),n=l.widgetHoldingFocusedEditable;n?n===i&&n.focusedEditable.equals(t)||(b(l,n,null),i&&t&&b(l,i,t)):i&&t&&b(l,i,t)}),c.on("dataReady",function(){_(l).commit()}),c.on("blur",function(){var e;(e=l.focused)&&w(l,e),(e=l.widgetHoldingFocusedEditable)&&b(l,e,null)}),(f=(u=this).editor).on("contentDom",function(){var i,n,e=f.editable(),t=e.isInline()?e:f.document;e.attachListener(t,"mousedown",function(e){var t=e.data.getTarget();if(!t.type)return!1;if(i=u.getByElement(t),n=0,i){if(i.inline&&t.type==CKEDITOR.NODE_ELEMENT&&t.hasAttribute("data-cke-widget-drag-handler"))return n=1,void(u.focused!=i&&f.getSelection().removeAllRanges());E.getNestedEditable(i.wrapper,t)?i=null:(e.data.preventDefault(),CKEDITOR.env.ie||i.focus())}}),e.attachListener(t,"mouseup",function(){n&&i&&i.wrapper&&(n=0,i.focus())}),CKEDITOR.env.ie&&e.attachListener(t,"mouseup",function(){setTimeout(function(){i&&i.wrapper&&e.contains(i.wrapper)&&(i.focus(),i=null)})})}),f.on("doubleclick",function(e){var t=u.getByElement(e.data.element);if(t&&!E.getNestedEditable(t.wrapper,e.data.element))return t.fire("doubleclick",{element:e.data.element})},null,null,1),(p=this).editor.on("key",function(e){var t,i=p.focused,n=p.widgetHoldingFocusedEditable;return i?t=i.fire("key",{keyCode:e.data.keyCode}):n&&(t=function(e,t){var i,n=e.focusedEditable;if(t==CKEDITOR.CTRL+65){var a=n.getBogus();return(i=e.editor.createRange()).selectNodeContents(n),a&&i.setEndAt(a,CKEDITOR.POSITION_BEFORE_START),i.select(),!1}if(8==t||46==t){var r=e.editor.getSelection().getRanges();return i=r[0],!(1==r.length&&i.collapsed&&i.checkBoundaryOfElement(n,CKEDITOR[8==t?"START":"END"]))}}(n,e.data.keyCode)),t},null,null,1),h=(g=this).editor,m=CKEDITOR.plugins.lineutils,h.on("dragstart",function(e){var t=e.data.target;if(E.isDomDragHandler(t)){var i=g.getByElement(t);e.data.dataTransfer.setData("cke/widget-id",i.id),h.focus(),i.focus()}}),h.on("drop",function(e){var t,i=e.data.dataTransfer,n=i.getData("cke/widget-id"),a=i.getTransferType(h),r=h.createRange();""===n||a!==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?""!==n&&a==CKEDITOR.DATA_TRANSFER_INTERNAL&&(t=g.instances[n])&&(r.setStartBefore(t.wrapper),r.setEndAfter(t.wrapper),e.data.dragRange=r,delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount,delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,e.data.dataTransfer.setData("text/html",h.editable().getHtmlFromRange(r).getHtml()),h.widgets.destroy(t,!0)):e.cancel()}),h.on("contentDom",function(){var r=h.editable();CKEDITOR.tools.extend(g,{finder:new m.finder(h,{lookups:{default:function(e){if(!e.is(CKEDITOR.dtd.$listItem)&&e.is(CKEDITOR.dtd.$block)&&!E.isDomNestedEditable(e)&&!g._.draggedWidget.wrapper.contains(e)){var t=E.getNestedEditable(r,e);if(t){var i=g._.draggedWidget;if(g.getByElement(t)==i)return;var n=CKEDITOR.filter.instances[t.data("cke-filter")],a=i.requiredContent;if(n&&a&&!n.check(a))return}return CKEDITOR.LINEUTILS_BEFORE|CKEDITOR.LINEUTILS_AFTER}}}}),locator:new m.locator(h),liner:new m.liner(h,{lineStyle:{cursor:"move !important","border-top-color":"#666"},tipLeftStyle:{"border-left-color":"#666"},tipRightStyle:{"border-right-color":"#666"}})},!0)}),function(t){var i=t.editor;function n(e){t.focused&&y(t.focused,"cut"==e.name)}i.on("contentDom",function(){var e=i.editable();e.attachListener(e,"copy",n),e.attachListener(e,"cut",n)})}(this)}function E(e,t,i,n,a){var r=e.editor;CKEDITOR.tools.extend(this,n,{editor:r,id:t,inline:"span"==i.getParent().getName(),element:i,data:CKEDITOR.tools.extend({},"function"==typeof n.defaults?n.defaults():n.defaults),dataReady:!1,inited:!1,ready:!1,edit:E.prototype.edit,focusedEditable:null,definition:n,repository:e,draggable:!1!==n.draggable,_:{downcastFn:n.downcast&&"string"==typeof n.downcast?n.downcasts[n.downcast]:n.downcast}},!0),e.fire("instanceCreated",this),function(i,e){r=i,(r.wrapper=r.element.getParent()).setAttribute("data-cke-widget-id",r.id),function(e){if(e.parts){var t,i,n={};for(i in e.parts)t=e.wrapper.findOne(e.parts[i]),n[i]=t;e.parts=n}}(i),function(e){var t,i,n=e.editables;if(e.editables={},e.editables)for(t in n)i=n[t],e.initEditable(t,"string"==typeof i?{selector:i}:i)}(i),function(e){if(e.mask){var t=e.wrapper.findOne(".cke_widget_mask");t||((t=new CKEDITOR.dom.element("img",e.editor.document)).setAttributes({src:CKEDITOR.tools.transparentImageData,class:"cke_reset cke_widget_mask"}),e.wrapper.append(t)),e.mask=t}}(i),function(e){if(e.draggable){var t,i=e.editor,n=e.wrapper.getLast(E.isDomDragHandlerContainer);n?t=n.findOne("img"):((n=new CKEDITOR.dom.element("span",i.document)).setAttributes({class:"cke_reset cke_widget_drag_handler_container",style:"background:rgba(220,220,220,0.5);background-image:url("+i.plugins.widget.path+"images/handle.png)"}),(t=new CKEDITOR.dom.element("img",i.document)).setAttributes({class:"cke_reset cke_widget_drag_handler","data-cke-widget-drag-handler":"1",src:CKEDITOR.tools.transparentImageData,width:s,title:i.lang.widget.move,height:s,role:"presentation"}),e.inline&&t.setAttribute("draggable","true"),n.append(t),e.wrapper.append(n)),e.wrapper.on("dragover",function(e){e.data.preventDefault()}),e.wrapper.on("mouseenter",e.updateDragHandlerPosition,e),setTimeout(function(){e.on("data",e.updateDragHandlerPosition,e)},50),e.inline||(t.on("mousedown",h,e),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&t.on("dragstart",function(e){e.data.preventDefault(!0)})),e.dragHandlerContainer=n}}(i),n=i,a=null,n.on("data",function(){var e,t=this.data.classes;if(a!=t){for(e in a)t&&t[e]||this.removeClass(e);for(e in t)this.addClass(e);a=t}}),t=i,t.on("data",function(){if(t.wrapper){var e=this.getLabel?this.getLabel():function(){return this.editor.lang.widget.label.replace(/%1/,this.pathName||this.element.getName())}.call(this);t.wrapper.setAttribute("role","region"),t.wrapper.setAttribute("aria-label",e)}},null,null,9999),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&i.wrapper.on("dragstart",function(e){var t=e.data.getTarget();E.getNestedEditable(i,t)||i.inline&&E.isDomDragHandler(t)||e.data.preventDefault()});var t;var n,a;var r;i.wrapper.removeClass("cke_widget_new"),i.element.addClass("cke_widget_element"),i.on("key",function(e){var t=e.data.keyCode;if(13==t)i.edit();else{if(t==CKEDITOR.CTRL+67||t==CKEDITOR.CTRL+88)return void y(i,t==CKEDITOR.CTRL+88);if(t in u||CKEDITOR.CTRL&t||CKEDITOR.ALT&t)return}return!1},null,null,999),i.on("doubleclick",function(e){i.edit()&&e.cancel()}),e.data&&i.on("data",e.data);e.edit&&i.on("edit",e.edit)}(this,n),this.init&&this.init(),this.inited=!0,function(e,t){var i=e.element.data("cke-widget-data");i&&e.setData(JSON.parse(decodeURIComponent(i)));t&&e.setData(t);e.data.classes||e.setData("classes",e.getClasses());e.dataReady=!0,m(e),e.fire("data",e.data)}(this,a),this.isInited()&&r.editable().contains(this.wrapper)&&(this.ready=!0,this.fire("ready"))}function n(e,t,i){CKEDITOR.dom.element.call(this,t.$),this.editor=e,this._={};var n=this.filter=i.filter;CKEDITOR.dtd[this.getName()].p?(this.enterMode=n?n.getAllowedEnterMode(e.enterMode):e.enterMode,this.shiftEnterMode=n?n.getAllowedEnterMode(e.shiftEnterMode,!0):e.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR}function w(e,t){if(e.focused=null,t.isInited()){var i=t.editor.checkDirty();e.fire("widgetBlurred",{widget:t}),t.setFocused(!1),!i&&t.editor.resetDirty()}}function v(e){var t=e.data;if("wysiwyg"==this.editor.mode){var i,n,a,r,s=this.editor.editable(),o=this.instances;if(s){for(n in o)o[n].isReady()&&!s.contains(o[n].wrapper)&&this.destroy(o[n],!0);if(t&&t.initOnlyNew)i=this.initOnAll();else{var d=s.find(".cke_widget_wrapper");for(i=[],n=0,a=d.count();n<a;n++)r=d.getItem(n),!this.getByElement(r,!0)&&!l(r,c)&&s.contains(r)&&(r.addClass("cke_widget_new"),i.push(this.initOn(r.getFirst(E.isDomWidgetElement))))}t&&t.focusInited&&1==i.length&&i[0].focus()}}}function k(e){var t=e.parent;t.type==CKEDITOR.NODE_ELEMENT&&t.attributes["data-cke-widget-wrapper"]&&t.replaceWith(e)}function a(e,t,i){if(!i.allowedContent)return null;var n=this._.filters[e];n||(this._.filters[e]=n={});var a=n[t];return a||(n[t]=a=new CKEDITOR.filter(i.allowedContent)),a}function l(e,t){for(var i=e;i=i.getParent();)if(t(i))return!0;return!1}function o(e){return{tabindex:-1,contenteditable:"false","data-cke-widget-wrapper":1,"data-cke-filter":"off",class:"cke_widget_wrapper cke_widget_new cke_widget_"+(e?"inline":"block")}}function d(e,t){return"boolean"==typeof e.inline?e.inline:!!CKEDITOR.dtd.$inline[t]}function c(e){return e.hasAttribute("data-cke-temp")}function b(e,t,i,n){var a=e.editor;if(a.fire("lockSnapshot"),i){var r=i.data("cke-widget-editable"),s=t.editables[r];(e.widgetHoldingFocusedEditable=t).focusedEditable=s,i.addClass("cke_widget_editable_focused"),s.filter&&a.setActiveFilter(s.filter),a.setActiveEnterMode(s.enterMode,s.shiftEnterMode)}else n||t.focusedEditable.removeClass("cke_widget_editable_focused"),t.focusedEditable=null,e.widgetHoldingFocusedEditable=null,a.setActiveFilter(null),a.setActiveEnterMode(null,null);a.fire("unlockSnapshot")}CKEDITOR.plugins.add("widget",{lang:"af,ar,bg,ca,cs,cy,da,de,de-ch,el,en,en-gb,eo,es,eu,fa,fi,fr,gl,he,hr,hu,id,it,ja,km,ko,ku,lv,nb,nl,no,pl,pt,pt-br,ru,sk,sl,sq,sv,tr,tt,ug,uk,vi,zh,zh-cn",requires:"lineutils,clipboard",onLoad:function(){CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover>.cke_widget_element{outline:2px solid yellow;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid yellow}.cke_widget_wrapper.cke_widget_focused>.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #ace}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:"+s+"px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover>.cke_widget_drag_handler_container{height:"+s+"px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:"+s+"px;height:"+s+"px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}")},beforeInit:function(e){e.widgets=new t(e)},afterInit:function(e){!function(e){var t,i,n,a=e.widgets.registered;for(i in a)t=a[i],(n=t.button)&&e.ui.addButton&&e.ui.addButton(CKEDITOR.tools.capitalize(t.name,!0),{label:n,command:t.name,toolbar:"insert,10"})}(e),function(i){if(!i.contextMenu)return;i.contextMenu.addListener(function(e){var t=i.widgets.getByElement(e,!0);if(t)return t.fire("contextMenu",{})})}(e)}}),t.prototype={MIN_SELECTION_CHECK_INTERVAL:500,add:function(e,t){var i,c;return(t=CKEDITOR.tools.prototypedCopy(t)).name=e,t._=t._||{},this.editor.fire("widgetDefinition",t),t.template&&(t.template=new CKEDITOR.template(t.template)),i=this.editor,c=t,i.addCommand(c.name,{exec:function(a,e){var t=a.widgets.focused;if(t&&t.name==c.name)t.edit();else if(c.insert)c.insert();else if(c.template){var r,i="function"==typeof c.defaults?c.defaults():c.defaults,n=CKEDITOR.dom.element.createFromHtml(c.template.output(i)),s=a.widgets.wrapElement(n,c.name),o=new CKEDITOR.dom.documentFragment(s.getDocument());if(o.append(s),!(r=a.widgets.initOn(n,c,e&&e.startupData)))return void l();var d=r.once("edit",function(e){e.data.dialog?r.once("dialog",function(e){var t,i,n=e.data;t=n.once("ok",l,null,null,20),i=n.once("cancel",function(e){e.data&&!1===e.data.hide||a.widgets.destroy(r,!0)}),n.once("hide",function(){t.removeListener(),i.removeListener()})}):l()},null,null,999);r.edit(),d.removeListener()}function l(){a.widgets.finalizeCreation(o)}},allowedContent:c.allowedContent,requiredContent:c.requiredContent,contentForms:c.contentForms,contentTransformations:c.contentTransformations}),function(a,e){var t,i=e.upcast,n=e.upcastPriority||10;if(!i)return;if("string"==typeof i)for(t=i.split(",");t.length;)r(e.upcasts[t.pop()],e.name,n);else r(i,e.name,n);function r(e,t,i){var n=CKEDITOR.tools.getIndex(a._.upcasts,function(e){return e[2]>i});n<0&&(n=a._.upcasts.length),a._.upcasts.splice(n,0,[e,t,i])}}(this,t),this.registered[e]=t},addUpcastCallback:function(e){this._.upcastCallbacks.push(e)},checkSelection:function(){var e,t=this.editor.getSelection(),i=t.getSelectedElement(),n=_(this);if(i&&(e=this.getByElement(i,!0)))return n.focus(e).select(e).commit();var a=t.getRanges()[0];if(!a||a.collapsed)return n.commit();var r,s=new CKEDITOR.dom.walker(a);for(s.evaluator=E.isDomWidgetWrapper;r=s.next();)n.select(this.getByElement(r));n.commit()},checkWidgets:function(e){this.fire("checkWidgets",CKEDITOR.tools.copy(e||{}))},del:function(e){if(this.focused===e){var t,i=e.editor,n=i.createRange();(t=n.moveToClosestEditablePosition(e.wrapper,!0))||(t=n.moveToClosestEditablePosition(e.wrapper,!1)),t&&i.getSelection().selectRanges([n])}e.wrapper.remove(),this.destroy(e,!0)},destroy:function(e,t){this.widgetHoldingFocusedEditable===e&&b(this,e,null,t),e.destroy(t),delete this.instances[e.id],this.fire("instanceDestroyed",e)},destroyAll:function(e,t){var i,n,a=this.instances;if(!t||e)for(n in a)i=a[n],this.destroy(i,e);else for(var r=t.find(".cke_widget_wrapper"),s=r.count(),o=0;o<s;++o)(i=this.getByElement(r.getItem(o),!0))&&this.destroy(i)},finalizeCreation:function(e){var t=e.getFirst();if(t&&E.isDomWidgetWrapper(t)){this.editor.insertElement(t);var i=this.getByElement(t);i.ready=!0,i.fire("ready"),i.focus()}},getByElement:function(){var t={div:1,span:1};function a(e){return e.is(t)&&e.data("cke-widget-id")}return function(e,t){if(!e)return null;var i=a(e);if(!t&&!i)for(var n=this.editor.editable();(e=e.getParent())&&!e.equals(n)&&!(i=a(e)););return this.instances[i]||null}}(),initOn:function(e,t,i){if(t?"string"==typeof t&&(t=this.registered[t]):t=this.registered[e.data("widget")],!t)return null;var n=this.wrapElement(e,t.name);if(n){if(n.hasClass("cke_widget_new")){var a=new E(this,this._.nextId++,e,t,i);return a.isInited()?this.instances[a.id]=a:null}return this.getByElement(e)}return null},initOnAll:function(e){for(var t,i=(e||this.editor.editable()).find(".cke_widget_new"),n=[],a=i.count();a--;)(t=this.initOn(i.getItem(a).getFirst(E.isDomWidgetElement)))&&n.push(t);return n},onWidget:function(i){var n=Array.prototype.slice.call(arguments);for(var e in n.shift(),this.instances){var t=this.instances[e];t.name==i&&t.on.apply(t,n)}this.on("instanceCreated",function(e){var t=e.data;t.name==i&&t.on.apply(t,n)})},parseElementClasses:function(e){if(!e)return null;e=CKEDITOR.tools.trim(e).split(/\s+/);for(var t,i={},n=0;t=e.pop();)-1==t.indexOf("cke_")&&(i[t]=n=1);return n?i:null},wrapElement:function(e,t){var i,n,a=null;if(e instanceof CKEDITOR.dom.element){if(!(i=this.registered[t||e.data("widget")]))return null;if((a=e.getParent())&&a.type==CKEDITOR.NODE_ELEMENT&&a.data("cke-widget-wrapper"))return a;e.hasAttribute("data-cke-widget-keep-attr")||e.data("cke-widget-keep-attr",e.data("widget")?1:0),t&&e.data("widget",t),n=d(i,e.getName()),(a=new CKEDITOR.dom.element(n?"span":"div")).setAttributes(o(n)),a.data("cke-display-name",i.pathName?i.pathName:e.getName()),e.getParent(!0)&&a.replace(e),e.appendTo(a)}else if(e instanceof CKEDITOR.htmlParser.element){if(!(i=this.registered[t||e.attributes["data-widget"]]))return null;if((a=e.parent)&&a.type==CKEDITOR.NODE_ELEMENT&&a.attributes["data-cke-widget-wrapper"])return a;"data-cke-widget-keep-attr"in e.attributes||(e.attributes["data-cke-widget-keep-attr"]=e.attributes["data-widget"]?1:0),t&&(e.attributes["data-widget"]=t),n=d(i,e.name),(a=new CKEDITOR.htmlParser.element(n?"span":"div",o(n))).attributes["data-cke-display-name"]=i.pathName?i.pathName:e.name;var r,s=e.parent;s&&(r=e.getIndex(),e.remove()),a.add(e),s&&function e(t,i,n){if(t.type==CKEDITOR.NODE_ELEMENT){var a=CKEDITOR.dtd[t.name];if(a&&!a[n.name]){var r=t.split(i),s=t.parent;return i=r.getIndex(),t.children.length||(i-=1,t.remove()),r.children.length||r.remove(),e(s,i,n)}}t.add(n,i)}(s,r,a)}return a},_tests_createEditableFilter:a},CKEDITOR.event.implementOn(t.prototype),E.prototype={addClass:function(e){this.element.addClass(e)},applyStyle:function(e){i(this,e,1)},checkStyleActive:function(e){var t,i=f(e);if(!i)return!1;for(;t=i.pop();)if(!this.hasClass(t))return!1;return!0},destroy:function(e){if(this.fire("destroy"),this.editables)for(var t in this.editables)this.destroyEditable(t,e);e||("0"==this.element.data("cke-widget-keep-attr")&&this.element.removeAttribute("data-widget"),this.element.removeAttributes(["data-cke-widget-data","data-cke-widget-keep-attr"]),this.element.removeClass("cke_widget_element"),this.element.replace(this.wrapper)),this.wrapper=null},destroyEditable:function(e,t){var i=this.editables[e];i.removeListener("focus",g),i.removeListener("blur",r),this.editor.focusManager.remove(i),t||(this.repository.destroyAll(!1,i),i.removeClass("cke_widget_editable"),i.removeClass("cke_widget_editable_focused"),i.removeAttributes(["contenteditable","data-cke-widget-editable","data-cke-enter-mode"])),delete this.editables[e]},edit:function(){var e={dialog:this.dialog},n=this;return!(!1===this.fire("edit",e)||!e.dialog)&&(this.editor.openDialog(e.dialog,function(i){var e,t;!1!==n.fire("dialog",i)&&(e=i.on("show",function(){i.setupContent(n)}),t=i.on("ok",function(){var t,e=n.on("data",function(e){t=1,e.cancel()},null,null,0);n.editor.fire("saveSnapshot"),i.commitContent(n),e.removeListener(),t&&(n.fire("data",n.data),n.editor.fire("saveSnapshot"))}),i.once("hide",function(){e.removeListener(),t.removeListener()}))}),!0)},getClasses:function(){return this.repository.parseElementClasses(this.element.getAttribute("class"))},hasClass:function(e){return this.element.hasClass(e)},initEditable:function(e,t){var i=this._findOneNotNested(t.selector);return!(!i||!i.is(CKEDITOR.dtd.$editable))&&(i=new n(this.editor,i,{filter:a.call(this.repository,this.name,e,t)}),(this.editables[e]=i).setAttributes({contenteditable:"true","data-cke-widget-editable":e,"data-cke-enter-mode":i.enterMode}),i.filter&&i.data("cke-filter",i.filter.id),i.addClass("cke_widget_editable"),i.removeClass("cke_widget_editable_focused"),t.pathName&&i.data("cke-display-name",t.pathName),this.editor.focusManager.add(i),i.on("focus",g,this),CKEDITOR.env.ie&&i.on("blur",r,this),i._.initialSetData=!0,i.setData(i.getHtml()),!0)},_findOneNotNested:function(e){for(var t,i,n=this.wrapper.find(e),a=0;a<n.count();a++)if(i=(t=n.getItem(a)).getAscendant(E.isDomWidgetWrapper),this.wrapper.equals(i))return t;return null},isInited:function(){return!(!this.wrapper||!this.inited)},isReady:function(){return this.isInited()&&this.ready},focus:function(){var e=this.editor.getSelection();if(e){var t=this.editor.checkDirty();e.fake(this.wrapper),!t&&this.editor.resetDirty()}this.editor.focus()},removeClass:function(e){this.element.removeClass(e)},removeStyle:function(e){i(this,e,0)},setData:function(e,t){var i=this.data,n=0;if("string"==typeof e)i[e]!==t&&(i[e]=t,n=1);else{var a=e;for(e in a)i[e]!==a[e]&&(n=1,i[e]=a[e])}return n&&this.dataReady&&(m(this),this.fire("data",i)),this},setFocused:function(e){return this.wrapper[e?"addClass":"removeClass"]("cke_widget_focused"),this.fire(e?"focus":"blur"),this},setSelected:function(e){return this.wrapper[e?"addClass":"removeClass"]("cke_widget_selected"),this.fire(e?"select":"deselect"),this},updateDragHandlerPosition:function(){var e=this.editor,t=this.element.$,i=this._.dragHandlerOffset,n={x:t.offsetLeft,y:t.offsetTop-s};if(!i||n.x!=i.x||n.y!=i.y){var a=e.checkDirty();e.fire("lockSnapshot"),this.dragHandlerContainer.setStyles({top:n.y+"px",left:n.x+"px",display:"block"}),e.fire("unlockSnapshot"),!a&&e.resetDirty(),this._.dragHandlerOffset=n}}},CKEDITOR.event.implementOn(E.prototype),E.getNestedEditable=function(e,t){return!t||t.equals(e)?null:E.isDomNestedEditable(t)?t:E.getNestedEditable(e,t.getParent())},E.isDomDragHandler=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-drag-handler")},E.isDomDragHandlerContainer=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.hasClass("cke_widget_drag_handler_container")},E.isDomNestedEditable=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-editable")},E.isDomWidgetElement=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-widget")},E.isDomWidgetWrapper=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-wrapper")},E.isParserWidgetElement=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&!!e.attributes["data-widget"]},E.isParserWidgetWrapper=function(e){return e.type==CKEDITOR.NODE_ELEMENT&&!!e.attributes["data-cke-widget-wrapper"]},n.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype),{setData:function(e){this._.initialSetData||this.editor.widgets.destroyAll(!1,this),this._.initialSetData=!1,e=this.editor.dataProcessor.toHtml(e,{context:this.getName(),filter:this.filter,enterMode:this.enterMode}),this.setHtml(e),this.editor.widgets.initOnAll(this)},getData:function(){return this.editor.dataProcessor.toDataFormat(this.getHtml(),{context:this.getName(),filter:this.filter,enterMode:this.enterMode})}});var C=new RegExp('^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?</span>([\\s\\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?</span>(?:</(?:div|span)>)?(?:</(?:div|span)>)?$',"i");function D(e,t){return CKEDITOR.tools.trim(t)}function _(n){var a=n.selected,r=[],s=a.slice(0),o=null;return{select:function(e){CKEDITOR.tools.indexOf(a,e)<0&&r.push(e);var t=CKEDITOR.tools.indexOf(s,e);return 0<=t&&s.splice(t,1),this},focus:function(e){return o=e,this},commit:function(){var e,t,i=n.focused!==o;for(n.editor.fire("lockSnapshot"),i&&(e=n.focused)&&w(n,e);e=s.pop();)a.splice(CKEDITOR.tools.indexOf(a,e),1),e.isInited()&&(t=e.editor.checkDirty(),e.setSelected(!1),!t&&e.editor.resetDirty());for(i&&o&&(t=n.editor.checkDirty(),n.focused=o,n.fire("widgetFocused",{widget:o}),o.setFocused(!0),!t&&n.editor.resetDirty());e=r.pop();)a.push(e),e.setSelected(!0);n.editor.fire("unlockSnapshot")}}}var u={37:1,38:1,39:1,40:1,8:1,46:1};function i(e,t,i){var n,a=0,r=f(t),s=e.data.classes||{};if(r){for(s=CKEDITOR.tools.clone(s);n=r.pop();)i?s[n]||(a=s[n]=1):s[n]&&(delete s[n],a=1);a&&e.setData("classes",s)}}function p(e){e.cancel()}function y(e,t){var i=e.editor,n=i.document;if(!n.getById("cke_copybin")){var a=i.blockless||CKEDITOR.env.ie?"span":"div",r=n.createElement(a),s=n.createElement(a),o=CKEDITOR.env.ie&&CKEDITOR.env.version<9;s.setAttributes({id:"cke_copybin","data-cke-temp":"1"}),r.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),r.setStyle("ltr"==i.config.contentsLangDirection?"left":"right","-5000px");var d=i.createRange();d.setStartBefore(e.wrapper),d.setEndAfter(e.wrapper),r.setHtml('<span data-cke-copybin-start="1">​</span>'+i.editable().getHtmlFromRange(d).getHtml()+'<span data-cke-copybin-end="1">​</span>'),i.fire("saveSnapshot"),i.fire("lockSnapshot"),s.append(r),i.editable().append(s);var l=i.on("selectionChange",p,null,null,0),c=e.repository.on("checkSelection",p,null,null,0);if(o)var u=n.getDocumentElement().$,f=u.scrollTop;(d=i.createRange()).selectNodeContents(r),d.select(),o&&(u.scrollTop=f),setTimeout(function(){t||e.focus(),s.remove(),l.removeListener(),c.removeListener(),i.fire("unlockSnapshot"),t&&(e.repository.del(e),i.fire("saveSnapshot"))},100)}}function f(e){var t=e.getDefinition().attributes,i=t&&t.class;return i?i.split(/\s+/):null}function r(){var e=CKEDITOR.document.getActive(),t=this.editor,i=t.editable();(i.isInline()?i:t.document.getWindow().getFrame()).equals(e)&&t.focusManager.focus(i)}function g(){CKEDITOR.env.gecko&&this.editor.unlockSelection(),CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),this.editor.selectionChange(1))}function h(t){var e,i,n=this.repository.finder,a=this.repository.locator,r=this.repository.liner,s=this.editor,o=s.editable(),d=[],l=[];this.repository._.draggedWidget=this;var c=n.greedySearch(),u=CKEDITOR.tools.eventsBuffer(50,function(){e=a.locate(c),(l=a.sort(i,1)).length&&(r.prepare(c,e),r.placeLine(l[0]),r.cleanup())});function f(){var e;for(u.reset();e=d.pop();)e.removeListener();(function(e,t){var i=this.repository.finder,n=this.repository.liner,a=this.editor,r=this.editor.editable();if(!CKEDITOR.tools.isEmpty(n.visible)){var s=i.getRange(e[0]);this.focus(),a.fire("drop",{dropRange:s,target:s.startContainer})}r.removeClass("cke_widget_dragging"),n.hideVisible(),a.fire("dragend",{target:t})}).call(this,l,t.sender)}o.addClass("cke_widget_dragging"),d.push(o.on("mousemove",function(e){i=e.data.$.clientY,u.input()})),s.fire("dragstart",{target:t.sender}),d.push(s.document.once("mouseup",f,this)),o.isInline()||d.push(CKEDITOR.document.once("mouseup",f,this))}function m(e){e.element.data("cke-widget-data",encodeURIComponent(JSON.stringify(e.data)))}!function(){function e(){}function t(e,t,i){if(!i)return!1;if(!this.checkElement(e))return!1;var n=i.widgets.getByElement(e,!0);return n&&n.checkStyleActive(this)}CKEDITOR.style.addCustomHandler({type:"widget",setup:function(e){this.widget=e.widget},apply:function(e){e instanceof CKEDITOR.editor&&this.checkApplicable(e.elementPath(),e)&&e.widgets.focused.applyStyle(this)},remove:function(e){e instanceof CKEDITOR.editor&&this.checkApplicable(e.elementPath(),e)&&e.widgets.focused.removeStyle(this)},checkActive:function(e,t){return this.checkElementMatch(e.lastElement,0,t)},checkApplicable:function(e,t){return t instanceof CKEDITOR.editor&&this.checkElement(e.lastElement)},checkElementMatch:t,checkElementRemovable:t,checkElement:function(e){if(!E.isDomWidgetWrapper(e))return!1;var t=e.getFirst(E.isDomWidgetElement);return t&&t.data("widget")==this.widget},buildPreview:function(e){return e||this._.definition.name},toAllowedContentRules:function(e){if(!e)return null;var t,i=e.widgets.registered[this.widget],n={};return i?i.styleableElements?(t=this.getClassesArray())?(n[i.styleableElements]={classes:t,propertiesOnly:!0},n):null:i.styleToAllowedContentRules?i.styleToAllowedContentRules(this):null:null},getClassesArray:function(){var e=this._.definition.attributes&&this._.definition.attributes.class;return e?CKEDITOR.tools.trim(e).split(/\s+/):null},applyToRange:e,removeFromRange:e,applyToObject:e})}(),(CKEDITOR.plugins.widget=E).repository=t,E.nestedEditable=n}();