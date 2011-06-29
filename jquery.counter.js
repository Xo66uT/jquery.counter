$(function(){
	//Using Examples
	$("#field_count").counter();
});

//A boilerplate for kick-starting jQuery plugins development
//version 1.2, April 29th, 2011
//by Stefan Gabos
//with help from Steven Black, Rob Lifford

;(function($) {

 $.fn.counter = function(method) {

     var defaults = {
		inst : '',
		id : '',
		val : '',
		inst_container : ''
     };

     var settings = {};

     var methods = {

         init : function(options) {
             settings = $.extend({}, defaults, options);
             return this.each(function() {
                 var
                     $element = $(this),
                     element = this;
       		 
                 helpers._createCounter(this);
             });
         },
         
         /**
          * @author Roman
          * @access public
          * add item to combo
          */
         addItem: function(obj) {
             // code goes here
			settings.inst = this;
			settings.val = $(settings.inst).val();
			settings.id = $(settings.inst).attr("id");
			settings.items_count = $(settings.inst).find("option").length;
			settings.field = $("#ds-combobox-" + settings.id).find(".ds-combobox-field");
			
        	if(obj) {
				$(settings.inst).append('<option value="' + obj.id + '">' + obj.name + '</option>');      		 
				$("#ds-combobox-" + settings.id).find(".ds-combo-list").prepend(helpers._createItem(obj.name));
				$("#ds-combobox-" + settings.id).find(".ds-combobox-field").text(obj.name);
				$(settings.inst).find("option").each(function(){
					if($(this).text() == obj.name) {
						$(this).attr("selected", "selected");
					}
				});
        	}
         },
         
         /**
          * @author Roman
          * @access public
          * delete active item from combo
          */
         deleteItem: function() {
 			settings.inst = this;
			settings.val = $(settings.inst).val();
			settings.id = $(settings.inst).attr("id");
			settings.items_count = $(settings.inst).find("option").length;
			settings.text = $("#" + settings.id + " option:selected").text();
        	 
        	$("#" + settings.id + " option:selected").detach();
        	$("#ds-combobox-" + settings.id + " .ds-list-item").each(function(){
        		if($(this).text() == settings.text) {
        			$(this).detach();
        			$("#ds-combobox-" + settings.id).find(".ds-combobox-field").text($("#" + settings.id + " option:selected").text());
        		}
        	});
         }

     };

     var helpers = {

    	_createCounter: function (target) {
			settings.inst = target;
			settings.val = new Number($(settings.inst).val());
			settings.id = $(settings.inst).attr("id");
			settings.inst_container = $(settings.inst).parent();

			//create html
			$(settings.inst).parent().append(helpers._generateHTML());
		},
		_generateHTML: function()
		{	
			
			var ds_button_inc = $("<div>", {
				"class" : "ds-button-inc",
				click : function() {
					var value = Number($(settings.inst).val());
					$(settings.inst).val(value+1);
					$(settings.inst).trigger("change");
				}
			});
			
			var ds_button_dec = $("<div>", {
				"class" : "ds-button-dec",
				click : function() {
					var value = Number($(settings.inst).val());
					if(value > 1) {
						$(settings.inst).val(value-1);
						$(settings.inst).trigger("change");
					}
				}
			});
			var ds_buttons = $("<div>", {
				"class" : "ds-buttons"
			});
			
			$(ds_buttons).append(ds_button_inc);
			$(ds_buttons).append(ds_button_dec);
			
			var ds_input_left = $("<div>", {
				"class" : "ds-input-left"
			});
			
			var ds_input_input = $("<div>", {
				"class" : "ds-input-input"
			});
			$(ds_input_input).append($(settings.inst));
			
			var ds_input_right = $("<div>", {
				"class" : "ds-input-right"
			});
			
			var clearfix = $("<div>", {
				"class" : "clearfix"
			});
			
			var ds_input = $("<div>", {
				"class" : "ds-input"
			});
			
			$(ds_input).append(ds_input_left);
			$(ds_input).append(ds_input_input);
			$(ds_input).append(ds_input_right);
			$(ds_input).append(ds_buttons);
			$(ds_input).append(clearfix);
			
			return ds_input;

		}

     };

     if (methods[method]) {
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
     } else if (typeof method === 'object' || !method) {
         return methods.init.apply(this, arguments);
     } else {
         $.error( 'Method "' +  method + '" does not exist in DsPopup plugin!');
     }

 };

})(jQuery);