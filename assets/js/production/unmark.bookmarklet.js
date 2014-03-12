/*! Unmark Internal - http://unmark.it - 2014-03-11 - http://plainmade.com */ 
if(void 0===unmark)var unmark={};(function(e){unmark.ajax=function(a,n,t,r,i,o){var s=unmark.urlEncode(unmark.vars.csrf_token),i=void 0!==i?i:"json",o=void 0!==o?o:!0,u="csrf_token="+s+"&content_type="+i;t=unmark.empty(t)?u:t+"&"+u,e.ajax({dataType:i,cache:!1,url:a,type:n.toUpperCase(),data:t,async:o,success:function(a){e.isFunction(r)&&r(a)},error:function(a,n,t){var i={error:t,status:n,request:a};e.isFunction(r)&&r(i)}})},unmark.swapClass=function(a,n,t){var r=a;if(-1===n.indexOf("*"))return r.removeClass(n),t?r.addClass(t):r;var i=RegExp("\\s"+n.replace(/\*/g,"[A-Za-z0-9-_]+").split(" ").join("\\s|\\s")+"\\s","g");return r.each(function(a,n){for(var t=" "+n.className+" ";i.test(t);)t=t.replace(i," ");n.className=e.trim(t)}),t?r.addClass(t):r},unmark.replaceSpecial=function(e){if(void 0!==e&&null!==e){var a=null;for(var n in unmark.special_chars)a=RegExp(n,"gi"),e=e.replace(a,unmark.special_chars[n])}return e},unmark.urlEncode=function(e){return e=unmark.replaceSpecial(e),encodeURIComponent(e)},unmark.empty=function(e){var a=void 0!==e&&null!==e?e.length:0;return e===!1||""===e||null===e||0===e||void 0===e||1>a},unmark.createCookie=function(e,a,n){if(n){var t=new Date;t.setTime(t.getTime()+1e3*60*60*24*n);var r="; expires="+t.toGMTString()}else var r="";document.cookie=e+"="+a+r+"; path=/"},unmark.readCookie=function(e){for(var a=e+"=",n=document.cookie.split(";"),t=0;n.length>t;t++){for(var r=n[t];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(a))return r.substring(a.length,r.length)}return null},unmark.prettyLink=function(e){return e=e.replace(/https?:\/\/(www.)?/,""),"/"===e.substr(-1)&&(e=e.substr(0,e.length-1)),e},unmark.read_query_str=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=RegExp("[\\?&]"+e+"=([^&#]*)"),n=a.exec(location.search);return null==n?"":decodeURIComponent(n[1].replace(/\+/g," "))},unmark.extendFunction=function(e,a){this[e]=function(e,a,n){return function(){var t=a.apply(e,arguments),r=n.apply(e,arguments);return null!==r?r:t}}(this,this[e],a)}})(window.jQuery),function(e){unmark.updateDom=function(){var a=e("div.marks").data("label-class"),n=e("body");n.removeClass().addClass(a),unmark.page_setup(e("body").height())},unmark.sidebar_collapse=function(){Modernizr.mq("only screen and (max-width: 480px)")&&(e(".mark-actions").hide(),e(".sidebar-content").animate({right:"-85%"},600,function(){e(this).hide()})),e(".mark").removeClass("view-inactive").removeClass("view-active"),unmark.sidebar_expand(!0),unmark.sidebar_mark_info.fadeOut(400,function(){unmark.sidebar_default.fadeIn(400)})},unmark.sidebar_expand=function(e){var a=unmark.sidebar_content.find('a[data-action="sidebar_expand"] i');return e===!0?unmark.sidebar_content.animate({width:"42.17749%"},800,function(){a.removeClass("icon-heading_collapse").addClass("icon-heading_expand"),unmark.sidebar_content.removeClass("wide")}):(a.hasClass("icon-heading_collapse")?unmark.sidebar_content.animate({width:"42.17749%"},800,function(){a.removeClass("icon-heading_collapse").addClass("icon-heading_expand"),unmark.sidebar_content.removeClass("wide")}):unmark.sidebar_content.animate({width:"75%"},800,function(){a.removeClass("icon-heading_expand").addClass("icon-heading_collapse"),unmark.sidebar_content.addClass("wide")}),void 0)},unmark.hideNavigation=function(){Modernizr.mq("only screen and (min-width: 480px)")&&(e(".mark-actions").hide(),e(".branding").fadeOut()),unmark.nav_panel.stop().animate({left:-285},400),unmark.main_panel.stop().animate({left:65},200,function(){e(".nav-panel").hide(),e(".menu-item").removeClass("active-menu"),e(".navigation-pane-links").show(),e(".menu-activator i").removeClass("icon-menu_close").addClass("icon-menu_open")})},unmark.interact_nav=function(a,n){var t=n.attr("href"),r=t.replace(/^#/,""),i=parseInt(n.attr("rel")),o=i+65,s=n.parent(),u=parseInt(unmark.nav_panel.css("left"));return unmark.sidebar_collapse(),t.match(/\//)?(unmark.hideNavigation(),!0):(a.preventDefault(),e(".mark-actions").hide(),s.hasClass("active-menu")?(e(".menu-item").removeClass("active-menu"),unmark.hideNavigation()):(e(".menu-item").removeClass("active-menu"),e(".navigation-content").find("[data-menu='"+r+"']").addClass("active-menu"),"#panel-menu"===t&&u>0?unmark.hideNavigation():(e(".menu-activator i").removeClass("icon-menu_open").addClass("icon-menu_close"),unmark.nav_panel.animate({left:65},{duration:200,queue:!1}),unmark.main_panel.animate({left:o},{duration:200,queue:!1}),unmark.nav_panel.animate({width:i},200),unmark.nav_panel.find(".nav-panel").animate({width:i},200),e(".branding").fadeIn(),"#panel-menu"===t?(e(".navigation-pane-links").show(),e(".nav-panel").hide()):(e(".navigation-pane-links").hide(),e(".nav-panel").not(t).hide(),e(t).show()),void 0)))},unmark.scrollPaginate=function(e){var a,n,t,r,i,o="",r=window.unmark_current_page+1,s=window.unmark_total_pages;e.scrollTop()+e.innerHeight()>=e[0].scrollHeight&&s>=r&&(t=Hogan.compile(unmark.template.marks),a=window.location.pathname,unmark.ajax(a+"/"+r,"post","",function(e){if(e.marks){for(i=Object.keys(e.marks).length,n=1;i>n;n++)e.marks[n].prettyurl=unmark.prettyLink(e.marks[n].url),o+=t.render(e.marks[n]);unmark.main_content.find(".marks_list").append(o),window.unmark_current_page=r}}))},unmark.updateCounts=function(){unmark.getData("stats",function(a){var n=a.stats.archived,t=(a.stats.saved,a.stats.marks);e(".na-today").text(n.today),e(".ns-year").text(t["ages ago"])})},unmark.getData=function(e,a){unmark.ajax("/marks/get/"+e,"post","",a)},unmark.close_window=function(a){if(a)return window.close();var n=e(".mark-added-note").find("textarea").val(),t=e(".mark-added-note").find("textarea").data("id");unmark.saveNotes(t,n),window.close()},unmark.dismiss_this=function(e){e.parent().parent().fadeOut()},unmark.page_setup=function(a){unmark.main_content.height(a),unmark.sidebar_content.height(a),e(".nav-panel").height(a),e("body").height(a)},unmark.overlay=function(a){if(a){unmark.mainpanels.addClass("blurme");var n=e('<div id="unmark-overlay"><a href="#" id="unmarkModalClose"><i class="icon-big_close"></i></a></div>');n.appendTo(document.body)}else e(".hiddenform").hide().css("top","-300px"),unmark.mainpanels.removeClass("blurme"),e("#unmark-overlay").remove(),e("#helperforms input").val("")}}(window.jQuery),function(e){var a=0;unmark.show_mark_info=function(n){function t(){a=arguments[0]||a,isNaN(a)?e("ul.sidebar-label-list").prepend(unmark.label_list(a)):unmark.getData("labels",t)}var r,i,o=n.data("mark"),s=e("#"+o).html(),u=jQuery.parseJSON(s),l=o.replace("mark-data-",""),c=e("#mark-"+l).find(".note-placeholder").text();e(".mark").removeClass("view-inactive").removeClass("view-active"),e(".mark").not("#mark-"+l).addClass("view-inactive"),e("#mark-"+l).addClass("view-active"),""!==c&&(u.notes=c),r=Hogan.compile(unmark.template.sidebar),i=r.render(u),Modernizr.mq("only screen and (max-width: 480px)")&&e("#mobile-sidebar-show").trigger("click"),unmark.sidebar_mark_info.fadeOut(400,function(){unmark.sidebar_default.is(":visible")?unmark.sidebar_default.fadeOut(400,function(){unmark.sidebar_mark_info.html(i).fadeIn(400,function(){unmark.tagify_notes(e("#notes-"+l)),t(),e("section.sidebar-info-preview").fitVids()})}):(unmark.sidebar_mark_info.html(i),unmark.tagify_notes(e("#notes-"+l)),t(),unmark.sidebar_mark_info.fadeIn(400,function(){e("section.sidebar-info-preview").fitVids()}))})},unmark.update_label_count=function(){function a(e){var a,t,r=e.labels;for(a in r)t=r[a].total_active_marks,"1"===t?t+=" mark":"0"===t?t="no marks":t+=" marks",n.find(".label-"+r[a].label_id+" span").text(t)}var n=e("ul.label-list");unmark.getData("labels",a),unmark.updateCounts()},unmark.get_mark_info=function(a){var n;unmark.ajax("/mark/info/"+a,"post","",function(t){n=t.mark,n=JSON.stringify(n),e("#mark-data-"+a).html(n)})},unmark.mark_archive=function(a){var n=a.data("id");unmark.ajax("/mark/archive/"+n,"post","",function(a){null!==a.mark.archived_on?(e("#mark-"+n).fadeOut(),unmark.sidebar_collapse(),unmark.update_label_count()):alert("Sorry, We could not archive this mark at this time.")})},unmark.mark_restore=function(a){var n=a.data("id");unmark.ajax("/mark/restore/"+n,"post","",function(a){null===a.mark.archived_on?(e("#mark-"+n).fadeOut(),unmark.sidebar_collapse(),unmark.update_label_count()):alert("Sorry, We could not restore this mark at this time.")})},unmark.archive_all=function(){unmark.ajax("/marks/archive/old","post","",function(e){e.archived===!0?window.location="/marks":alert("Sorry, We could not archive the links at this time. Please try again.")})},unmark.marks_editNotes=function(a){function n(a,n){i="notes="+unmark.urlEncode(a),unmark.ajax("/mark/edit/"+n,"post",i,function(){t(1),e("#mark-"+n).find(".note-placeholder").text(a)})}function t(e){switch(e){case 1:heading='Notes <i class="icon-edit"></i>';break;case 2:heading='EDITING NOTES <i class="icon-heading_close"></i>';break;case 3:heading='ADD A NOTE <i class="icon-edit"></i>'}a.html(heading)}var r,i,o=a.next();o.unbind(),t(2),a.removeClass("action"),o.attr("contenteditable",!0).addClass("editable"),o.find("a").contents().unwrap(),o.focus(),o.on("blur keydown",function(i){(13===i.which||"blur"===i.type)&&(i.preventDefault(),o.attr("contenteditable",!1).removeClass("editable"),r=e(this).text(),id=e(this).data("id"),""===r?t(3):n(r,id),o.unbind(),unmark.tagify_notes(o),setTimeout(function(){a.addClass("action")},500))})},unmark.marks_addNotes=function(e){var a=e.next();e.hide(),a.fadeIn(),a.focus()},unmark.saveNotes=function(e,a){var n="notes="+unmark.urlEncode(a);unmark.ajax("/mark/edit/"+e,"post",n)},unmark.marks_addLabel=function(a){var n,t,r,i,o,s,u=a.next(),l=a.parent();return u.is(":visible")?u.fadeOut():(u.find("a").unbind(),u.fadeIn(),u.find("a").on("click",function(c){c.preventDefault(),n=u.data("id"),t=e(this).attr("rel"),i=e(this).text(),o=e("body").attr("class"),s=RegExp("label"),r="label_id="+t,unmark.ajax("/mark/edit/"+n,"post",r,function(){u.fadeOut(),a.text(i),unmark.swapClass(a,"label-*","label-"+t),u.find("a").unbind(),unmark.update_label_count(),l.hasClass("sidebar-label")&&(unmark.swapClass(l,"label-*","label-"+t),unmark.swapClass(e("#mark-"+n),"label-*","label-"+t),unmark.get_mark_info(n),s.test(o)&&o!=="label-"+t&&(e("#mark-"+n).fadeOut(),unmark.sidebar_collapse()))})}),void 0)},unmark.label_list=function(e){var a,n,t=e.labels,r="";for(a in t)n=t[a],r+='<li class="label-'+n.label_id+'"><a href="#" rel="'+n.label_id+'"><span>'+n.name+"</span></a></li>";return r},unmark.tagify_notes=function(e){var a=e.text();""!==a?a=a.replace(/#(\S*)/g,'<a href="/marks/tag/$1">#$1</a>'):e.prev().html('Click To Add A Note <i class="icon-edit"></i>'),e.html(a)},unmark.delete_mark=function(a){var n=a.data("id"),t=a.data("view");unmark.ajax("/mark/delete/"+n,"post","",function(a){"0"===a.mark.active?"bookmarklet"===t?unmark.close_window(!0):(unmark.sidebar_collapse(),e("#mark-"+n).fadeOut()):alert("This mark could not be deleted, please try again laster.")})}}(window.jQuery),function(e){e(document).ready(function(){function a(a){var n=unmark.label_list(a);e("ul.label-choices").prepend(n)}function n(){var a=e(".mark-added").data("label"),n=e(".mark-added").data("label-name");e("#currLabel").addClass("label-"+a).text(n)}unmark.getData("labels",a),e(document).ready(function(){n(),e(".mark-added-notes-area").on("blur keydown",function(a){if(13===a.which||"blur"===a.type){a.preventDefault();var n=e(this).val(),t=e(this).data("id");unmark.saveNotes(t,n)}})})})}(window.jQuery),function($){unmark.init=function(){this.nav_panel=$(".navigation-pane"),this.main_panel=$(".main-wrapper"),this.main_content=$(".main-content"),this.sidebar_content=$(".sidebar-content"),this.main_panel_width=unmark.main_panel.width(),this.sidebar_default=$(".sidebar-default"),this.sidebar_mark_info=$(".sidebar-mark-info"),this.body_height=$(window).outerHeight(!0),this.special_chars={"\\+":"&#43;"},this.mainpanels=$("#unmark-wrapper"),window.unmark_current_page=1,Modernizr.mq("only screen and (min-width: 480px)")&&$("body").animate({opacity:1},1e3),$(".navigation-content a, .navigation-pane-links a").on("click",function(e){unmark.interact_nav(e,$(this))}),$(document).on("mouseenter",".mark",function(){$(this).addClass("hide-dot"),$(this).find(".mark-actions").show()}),$(document).on("mouseleave",".mark",function(){$(this).removeClass("hide-dot"),$(this).find(".mark-actions").hide()}),$(document).on("click","button[data-action], .action",function(e){e.preventDefault(),e.stopPropagation();var action=$(this).data("action"),funct;funct=eval("unmark."+action),funct($(this))}),$(document).on("click",".sidebar-info-panel h4.prev-coll",function(e){e.preventDefault();var a=$(this).next("section"),n=$(this).find("i");a.is(":visible")?(n.removeClass("icon-up"),n.addClass("icon-down"),a.slideUp()):(n.removeClass("icon-down"),n.addClass("icon-up"),a.slideDown())}),$(document).on("click",".mark",function(e){var a=e.target.className,n=$(this).find("a.mark-info");"icon-check"!==a&&"action mark-archive"!==a&&unmark.show_mark_info(n),unmark.hideNavigation()}),$("#unmark").length>0&&($(document).pjax("a[href*='/']",unmark.main_content),$(document).on("submit","#search-form",function(e){$.pjax.submit(e,unmark.main_content)}),$(document).on("pjax:complete",function(){Modernizr.mq("only screen and (max-width: 480px)")&&unmark.mobile_nav(!0),window.unmark_current_page=1,unmark.main_content.scrollTop(0),unmark.main_content.find(".marks").hide().fadeIn(),unmark.updateDom()})),$("form.ajaxsbmt").on("submit",function(e){e.preventDefault();var form=$(this),formid=form.attr("id");funct=eval("unmark."+formid),funct(form,e)}),$("#helperforms input.field-input").on("keydown change",function(){$(this).parent().parent().find(".response-message").hide()}),$(document).on("click","#unmarkModalClose",function(e){return e.preventDefault(),unmark.overlay(!1)}),$(document).on("mouseenter",".label-choices li, .sidebar-label-list li",function(){var e=$(this),a=e.find("span").text(),n=e.attr("class");$("#label-chosen").show().text(a).removeClass().addClass(n)}),$(document).on("mouseleave",".label-choices li, .sidebar-label-list li",function(){$("#label-chosen").show().hide()}),unmark.main_content.on("scroll",function(){unmark.scrollPaginate($(this))}),$(".importer").change(function(){return $("#importForm").submit()})},$(document).ready(function(){unmark.init()})}(window.jQuery);