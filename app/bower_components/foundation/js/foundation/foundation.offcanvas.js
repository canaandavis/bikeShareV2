(function(e,t,n,r){Foundation.libs.offcanvas={name:"offcanvas",version:"5.3.0",settings:{open_method:"move",close_on_click:!0},init:function(e,t,n){this.bindings(t,n)},events:function(){var e=this,t=e.S,n="",r="",i="";this.settings.open_method==="move"?(n="move-",r="right",i="left"):this.settings.open_method==="overlap"&&(n="offcanvas-overlap"),t(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(t){e.click_toggle_class(t,n+r)}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(t){var i=e.get_settings(t);i.close_on_click&&e.hide.call(e,n+r,e.get_wrapper(t))}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(t){e.click_toggle_class(t,n+i)}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(t){var r=e.get_settings(t);r.close_on_click&&e.hide.call(e,n+i,e.get_wrapper(t))}).on("click.fndtn.offcanvas",".exit-off-canvas",function(t){e.click_remove_class(t,n+i),r&&e.click_remove_class(t,n+r)})},toggle:function(e,t){t=t||this.get_wrapper(),t.is("."+e)?this.hide(e,t):this.show(e,t)},show:function(e,t){t=t||this.get_wrapper(),t.trigger("open").trigger("open.fndtn.offcanvas"),t.addClass(e)},hide:function(e,t){t=t||this.get_wrapper(),t.trigger("close").trigger("close.fndtn.offcanvas"),t.removeClass(e)},click_toggle_class:function(e,t){e.preventDefault();var n=this.get_wrapper(e);this.toggle(t,n)},click_remove_class:function(e,t){e.preventDefault();var n=this.get_wrapper(e);this.hide(t,n)},get_settings:function(e){var t=this.S(e.target).closest("["+this.attr_name()+"]");return t.data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(e){var t=this.S(e?e.target:this.scope).closest(".off-canvas-wrap");return t.length===0&&(t=this.S(".off-canvas-wrap")),t},reflow:function(){}}})(jQuery,window,window.document);